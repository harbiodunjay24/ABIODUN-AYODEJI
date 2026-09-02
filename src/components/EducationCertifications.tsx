import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../types';
import {
  GraduationCap,
  Award,
  MapPin,
  ExternalLink,
  ShieldCheck,
  X,
  FileBadge,
} from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  const { data } = usePortfolio();
  const { education, certifications } = data;

  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  return (
    <section id="education-certifications" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>ACADEMIC FOUNDATION & ACCREDITATIONS</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">CREDENTIALS</span>
        </div>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            ACCREDITATIONS & PEDAGOGY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            Formal business administration training paired with rigorous specialized certifications in SQL data warehousing, business intelligence, and financial analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-900">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">ACADEMIC BACKGROUND</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      {edu.qualification}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-bold text-white tracking-tight">
                    {edu.programme}
                  </h4>
                  <div className="text-xs font-semibold text-zinc-400 font-sans">
                    {edu.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-3 border-t border-zinc-900 font-mono">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {edu.location}
                    </span>
                    {edu.expectedGraduation && (
                      <span className="text-emerald-400">
                        EXPECTED: {edu.expectedGraduation}
                      </span>
                    )}
                    {edu.honours && (
                      <span className="text-amber-400">
                        {edu.honours}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">VERIFIED ACCREDITATIONS</h3>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                [{certifications.length} CREDENTIALS]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#0d0f14] border border-zinc-800 hover:border-emerald-500/40 rounded-3xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {cert.issuingOrganisation}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {cert.issueYear}
                      </span>
                    </div>

                    <h4 className="font-display text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {cert.title}
                    </h4>

                    {/* Skill Tags */}
                    {cert.skillsTagged && cert.skillsTagged.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cert.skillsTagged.map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-md"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-zinc-900 flex items-center justify-between">
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                    >
                      <FileBadge className="w-3.5 h-3.5" />
                      <span>INSPECT CREDENTIAL</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in-50"
          onClick={() => setActiveCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#08090c] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  VERIFIED ACCREDITATION
                </span>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-400">
                ISSUED BY {(activeCert.issuingOrganisation || '').toUpperCase()} • {activeCert.issueYear}
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {activeCert.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Demonstrates validated competency in data extraction pipelines, reporting dashboards, and relational schema querying.
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-2">
              <div className="text-xs font-mono font-bold text-zinc-300">COMPETENCIES EVALUATED:</div>
              <div className="flex flex-wrap gap-1.5">
                {activeCert.skillsTagged?.map((sk, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-[#0d0f14] text-emerald-400 border border-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              {activeCert.credentialUrl && (
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <span>VERIFY ISSUER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setActiveCert(null)}
                className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 text-xs font-mono px-4 py-2.5 rounded-xl border border-zinc-800 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

