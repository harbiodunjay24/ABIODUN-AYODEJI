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
  Eye,
  EyeOff,
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, setActiveView } = usePortfolio();

  const [email, setEmail] = useState('ayodejiharbiodun24@gmail.com');
  const [pinOrPass, setPinOrPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        setError('Access denied. Invalid administrator credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="admin-auth-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="admin-auth-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                PORTFOLIO OWNER ACCESS
              </span>
              <h3 className="text-base font-semibold text-zinc-900">
                Sign in to Admin Panel
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Note */}
        <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-zinc-200 text-xs text-zinc-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            This administrative dashboard is private and strictly restricted to portfolio owner <strong className="text-zinc-900 font-medium">Abiodun Ayodeji</strong>.
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayodejiharbiodun24@gmail.com"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition-colors"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Administrator Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={pinOrPass}
                onChange={(e) => setPinOrPass(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md pl-9 pr-10 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="btn-admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white py-2.5 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-xs mt-2"
          >
            <span>{loading ? 'Verifying access...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
