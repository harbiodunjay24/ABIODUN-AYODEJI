import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { generateCvPdf, generateResumePdf, downloadAtsPlainTextFile } from '../utils/pdfGenerator';
import {
  X,
  Printer,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Download,
  ChevronDown,
  Layers,
  Eye,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCoverLetterAi?: () => void;
}

type ViewMode = 'executive-cv' | 'targeted-resume' | 'print-preview' | 'ats-text';

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, onOpenCoverLetterAi }) => {
  const { data } = usePortfolio();
  const { profile, experiences, skills, education, certifications, volunteering } = data;

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('executive-cv');
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [printToast, setPrintToast] = useState(false);
  const printTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Dynamically format 'Last Updated' date string reflecting the CMS state
  const lastUpdatedDateString = React.useMemo(() => {
    // Check if the portfolio data or CV document in CMS has a recorded lastUpdated timestamp
    const cvDoc = data.documents?.find(
      (d) =>
        d.category === 'CV' ||
        d.id?.toLowerCase().includes('cv') ||
        d.name?.toLowerCase().includes('cv')
    );
    const rawTimestamp = data.lastUpdated || cvDoc?.lastUpdated;

    if (rawTimestamp) {
      const parsedDate = new Date(rawTimestamp);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      return rawTimestamp;
    }

    // Default to dynamic current date formatted with month, day, and year
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [data.lastUpdated, data.documents]);

  // Dynamic JavaScript injection into print footer DOM elements to guarantee latest version display
  useEffect(() => {
    const injectDateIntoPrintFooters = () => {
      const targetElements = document.querySelectorAll<HTMLElement>('.cv-dynamic-last-updated');
      targetElements.forEach((el) => {
        el.textContent = `Last Updated: ${lastUpdatedDateString}`;
      });
    };

    // Immediate injection upon render
    injectDateIntoPrintFooters();

    // Event-driven injection before browser print dialogue executes
    const handleBeforePrint = () => {
      injectDateIntoPrintFooters();
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, [lastUpdatedDateString, isOpen, viewMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (printTimerRef.current) {
        clearTimeout(printTimerRef.current);
      }
    };
  }, [isOpen, onClose]);

  // Click outside to close download dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleDownloadCvPdf = () => {
    try {
      setDownloadingFormat('cv');
      generateCvPdf(data);
    } catch (err) {
      console.error('Failed to generate Executive CV PDF:', err);
    } finally {
      setTimeout(() => setDownloadingFormat(null), 1200);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadResumePdf = () => {
    try {
      setDownloadingFormat('resume');
      generateResumePdf(data);
    } catch (err) {
      console.error('Failed to generate Resume PDF:', err);
    } finally {
      setTimeout(() => setDownloadingFormat(null), 1200);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadAtsText = () => {
    try {
      setDownloadingFormat('text');
      downloadAtsPlainTextFile(data);
    } catch (err) {
      console.error('Failed to download ATS text:', err);
    } finally {
      setTimeout(() => setDownloadingFormat(null), 600);
      setShowDownloadMenu(false);
    }
  };

  const generateAtsPlaintext = () => {
    let text = `${(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}\n`;
    text += `${profile.professionalTitle || 'Data Analyst | Performance & Planning Analyst'}\n`;
    text += `Location: ${profile.location || 'Lagos, Nigeria'} | Phone: ${profile.phone || '07054195682'} | Email: ${profile.email || 'ayodejiharbiodun24@gmail.com'}\n`;
    text += `LinkedIn: https://www.linkedin.com/in/abiodun-ayodeji24 | GitHub: https://github.com/harbiodunjay24\n\n`;

    text += `================================================================================\n`;
    text += `PROFESSIONAL SUMMARY\n`;
    text += `================================================================================\n`;
    text += `${profile.aboutMe || ''}\n\n`;

    text += `================================================================================\n`;
    text += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
    text += `================================================================================\n`;
    skills.forEach((s) => {
      text += `• ${s.name} (${s.category} - ${s.proficiency})\n`;
    });
    text += `\n`;

    text += `================================================================================\n`;
    text += `WORK EXPERIENCE\n`;
    text += `================================================================================\n`;
    experiences.forEach((exp) => {
      text += `${(exp.jobTitle || '').toUpperCase()}\n`;
      text += `${exp.organisation || ''} | ${exp.location || ''} | ${exp.startDate || ''} – ${exp.endDate || ''}\n`;
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

    text += `================================================================================\n`;
    text += `VOLUNTEERING, PSYCHOLOGY & SOCIAL IMPACT\n`;
    text += `================================================================================\n`;
    (volunteering || []).forEach((v) => {
      text += `${v.organisation.toUpperCase()} — ${v.role} (${v.dates})\n`;
      text += `${v.description}\n\n`;
    });

    text += `================================================================================\n`;
    text += `EDUCATION\n`;
    text += `================================================================================\n`;
    education.forEach((edu) => {
      text += `${edu.qualification}: ${edu.programme}\n`;
      text += `${edu.institution} (${edu.startDate} – ${edu.endDate})\n\n`;
    });

    text += `================================================================================\n`;
    text += `CERTIFICATIONS & CREDENTIALS\n`;
    text += `================================================================================\n`;
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
    if (printTimerRef.current) {
      clearTimeout(printTimerRef.current);
    }

    // Explicit synchronous JavaScript injection to ensure the print footer displays the most recent CMS version
    const targetElements = document.querySelectorAll<HTMLElement>('.cv-dynamic-last-updated');
    targetElements.forEach((el) => {
      el.textContent = `Last Updated: ${lastUpdatedDateString}`;
    });

    setPrintToast(true);
    try {
      window.print();
    } catch (err) {
      console.error('Failed to trigger window.print():', err);
    }
    printTimerRef.current = setTimeout(() => {
      setPrintToast(false);
    }, 4500);
  };

  return (
    <div
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cv-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-slate-100 border border-slate-200/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Top Control Toolbar (strictly isolated with no-print) */}
        <header
          id="cv-modal-toolbar"
          className="no-print shrink-0 flex flex-wrap items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200 bg-white gap-3 z-20"
        >
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-white shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                  Verified Executive CV & Resume
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  A4 Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.fullName} · {profile.professionalTitle}
              </p>
            </div>
          </div>

          {/* Center / Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Selector Tabs */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                id="btn-tab-executive-cv"
                onClick={() => setViewMode('executive-cv')}
                title="Full comprehensive Curriculum Vitae"
                className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'executive-cv'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Executive CV
              </button>
              <button
                id="btn-tab-targeted-resume"
                onClick={() => setViewMode('targeted-resume')}
                title="1-2 Page Targeted Executive Resume"
                className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'targeted-resume'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Modern Resume
              </button>
              <button
                id="btn-tab-print-preview"
                onClick={() => setViewMode('print-preview')}
                title="Exact A4 Print Sheet Preview"
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'print-preview'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3 h-3 text-slate-500" />
                <span>Print View</span>
              </button>
              <button
                id="btn-tab-ats-text"
                onClick={() => setViewMode('ats-text')}
                title="Plain unformatted text for ATS portals"
                className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'ats-text'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ATS Text
              </button>
            </div>

            {/* Download PDF Dropdown Menu */}
            <div className="relative" ref={downloadMenuRef}>
              <button
                id="btn-download-options"
                onClick={() => setShowDownloadMenu((prev) => !prev)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                aria-expanded={showDownloadMenu}
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingFormat ? `Generating ${downloadingFormat.toUpperCase()}...` : 'Download PDF'}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showDownloadMenu && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Standard Professional Formats
                    </span>
                  </div>

                  <button
                    onClick={handleDownloadCvPdf}
                    disabled={downloadingFormat !== null}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-start gap-2.5 transition-colors disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Executive Curriculum Vitae (PDF)</div>
                      <div className="text-[11px] text-slate-500">
                        Multi-page comprehensive CV with all roles, projects & impact.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleDownloadResumePdf}
                    disabled={downloadingFormat !== null}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-start gap-2.5 transition-colors disabled:opacity-50"
                  >
                    <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Targeted Modern Resume (PDF)</div>
                      <div className="text-[11px] text-slate-500">
                        Condensed 1-2 page format with prominent KPI metric cards.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleDownloadAtsText}
                    disabled={downloadingFormat !== null}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-start gap-2.5 transition-colors disabled:opacity-50 border-t border-slate-100"
                  >
                    <FileCode className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">ATS Plain Text Document (.txt)</div>
                      <div className="text-[11px] text-slate-500">
                        Unformatted plain text for direct ATS recruiter intake.
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Print Button */}
            <button
              id="btn-print-cv"
              onClick={handlePrint}
              title="Print Document or Save as PDF (A4 standard)"
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                printToast
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200'
              }`}
            >
              {printToast ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in-75 duration-150" />
                  <span className="hidden sm:inline text-emerald-800">Print Dialogue Open</span>
                </>
              ) : (
                <>
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              id="btn-copy-cv"
              onClick={handleCopy}
              title="Copy ATS-formatted text to clipboard"
              className="bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* AI Cover Letter shortcut */}
            {onOpenCoverLetterAi && (
              <button
                id="btn-open-cover-letter-ai"
                onClick={() => {
                  onClose();
                  onOpenCoverLetterAi();
                }}
                className="hidden lg:flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>AI Cover Letter</span>
              </button>
            )}

            {/* Close Button */}
            <button
              id="btn-close-cv-modal"
              onClick={onClose}
              aria-label="Close CV modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Modal Scrollable Document View Canvas */}
        <main
          id="cv-printable-content"
          className="flex-1 overflow-y-auto bg-slate-100/80 p-3 sm:p-6 md:p-8 text-slate-900 font-sans"
        >
          {viewMode === 'ats-text' ? (
            /* ATS Plain Text View */
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Plaintext ATS-Optimized Format
                </span>
                <button
                  onClick={handleDownloadAtsText}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download .txt</span>
                </button>
              </div>
              <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all overflow-x-auto bg-slate-50 p-4 rounded-lg border border-slate-200/80">
                {generateAtsPlaintext()}
              </pre>
            </div>
          ) : viewMode === 'targeted-resume' ? (
            /* Targeted Modern Executive Resume View */
            <article
              id="cv-paper-print"
              className="cv-paper-sheet max-w-[800px] mx-auto bg-white border border-slate-200/80 rounded-md shadow-xl p-6 sm:p-10 md:p-12 space-y-7"
            >
              {/* Header */}
              <div className="cv-section cv-avoid-break border-b border-slate-200 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}
                    </h1>
                    <div className="text-xs sm:text-sm font-bold text-blue-700 mt-1 uppercase tracking-wide">
                      Data Analyst | Performance & Planning Analyst
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Lagos, Nigeria</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100 mt-3">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-blue-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.email}</span>
                  </a>
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-blue-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.phone}</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abiodun-ayodeji24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-700"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                    <span>linkedin.com/in/abiodun-ayodeji24</span>
                  </a>
                </div>
              </div>

              {/* 3 Executive Highlight KPI Cards */}
              <div className="cv-metric-box cv-avoid-break grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-base sm:text-lg font-black text-blue-700 block">35% Faster</span>
                  <span className="text-xs font-bold text-slate-900 block">Reporting Turnaround</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                    Automated SQL models & Power BI data models
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-base sm:text-lg font-black text-blue-700 block">135% Surge</span>
                  <span className="text-xs font-bold text-slate-900 block">Showmax Activations</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                    Commercial analytics & national campaign support
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-base sm:text-lg font-black text-blue-700 block">420+ Surveyed</span>
                  <span className="text-xs font-bold text-slate-900 block">Behavioral Research</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                    GamblePause Africa empirical policy research
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="cv-section cv-avoid-break space-y-1.5">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Executive Profile
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  Performance & Planning Analyst with 5+ years of progressive corporate experience at MultiChoice Group translating high-volume transactional data into actionable executive intelligence. Specialist in SQL data modeling, Power BI dashboard architecture, KPI governance, budget variance frameworks, Google Workspace automation (Apps Script), and modern AI systems. Recognized for driving operational turnaround and leading empirical social impact research across Africa.
                </p>
              </div>

              {/* Core Competencies Matrix */}
              <div className="cv-section cv-avoid-break space-y-2">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Technical & Analytical Stack
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Data & SQL:</span>
                    <span className="text-slate-600">SQL (DataCamp Certified, PostgreSQL, MySQL), Relational Modeling, EDA</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Business Intelligence:</span>
                    <span className="text-slate-600">Microsoft Power BI (DAX, Star Schema), Advanced Excel, Looker Studio</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Governance & Planning:</span>
                    <span className="text-slate-600">KPI Governance, Capacity Forecasting, Budget Variance, Process SOPs</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Cloud, Scripting & AI:</span>
                    <span className="text-slate-600">Google Workspace, Google Apps Script, ChatGPT, Claude, Gemini, Notion</span>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="cv-section space-y-4">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="cv-item cv-avoid-break space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                        <div>
                          <span className="text-sm font-bold text-slate-900">{exp.jobTitle}</span>
                          <span className="text-slate-400 mx-1.5">|</span>
                          <span className="text-xs font-semibold text-blue-700">{exp.organisation}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc marker:text-slate-400">
                        {(exp.responsibilities || []).slice(0, 4).map((resp, i) => (
                          <li key={i} className="leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="bg-slate-50 px-3 py-2 rounded border border-slate-200/80 text-xs">
                          <span className="font-bold text-slate-900">Key Metric: </span>
                          <span className="text-slate-700">{exp.achievements[0]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Verified Credentials */}
              <div className="cv-section cv-avoid-break space-y-2">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Education & Key Credentials
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                  <div>
                    <span className="font-bold text-slate-900">B.Sc. in Psychology</span>
                    <span className="text-slate-400 mx-1.5">·</span>
                    <span className="text-slate-600">National Open University of Nigeria (NOUN)</span>
                  </div>
                  <span className="text-slate-500">2021 – 2025</span>
                </div>
                <p className="text-[11px] text-slate-600 pt-1">
                  <span className="font-semibold text-slate-800">Verified Credentials:</span> SQL Associate (DataCamp) · Advanced Business Analytics · Enterprise Power BI · Google Apps Script Developer.
                </p>
              </div>

              {/* Formal Document Metadata Footer */}
              <div className="cv-avoid-break pt-4 border-t border-slate-200 mt-6 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-1.5 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 tracking-wider">CONFIDENTIAL</span>
                  <span>•</span>
                  <span>FOR PROFESSIONAL EVALUATION ONLY</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Abiodun Ayodeji · MultiChoice Group</span>
                  <span>•</span>
                  <span className="cv-dynamic-last-updated font-semibold text-slate-700">
                    Last Updated: {lastUpdatedDateString}
                  </span>
                </div>
              </div>
            </article>
          ) : (
            /* Executive CV & Print Preview Shared Template */
            <article
              id="cv-paper-print"
              className={`cv-paper-sheet max-w-[820px] mx-auto bg-white border border-slate-200/80 rounded-md shadow-xl p-6 sm:p-10 md:p-12 space-y-7 ${
                viewMode === 'print-preview' ? 'ring-2 ring-slate-400/50 relative' : ''
              }`}
            >
              {/* Optional Print Preview Banner */}
              {viewMode === 'print-preview' && (
                <div className="no-print bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      <strong className="font-semibold">Print Media Preview:</strong> Formatted to standard A4 (210mm × 297mm) with break-avoidance on all job entries, skills, and metrics.
                    </span>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-medium shrink-0 ml-2"
                  >
                    Print Now
                  </button>
                </div>
              )}

              {/* 1. Header & Contact Details */}
              <div className="cv-section cv-avoid-break border-b border-slate-200 pb-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {(profile.fullName || 'Abiodun Ayodeji').toUpperCase()}
                    </h1>
                    <div className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5 tracking-wide">
                      {profile.professionalTitle || 'Data Analyst | Performance & Planning Analyst'}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {profile.location || 'Lagos, Nigeria'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 pt-2">
                  <a
                    href={`mailto:${profile.email || 'ayodejiharbiodun24@gmail.com'}`}
                    className="flex items-center gap-1.5 hover:text-slate-900"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profile.email}</span>
                  </a>
                  <a
                    href={`tel:${profile.phone || '07054195682'}`}
                    className="flex items-center gap-1.5 hover:text-slate-900"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profile.phone}</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abiodun-ayodeji24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-900"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>linkedin.com/in/abiodun-ayodeji24</span>
                  </a>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <a
                    href="https://github.com/harbiodunjay24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900"
                  >
                    github.com/harbiodunjay24
                  </a>
                </div>
              </div>

              {/* 2. Professional Summary */}
              <div className="cv-section cv-avoid-break space-y-2">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {profile.aboutMe ||
                    'Performance & Planning Analyst and Data Analyst with over 5 years of progressive corporate experience at MultiChoice Group. Proven track record of transforming disparate transactional datasets into high-leverage Power BI dashboards, automated SQL models, and budget variance frameworks that accelerate executive decision-making cycles by 35%.'}
                </p>
              </div>

              {/* 3. Core Competencies & Skills */}
              <div className="cv-section cv-avoid-break space-y-2.5">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Core Skills & Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-1">Data & Analytics:</span>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed">
                      SQL (DataCamp Certified, PostgreSQL, MySQL), Relational Modeling, Advanced Excel (Power Query, Dynamic Arrays), Exploratory Data Analysis (EDA).
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-1">Business Intelligence:</span>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed">
                      Microsoft Power BI, DAX Modeling, Google Looker Studio, Executive Dashboards, KPI Governance & Commercial Trend Analysis.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-1">Performance & Planning:</span>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed">
                      Capacity Forecasting, Budget Variance Tracking, Operational Turnaround, KPI Scorecards, Workflow Streamlining.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-1">Cloud, AI & Automation:</span>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed">
                      Google Workspace (Sheets, Docs, Slides, Drive), Google Apps Script, Modern AI (ChatGPT, Claude, Gemini, Notion).
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Professional Work Experience */}
              <div className="cv-section space-y-5">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="cv-item cv-avoid-break space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <span className="text-sm font-bold text-slate-900">{exp.jobTitle}</span>
                          <span className="text-slate-400 mx-1.5">|</span>
                          <span className="text-xs font-semibold text-blue-700">{exp.organisation}</span>
                          <span className="text-xs text-slate-500 ml-1.5">({exp.location})</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500 shrink-0">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc marker:text-slate-400">
                        {(exp.responsibilities || []).map((resp, i) => (
                          <li key={i} className="leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                          <span className="text-[11px] font-bold text-slate-900 block mb-1">
                            Key Achievements & Impact:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-blue-600">
                            {exp.achievements.map((ach, i) => (
                              <li key={i} className="leading-relaxed">
                                {ach}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Volunteering, Psychology & Social Impact */}
              <div className="cv-section space-y-3">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Volunteering, Psychology & Social Impact
                </h2>
                <div className="space-y-3.5">
                  {(data.volunteering || []).map((v) => (
                    <div key={v.id} className="cv-item cv-avoid-break text-xs space-y-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                        <span className="font-bold text-slate-900">
                          {v.organisation} — <span className="text-slate-700 font-medium">{v.role}</span>
                        </span>
                        <span className="text-slate-500 font-medium text-[11px]">{v.dates}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11.5px]">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Education */}
              <div className="cv-section cv-avoid-break space-y-2.5">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="cv-item flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs gap-0.5">
                      <div>
                        <span className="font-bold text-slate-900">{edu.qualification}</span>
                        <span className="text-slate-400 mx-1.5">·</span>
                        <span className="text-slate-700 font-medium">{edu.programme}</span>
                        <div className="text-slate-500 text-[11px]">{edu.institution}</div>
                      </div>
                      <span className="text-slate-500 font-medium text-[11px]">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Certifications & Verified Credentials */}
              <div className="cv-section cv-avoid-break space-y-3">
                <h2 className="cv-section-title text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Certifications & Verified Credentials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {certifications.map((c) => {
                    const certTitle = c.title || c.name || 'Certification';
                    const certIssuer = c.issuingOrganisation || c.issuer || 'Credential Issuer';
                    const certYear = c.issueYear || c.issueDate || '2024';
                    return (
                      <div
                        key={c.id}
                        className="cv-cert-card p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{certTitle}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {certIssuer} · {certYear}
                          </div>
                          {c.skillsTagged && c.skillsTagged.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {c.skillsTagged.map((subj, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-medium"
                                >
                                  {subj}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {c.credentialUrl && (
                          <div className="mt-2 pt-1.5 border-t border-slate-200/60 no-print">
                            <a
                              href={c.credentialUrl}
                              target={c.credentialUrl.startsWith('#') ? undefined : '_blank'}
                              rel={c.credentialUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
                              className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1"
                            >
                              <span>{c.credentialUrl.startsWith('#') ? 'Document Vault' : 'Verify Credential'}</span>
                              <ExternalLink className="w-3 h-3 text-blue-500" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formal Document Metadata Footer */}
              <div className="cv-avoid-break pt-4 border-t border-slate-200 mt-8 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-1.5 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 tracking-wider">CONFIDENTIAL</span>
                  <span>•</span>
                  <span>FOR PROFESSIONAL EVALUATION ONLY</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Abiodun Ayodeji · Curriculum Vitae · Verified Record</span>
                  <span>•</span>
                  <span className="cv-dynamic-last-updated font-semibold text-slate-700">
                    Last Updated: {lastUpdatedDateString}
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Formal Corporate Running Print Footer (Appears on every page during physical & PDF print) */}
          <aside className="cv-print-running-footer no-screen" aria-hidden="true" id="cv-print-running-footer">
            <div className="flex items-center">
              <span className="cv-print-badge">CONFIDENTIAL</span>
              <span>FOR EXECUTIVE EVALUATION ONLY</span>
            </div>
            <div className="font-semibold text-slate-700">
              Abiodun Ayodeji · Curriculum Vitae · MultiChoice Group
            </div>
            <div>
              <span className="cv-dynamic-last-updated font-medium">
                Last Updated: {lastUpdatedDateString}
              </span>
            </div>
          </aside>
        </main>

        {/* Print Dialogue Toast Notification (Strictly no-print) */}
        {printToast && (
          <div
            id="cv-print-toast"
            role="status"
            aria-live="polite"
            className="no-print absolute bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100%-2rem)] sm:w-auto bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-white tracking-tight">
                  Print dialogue initiated
                </p>
                <p className="text-[11px] text-slate-300 truncate sm:whitespace-normal">
                  Select your physical printer or choose "Save as PDF" for an instant A4 file.
                </p>
              </div>
            </div>
            <button
              type="button"
              id="btn-dismiss-cv-print-toast"
              onClick={() => setPrintToast(false)}
              aria-label="Dismiss print notification"
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

