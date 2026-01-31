import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from '../components/UseRouter';

export function SignUpPage() {
  const { signUp } = useAuth();
  const { navigateTo } = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(form);
      window.location.reload(); // ✅ SAME FIX
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Join JANDED</h1>
        <p className="auth-subtitle">
          Create an account to access verified opportunities
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
          />

          <input
            className="auth-input"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            className="auth-input"
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm({ ...form, country: e.target.value })
            }
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            minLength={8}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button className="auth-button" disabled={loading}>
            {loading ? 'Creating account…' : 'Join Now'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <span className="auth-link" onClick={() => navigateTo('signin')}>Sign in</span>
        </div>
      </div>
    </div>
  );
}