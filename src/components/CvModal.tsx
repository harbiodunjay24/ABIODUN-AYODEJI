import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
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

  // ATS Plaintext generator
  const generateAtsPlaintext = () => {
    let text = `${(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}\n`;
    text += `${profile.professionalTitle || ''}\n`;
    text += `Location: ${profile.location || ''} | Email: ${profile.email || ''} | Phone: ${profile.phone || ''}\n`;
    text += `LinkedIn: ${profile.socialLinks?.linkedin || profile.linkedinUrl || ''}\n\n`;

    text += `PROFESSIONAL SUMMARY\n`;
    text += `${profile.aboutMe || ''}\n\n`;

    text += `CORE SKILLS & TECHNOLOGIES\n`;
    skills.forEach((s) => {
      text += `• ${s.name} (${s.category})\n`;
    });
    text += `\n`;

    text += `WORK EXPERIENCE\n\n`;
    experiences.forEach((exp) => {
      text += `${(exp.jobTitle || '').toUpperCase()} — ${(exp.organisation || '').toUpperCase()}\n`;
      text += `${exp.startDate || ''} – ${exp.endDate || ''} | ${exp.location || ''}\n`;
      (exp.responsibilities || []).forEach((r) => {
        text += `• ${r}\n`;
      });
      if (exp.achievements && exp.achievements.length > 0) {
        text += `Key Achievements:\n`;
        exp.achievements.forEach((a) => {
          text += `  - ${a}\n`;
        });
      }
      text += `\n`;
    });

    text += `EDUCATION\n\n`;
    education.forEach((edu) => {
      text += `${edu.qualification}: ${edu.programme}\n`;
      text += `${edu.institution} (${edu.startDate} – ${edu.endDate})\n\n`;
    });

    text += `CERTIFICATIONS\n\n`;
    certifications.forEach((c) => {
      text += `• ${c.name} — ${c.issuer} (${c.issueDate})\n`;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="cv-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-zinc-200 bg-[#FAFAFA] gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Curriculum Vitae
              </h3>
              <div className="text-xs text-zinc-500">
                {profile.fullName} · {profile.professionalTitle}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-zinc-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('formatted')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'formatted'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => setViewMode('ats-plaintext')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'ats-plaintext'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ATS Text
              </button>
            </div>

            {/* Print */}
            <button
              id="btn-print-cv"
              onClick={handlePrint}
              title="Print Document"
              className="p-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy */}
            <button
              id="btn-copy-cv"
              onClick={handleCopy}
              className="bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Close */}
            <button
              id="btn-close-cv-modal"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Document View */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-zinc-900 space-y-8 font-sans">
          {viewMode === 'ats-plaintext' ? (
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-lg p-6 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-800 select-all">
              {generateAtsPlaintext()}
            </div>
          ) : (
            <div id="cv-paper-print" className="space-y-8 max-w-3xl mx-auto">
              {/* Header */}
              <div className="border-b border-zinc-200 pb-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                      {profile.fullName || 'Abiodun Ayodeji'}
                    </h1>
                    <div className="text-sm font-semibold text-zinc-700 mt-0.5">
                      {profile.professionalTitle}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-zinc-500">
                    Lagos, Nigeria
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600 pt-2">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{profile.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{profile.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{profile.linkedinUrl || 'linkedin.com/in/abiodun-ayodeji'}</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {profile.aboutMe}
                </p>
              </div>

              {/* Core Skills */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Core Skills & Technical Competencies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="bg-[#FAFAFA] border border-zinc-200 text-zinc-800 text-xs px-2.5 py-1 rounded"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <span className="text-sm font-semibold text-zinc-900">
                            {exp.jobTitle}
                          </span>
                          <span className="text-zinc-400 mx-1.5">·</span>
                          <span className="text-xs font-medium text-zinc-700">
                            {exp.organisation}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-zinc-600 pl-4 list-disc">
                        {(exp.responsibilities || []).map((resp, i) => (
                          <li key={i} className="leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-2 bg-[#FAFAFA] p-3 rounded border border-zinc-200">
                          <span className="text-[11px] font-semibold text-zinc-700 block mb-1">
                            Key Achievements:
                          </span>
                          <ul className="space-y-1 text-xs text-zinc-600 pl-4 list-disc">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-semibold text-zinc-900">{edu.qualification}</span>
                        <span className="text-zinc-400 mx-1.5">·</span>
                        <span className="text-zinc-700">{edu.programme}</span>
                        <div className="text-zinc-500 text-[11px]">{edu.institution}</div>
                      </div>
                      <span className="text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Certifications & Verified Credentials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {certifications.map((c) => {
                    const certTitle = c.title || c.name || 'Certification';
                    const certIssuer = c.issuingOrganisation || c.issuer || 'Credential Issuer';
                    const certYear = c.issueYear || c.issueDate || '2024';
                    return (
                      <div key={c.id} className="p-2.5 rounded bg-[#FAFAFA] border border-zinc-200 flex flex-col justify-between">
                        <div>
                          <div className="font-semibold text-zinc-900">{certTitle}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{certIssuer} · {certYear}</div>
                          {c.skillsTagged && c.skillsTagged.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {c.skillsTagged.map((subj, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-600 font-medium"
                                >
                                  {subj}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {c.credentialUrl && (
                          <div className="mt-2 pt-1.5 border-t border-zinc-200/60">
                            <a
                              href={c.credentialUrl}
                              target={c.credentialUrl.startsWith('#') ? undefined : '_blank'}
                              rel={c.credentialUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
                              className="text-[11px] font-semibold text-zinc-800 hover:text-black hover:underline inline-flex items-center gap-1"
                            >
                              <span>{c.credentialUrl.startsWith('#') ? 'Document Vault' : 'Verify Link'}</span>
                              <ExternalLink className="w-3 h-3 text-zinc-500" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
