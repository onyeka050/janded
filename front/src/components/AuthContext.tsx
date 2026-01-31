import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { api } from '../utils/api';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  isVerified: boolean;
  profilePicture?: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;

  // modal control
  openSignIn: () => void;
  openSignUp: () => void;
  signInModalOpen: boolean;
  signUpModalOpen: boolean;
  setSignInModalOpen: (open: boolean) => void;
  setSignUpModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  // 🔹 Load user from token on refresh
  useEffect(() => {
    const initAuth = async () => {
      const token = api.getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.get('/auth/me');
        setUser(userData);
      } catch (error) {
        console.error('Failed to restore session:', error);
        api.removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔹 SIGN IN (FIXED)
  const signIn = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });

    if (!response?.token || !response?.user) {
      throw new Error('Invalid login response');
    }

    api.setToken(response.token);
    setUser(response.user);
    setSignInModalOpen(false);
  };

  // 🔹 SIGN UP (FIXED)
  const signUp = async (data: SignUpData) => {
    const response = await api.post('/auth/register', data);

    if (!response?.token || !response?.user) {
      throw new Error('Invalid signup response');
    }

    api.setToken(response.token);
    setUser(response.user);
    setSignUpModalOpen(false);
  };

  // 🔹 SIGN OUT
  const signOut = () => {
    api.removeToken();
    setUser(null);
  };

  const openSignIn = () => {
    setSignInModalOpen(true);
    setSignUpModalOpen(false);
  };

  const openSignUp = () => {
    setSignUpModalOpen(true);
    setSignInModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signUp,
        signOut,
        openSignIn,
        openSignUp,
        signInModalOpen,
        signUpModalOpen,
        setSignInModalOpen,
        setSignUpModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
