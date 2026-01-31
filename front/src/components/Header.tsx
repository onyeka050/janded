import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useRouter } from './UseRouter';
import { useAuth } from './AuthContext';
import { motion } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useRouter();
  const { isAuthenticated, user, signOut } = useAuth();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleNavigate = (page: any) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <motion.div
            className="cursor-pointer"
            onClick={() => handleNavigate('home')}
            whileHover={{ scale: 1.05 }}
          >
            <Logo variant="white" size="sm" />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['home', 'opportunities', 'visa-sponsors', 'news', 'community'].map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handleNavigate(page)}
                  className={`min-h-[44px] transition-colors ${
                    currentPage === page
                      ? 'text-teal-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {page.replace('-', ' ')}
                </button>
              )
            )}

            {/* Admin ALWAYS visible for now */}
            <button
              onClick={() => handleNavigate('admin')}
              className={`min-h-[44px] transition-colors ${
                currentPage === 'admin'
                  ? 'text-teal-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Admin
            </button>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  Hi, {user?.firstName || 'User'}
                </span>
                <Button
                  onClick={signOut}
                  variant="outline"
                  className="border-teal-500 text-teal-400"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
  onClick={() => {
    console.log('NAV SIGN IN CLICKED');
    navigateTo('signin');
  }}
  className="bg-teal-500 hover:bg-teal-600 text-white"
>
  Sign In
</Button>

            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2">
            {['home', 'opportunities', 'visa-sponsors', 'news', 'community', 'admin'].map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handleNavigate(page)}
                  className={`block w-full text-left px-4 py-3 rounded ${
                    currentPage === page
                      ? 'bg-teal-500/10 text-teal-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {page.replace('-', ' ')}
                </button>
              )
            )}

            {!isAuthenticated ? (
              <Button
                onClick={() => handleNavigate('signin')}
                className="w-full bg-teal-500 text-white"
              >
                Sign In
              </Button>
            ) : (
              <Button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full border-teal-500 text-teal-400"
              >
                Sign Out
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
