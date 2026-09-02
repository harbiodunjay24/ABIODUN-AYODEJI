import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Copy,
  Check,
  FileDown,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ShieldCheck,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
} from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCoverLetterAi?: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const { profile, experiences, skills, education, certifications } = data;

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'ats-plaintext'>('formatted');

  if (!isOpen) return null;

  // ATS Plaintext generation
  const generateAtsPlaintext = () => {
    let text = `${(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}\n`;
    text += `${profile.professionalTitle || ''}\n`;
    text += `Location: ${profile.location || ''} | Email: ${profile.email || ''} | Phone: ${profile.phone || ''}\n`;
    text += `LinkedIn: ${profile.socialLinks?.linkedin || ''}\n\n`;

    text += `PROFESSIONAL SUMMARY\n`;
    text += `${profile.aboutMe || ''}\n\n`;

    text += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
    skills.forEach((s) => {
      text += `• ${s.name} (${s.proficiency} - ${s.category})\n`;
    });
    text += `\n`;

    text += `PROFESSIONAL EXPERIENCE\n\n`;
    experiences.forEach((exp) => {
      text += `${(exp.jobTitle || '').toUpperCase()} | ${(exp.organisation || '').toUpperCase()}\n`;
      text += `${exp.startDate || ''} - ${exp.endDate || ''} | ${exp.location || ''}\n`;
      (exp.responsibilities || []).forEach((r) => {
        text += `• ${r}\n`;
      });
      if (exp.achievements && exp.achievements.length > 0) {
        text += `Key Achievements:\n`;
        exp.achievements.forEach((a) => {
          text += `  * ${a}\n`;
        });
      }
      text += `\n`;
    });

    text += `EDUCATION\n\n`;
    education.forEach((edu) => {
      text += `${edu.qualification}: ${edu.programme}\n`;
      text += `${edu.institution} (${edu.startDate} - ${edu.endDate})\n\n`;
    });

    text += `CERTIFICATIONS\n\n`;
    certifications.forEach((c) => {
      text += `• ${c.title} - ${c.issuingOrganisation} (${c.issueYear})\n`;
    });

    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateAtsPlaintext());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50"
      onClick={onClose}
    >
      <div
        id="cv-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#08090c] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-zinc-900 bg-[#0d0f14] gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-display">
                Executive Curriculum Vitae
              </h3>
              <div className="text-[10px] text-zinc-400 font-mono">
                GROUNDED ATS DOSSIER • UPDATED {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle View Mode */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('formatted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'formatted'
                    ? 'bg-zinc-800 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EXECUTIVE
              </button>
              <button
                onClick={() => setViewMode('ats-plaintext')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'ats-plaintext'
                    ? 'bg-zinc-800 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ATS PLAINTEXT
              </button>
            </div>

            {/* Print */}
            <button
              id="btn-print-cv"
              onClick={handlePrint}
              title="Print Document"
              className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy */}
            <button
              id="btn-copy-cv"
              onClick={handleCopy}
              className="bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            {/* Close */}
            <button
              id="btn-close-cv-modal"
              onClick={onClose}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Document View */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-[#08090c] text-zinc-200 space-y-8 font-sans">
          
          {viewMode === 'ats-plaintext' ? (
            /* ATS Plaintext view */
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-300 select-all">
              {generateAtsPlaintext()}
            </div>
          ) : (
            /* Formatted Executive Paper style */
            <div id="cv-paper-print" className="space-y-8 max-w-3xl mx-auto">
              
              {/* Header */}
              <div className="border-b border-zinc-900 pb-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                      {(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}
                    </h1>
                    <div className="text-sm font-semibold text-emerald-400 mt-1 font-mono">
                      {profile.professionalTitle}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED PROFILE</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{profile.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{profile.phone}</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Executive Summary</span>
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {profile.aboutMe}
                </p>
              </div>

              {/* Core Skills Matrix */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Technical & Analytical Competencies</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {skills.map((sk) => (
                    <div
                      key={sk.id}
                      className="p-3 bg-[#0d0f14] border border-zinc-800 rounded-xl flex items-center justify-between"
                    >
                      <span className="font-semibold text-zinc-200">{sk.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {sk.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-5">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Work Experience</span>
                </h2>

                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2.5 p-4 rounded-2xl bg-[#0d0f14] border border-zinc-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h3 className="text-sm font-bold text-white font-display">
                            {exp.jobTitle}
                          </h3>
                          <div className="text-xs font-semibold text-emerald-400 font-mono">
                            {exp.organisation} • {exp.location}
                          </div>
                        </div>
                        <div className="text-xs font-mono text-zinc-400">
                          {exp.startDate} – {exp.endDate}
                        </div>
                      </div>

                      <ul className="space-y-1.5 pl-2">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 mt-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                            KEY ACHIEVEMENTS:
                          </span>
                          {exp.achievements.map((ach, i) => (
                            <div key={i} className="text-xs text-zinc-200 flex items-start gap-2 font-sans">
                              <span className="text-emerald-400 font-mono">★</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                <div className="space-y-3">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education</span>
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="text-xs space-y-1 p-3 rounded-xl bg-[#0d0f14] border border-zinc-800">
                        <div className="font-bold text-white">{edu.qualification} in {edu.programme}</div>
                        <div className="text-zinc-400 font-mono">{edu.institution} ({edu.startDate} - {edu.endDate})</div>
                        {edu.honours && <div className="text-amber-400 font-mono text-[11px]">{edu.honours}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Certifications</span>
                  </h2>
                  <div className="space-y-2">
                    {certifications.map((c) => (
                      <div key={c.id} className="text-xs p-3 rounded-xl bg-[#0d0f14] border border-zinc-800">
                        <span className="font-semibold text-zinc-200">{c.title}</span>
                        <div className="text-zinc-400 font-mono text-[11px]">{c.issuingOrganisation} ({c.issueYear})</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-zinc-900 bg-[#0d0f14] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 font-mono">
            GROUNDED DOSSIER READY FOR RECRUITMENT ATS
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>COPY TEXT</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>SAVE / PRINT PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

