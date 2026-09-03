import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenCvModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (type: 'email' | 'phone', val: string) => {
    navigator.clipboard.writeText(val);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

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
      setResponseMsg(json.message || 'Thank you. Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        subject: 'Job Opportunity',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setResponseMsg(err.message || 'Message noted. Please also feel free to email directly.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          LET'S CONNECT
        </span>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Get in touch.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            I'm always open to discussing new opportunities, data projects or analytical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
                  Availability
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Currently available for full-time roles & contracts</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-200">
                {/* Email Item */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-500">Email Address</div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-black transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('email', profile.email)}
                    className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-600 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-500">Phone Number</div>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-black transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('phone', profile.phone)}
                    className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-600 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                      {profile.location}
                    </div>
                  </div>
                </div>

                {/* LinkedIn Item */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500">LinkedIn Profile</div>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-semibold text-zinc-900 hover:underline"
                    >
                      linkedin.com/in/abiodun-ayodeji
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-semibold text-zinc-900 mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-zinc-600 mb-6">
                Fill in the details below and I'll get back to you promptly.
              </p>

              {status === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-semibold text-emerald-900">Message Delivered</div>
                  <p className="text-xs text-emerald-700">{responseMsg}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Subject / Purpose
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500"
                    >
                      <option value="Job Opportunity">Job Opportunity (Full-time / Contract)</option>
                      <option value="Project Collaboration">Project Collaboration & Analytics</option>
                      <option value="Social Impact / Research">Social Impact / GamblePause Africa</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project scope, role details, or your inquiry..."
                      className="w-full bg-white border border-zinc-300 rounded-md p-3 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                      {responseMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white px-5 py-2.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5" />
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
