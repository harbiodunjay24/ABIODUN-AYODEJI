import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenCvModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCvModal }) => {
  const { data } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Recruitment & Job Opportunity',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to dispatch message');
      }

      setStatus('success');
      setResponseMsg(json.message || 'Thank you. Your message has been dispatched successfully.');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Recruitment & Job Opportunity',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setResponseMsg(err.message || 'Something went wrong. Please reach out directly via email.');
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>DIRECT INQUIRIES & ENGAGEMENTS</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">07</span>
        </div>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            INITIATE DIALOGUE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            Direct channel for recruitment discussions, BI consultations, performance modeling advisory, and data collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  AVAILABILITY STATUS
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  AVAILABLE
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  Open for Full-Time & Advisory Roles
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Data Analyst • Business Intelligence • Performance & Planning roles globally (Remote or Hybrid).
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-zinc-200 hover:text-emerald-400 hover:border-zinc-700 transition-colors group"
                >
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">EMAIL COORDINATE</div>
                    <div className="font-mono text-white text-xs">{profile.email}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-zinc-200 hover:text-emerald-400 hover:border-zinc-700 transition-colors group"
                >
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">TELEPHONE / WHATSAPP</div>
                    <div className="font-mono text-white text-xs">{profile.phone}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-zinc-200">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">GEOGRAPHY & TIMEZONE</div>
                    <div className="font-sans text-white text-xs">{profile.location} (WAT • GMT+1)</div>
                  </div>
                  <MapPin className="w-4 h-4 text-zinc-400" />
                </div>

                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-zinc-200 hover:text-emerald-400 hover:border-zinc-700 transition-colors group"
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">LINKEDIN PROFESSIONAL</div>
                      <div className="font-sans text-white text-xs">linkedin.com/in/abiodunayodeji</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </a>
                )}
              </div>

              {/* CV Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenCvModal}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 py-3 rounded-2xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>REVIEW VERIFIED DOSSIER / CV</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="mb-6 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  TRANSMISSION CONSOLE
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Send a Direct Message
                </h3>
              </div>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-zinc-950 border border-emerald-500/40 text-center space-y-4 animate-in fade-in-50">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-mono">TRANSMISSION DELIVERED</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">{responseMsg}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold px-5 py-2.5 rounded-xl transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono">
                      {responseMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        ORGANISATION
                      </label>
                      <input
                        type="text"
                        placeholder="Company / Team name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        ENGAGEMENT TYPE
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 font-sans"
                      >
                        <option value="Recruitment & Job Opportunity">Full-Time / Contract Role</option>
                        <option value="Business Intelligence & Analytics Project">BI / Analytics Engagement</option>
                        <option value="Performance & Planning Advisory">Performance Planning Advisory</option>
                        <option value="Volunteering & Community Impact">Social Research Collaboration</option>
                        <option value="General Professional Inquiry">General Professional Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      MESSAGE CONTENT *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Specify your inquiry, role requirements, or project scope..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>

                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 py-3.5 rounded-2xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

