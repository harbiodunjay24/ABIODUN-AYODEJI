import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  X,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, setActiveView } = usePortfolio();

  const [email, setEmail] = useState('ayodejiharbiodun24@gmail.com');
  const [pinOrPass, setPinOrPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await loginAdmin(email, pinOrPass);
      if (success) {
        setActiveView('admin');
        onClose();
      } else {
        setError('Invalid authentication credentials. Enter authorized administrator email and PIN (2026).');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAccess = async () => {
    setEmail('ayodejiharbiodun24@gmail.com');
    setPinOrPass('2026');
    setLoading(true);
    const success = await loginAdmin('ayodejiharbiodun24@gmail.com', '2026');
    if (success) {
      setActiveView('admin');
      onClose();
    }
    setLoading(false);
  };

  return (
    <div
      id="admin-auth-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in-50"
      onClick={onClose}
    >
      <div
        id="admin-auth-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#08090c] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                PRIVATE ACCESS
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">
                ADMINISTRATOR PORTAL
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Note */}
        <div className="p-4 rounded-2xl bg-[#0d0f14] border border-zinc-800/80 text-xs text-zinc-400 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            Restricted to owner <strong>Abiodun Ayodeji</strong> to update live case studies, credentials, and curriculum records without editing source code.
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              ADMINISTRATOR EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayodejiharbiodun24@gmail.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              SECURITY PIN OR KEY
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pinOrPass}
                onChange={(e) => setPinOrPass(e.target.value)}
                placeholder="Enter PIN (e.g. 2026)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <button
            id="btn-admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Owner One-Click Demo Access Helper */}
        <div className="pt-4 border-t border-zinc-900 flex flex-col gap-2 text-center">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 py-2.5 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONE-CLICK OWNER ACCESS (DEMO MODE)</span>
          </button>
          <span className="text-[10px] font-mono text-zinc-400">
            AUTHORIZED PIN: <code className="text-zinc-300 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">2026</code>
          </span>
        </div>

      </div>
    </div>
  );
};

