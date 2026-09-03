import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdminAuth: () => void;
  onOpenCvModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminAuth }) => {
  const { data, isAdminAuthenticated, activeView, setActiveView } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#FAFAFA] border-t border-zinc-200 py-14 text-zinc-500 text-xs">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
          {/* Identity */}
          <div>
            <div className="text-base font-semibold text-zinc-900">
              {data.profile?.fullName || 'Abiodun Ayodeji'}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Data Analyst · Performance & Planning
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-600">
            <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
            <a href="#experience" className="hover:text-zinc-900 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-zinc-900 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-zinc-900 transition-colors">Skills</a>
            <a href="#impact" className="hover:text-zinc-900 transition-colors">Beyond Work</a>
            <a href="#documents" className="hover:text-zinc-900 transition-colors">Documents</a>
            <a href="#ask-ai" className="hover:text-zinc-900 transition-colors">Assistant</a>
            <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 transition-colors border border-zinc-200 bg-white px-3 py-1.5 rounded-md shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Bottom copyright & discrete admin lock */}
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {data.profile?.fullName || 'Abiodun Ayodeji'}. All rights reserved.
          </div>

          <button
            id="btn-footer-admin-lock"
            onClick={() => {
              if (isAdminAuthenticated) {
                setActiveView(activeView === 'admin' ? 'public' : 'admin');
              } else {
                onOpenAdminAuth();
              }
            }}
            title="Administrator Panel Access"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
