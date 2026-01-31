import React from 'react';
import { Logo } from './Logo';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    // Fix Issue #14: Standardized spacing py-20
    // Fix Issue #3: Standardized max-w-6xl
    <footer className="bg-[#0A1628] text-gray-400 py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="white" size="md" />
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Your trusted guide to verified opportunities abroad. Helping West Africans find real jobs and scholarships.
            </p>
            <div className="mt-6">
              <a 
                href="mailto:hello@janded.com" 
                className="flex items-center gap-2 text-sm hover:text-teal-400 transition-colors w-fit"
              >
                <Mail size={16} />
                hello@janded.com
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            {/* Fix Issue #12: H4 for subsections */}
            <h4 className="text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Visa Sponsors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Job Listings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center text-sm">
          <p>© 2024 JANDED. Made for West Africa.</p>
        </div>
      </div>
    </footer>
  );
}