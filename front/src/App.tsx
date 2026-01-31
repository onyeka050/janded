import { useRouter } from './components/UseRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { VisaSponsorsPage } from './pages/VisaSponsorsPage';
import { NewsPage } from './pages/NewsPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function AppContent() {
  const { currentPage } = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'opportunities' && <OpportunitiesPage />}
        {currentPage === 'visa-sponsors' && <VisaSponsorsPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'community' && <CommunityPage />}

        {/* 🔴 THESE WERE MISSING */}
        {currentPage === 'signin' && <SignInPage />}
        {currentPage === 'signup' && <SignUpPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
