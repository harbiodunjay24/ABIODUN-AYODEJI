import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Lock,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onOpenAdminAuth: () => void;
  onOpenCvModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminAuth, onOpenCvModal }) => {
  const { data, isAdminAuthenticated, activeView, setActiveView } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050608] border-t border-zinc-900 py-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          
          {/* Brand & Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
            <div className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>{(data.profile?.fullName || 'Abiodun Ayodeji').toUpperCase()}</span>
              <span className="text-zinc-600">//</span>
              <span className="text-emerald-400 font-mono text-xs">DOSSIER</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Data Analyst • Performance & Planning • Business Intelligence Architecture
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <a href="#about" className="hover:text-emerald-400 transition-colors">01.ABOUT</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">02.TIMELINE</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">03.CASE STUDIES</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">04.TOOLKIT</a>
            <a href="#impact" className="hover:text-emerald-400 transition-colors">05.IMPACT</a>
            <a href="#documents" className="hover:text-emerald-400 transition-colors">06.VAULT</a>
            <a href="#ask-ai" className="hover:text-emerald-400 transition-colors">AI COPILOT</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">07.CONTACT</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-xl bg-[#0d0f14] hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors flex items-center gap-2 text-xs font-mono"
          >
            <span>RETURN TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Bar: Copyright, Grounded Verification badge, Admin Entry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span>© {new Date().getFullYear()} {(data.profile?.fullName || 'Abiodun Ayodeji').toUpperCase()}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GROUNDED IN VERIFIED ATS DOSSIER</span>
            </div>

            {/* Admin CMS Entrance */}
            <button
              id="btn-footer-admin-lock"
              onClick={() => {
                if (isAdminAuthenticated) {
                  setActiveView(activeView === 'admin' ? 'public' : 'admin');
                } else {
                  onOpenAdminAuth();
                }
              }}
              title="Private Administrator Dashboard"
              className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-[#0d0f14] border border-zinc-800/80 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

