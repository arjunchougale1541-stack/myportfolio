import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/5 py-8 sm:py-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400 font-medium">
          {/* Left: Copyright */}
          <div>
            Copyright © 2026 Arjun Chougale. All rights reserved.
          </div>

          {/* Center / Right: Links */}
          <div className="flex items-center gap-6 sm:gap-8 text-gray-400">
            <a
              href="#terms"
              onClick={(e) => { e.preventDefault(); alert('Arjun Chougale Portfolio — Terms & Conditions: All visual identity assets, case studies, and brand graphics are presented for portfolio showcase purposes.'); }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); alert('Arjun Chougale Portfolio — Privacy Policy: No personal data is tracked or collected.'); }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
