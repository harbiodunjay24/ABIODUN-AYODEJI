import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  Menu,
  X,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

interface NavbarProps {
  onOpenCvModal: () => void;
  onOpenAdminAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal, onOpenAdminAuth }) => {
  const {
    data,
    previewMode,
    setPreviewMode,
    publishDraft,
    isAdminAuthenticated,
    activeView,
    setActiveView,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#impact' },
    { label: 'Documents', href: '#documents' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (activeView === 'admin') {
      setActiveView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Draft Preview Bar for Admin */}
      {previewMode && (
        <div
          id="preview-mode-bar"
          className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs font-medium backdrop-blur-md flex items-center justify-between"
        >
          <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
            <span className="text-xs">
              <strong>Previewing Staged Changes:</strong> You are viewing unpublished edits.
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                id="btn-publish-from-banner"
                onClick={publishDraft}
                className="bg-zinc-900 hover:bg-black text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
              >
                Publish Live
              </button>
              <button
                id="btn-exit-preview"
                onClick={() => setPreviewMode(false)}
                className="bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-300 px-2.5 py-1 rounded-md text-xs transition-colors"
              >
                Exit Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navigation */}
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'py-3.5 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Name */}
          <a
            href="#home"
            onClick={() => {
              if (activeView === 'admin') setActiveView('public');
            }}
            className="text-sm sm:text-base font-semibold tracking-tight text-zinc-900 hover:text-black transition-colors"
            id="brand-logo"
          >
            {(data.profile?.fullName || 'ABIODUN AYODEJI').toUpperCase()}
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-normal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="btn-nav-view-cv"
              onClick={onOpenCvModal}
              className="text-xs font-medium text-zinc-800 hover:text-black border border-zinc-300 hover:border-zinc-400 bg-white hover:bg-zinc-50 px-3.5 py-1.5 rounded-md transition-all active:scale-98"
            >
              View CV
            </button>

            {isAdminAuthenticated ? (
              <button
                id="btn-nav-admin-panel"
                onClick={() => setActiveView(activeView === 'admin' ? 'public' : 'admin')}
                className="text-xs font-medium text-white bg-zinc-900 hover:bg-black px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{activeView === 'admin' ? 'Exit Admin' : 'Admin Panel'}</span>
              </button>
            ) : (
              <button
                id="btn-nav-admin-login"
                onClick={onOpenAdminAuth}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 bg-zinc-50 hover:bg-zinc-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                title="Admin / Owner Login (Abiodun Ayodeji)"
              >
                <Lock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCvModal}
              className="text-xs font-medium text-zinc-800 border border-zinc-300 bg-white px-2.5 py-1.5 rounded-md"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-700 hover:text-black rounded-md hover:bg-zinc-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-4 space-y-3 shadow-md">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-zinc-700 hover:text-black py-1.5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full text-center text-xs font-medium text-zinc-900 border border-zinc-300 py-2 rounded-md hover:bg-zinc-50"
              >
                View CV
              </button>
              {isAdminAuthenticated ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveView(activeView === 'admin' ? 'public' : 'admin');
                  }}
                  className="w-full text-center text-xs font-medium text-white bg-zinc-900 py-2 rounded-md"
                >
                  {activeView === 'admin' ? 'Exit Admin' : 'Admin Dashboard'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminAuth();
                  }}
                  className="w-full text-center text-xs text-zinc-500 hover:text-zinc-800 py-1 flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
