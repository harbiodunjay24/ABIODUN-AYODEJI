import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../types';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  FileCheck,
  X,
} from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  const { data } = usePortfolio();
  const { education, certifications } = data;

  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  return (
    <section id="education-certifications" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          ACADEMIC & PROFESSIONAL CREDENTIALS
        </span>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Education & Certifications
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Formal business administration training paired with verified certifications in SQL, BI, and AI.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-200">
              <GraduationCap className="w-4 h-4 text-zinc-800" />
              <h3 className="text-base font-semibold text-zinc-900">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {(education || []).map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 px-2 py-0.5 rounded">
                      {edu.qualification}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-zinc-900 mt-2">
                    {edu.programme}
                  </h4>
                  <div className="text-xs text-zinc-600 font-medium mt-0.5">
                    {edu.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-3 mt-3 border-t border-zinc-200/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {edu.location}
                    </span>
                    {edu.expectedGraduation && (
                      <span className="text-zinc-700 font-medium">
                        Expected: {edu.expectedGraduation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-800" />
                <h3 className="text-base font-semibold text-zinc-900">
                  Professional Certifications
                </h3>
              </div>
              <span className="text-xs text-zinc-500">
                {(certifications || []).length} verified credentials
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(certifications || []).map((cert) => {
                const certTitle = cert.title || cert.name || 'Professional Certification';
                const certIssuer = cert.issuingOrganisation || cert.issuer || 'Issuer';
                const certYear = cert.issueYear || cert.issueDate || '2024';
                const hasUrl = Boolean(cert.credentialUrl);

                return (
                  <div
                    key={cert.id}
                    onClick={() => setActiveCert(cert)}
                    className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-zinc-300 hover:bg-white transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                        <span className="font-semibold text-zinc-700">{certIssuer}</span>
                        <span className="font-mono text-zinc-500">{certYear}</span>
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-black leading-snug">
                        {certTitle}
                      </h4>

                      {/* Subject of Certification */}
                      {cert.skillsTagged && cert.skillsTagged.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {cert.skillsTagged.map((subj, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-[10px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/80 px-2 py-0.5 rounded"
                            >
                              {subj}
                            </span>
                          ))}
                        </div>
                      )}

                      {cert.credentialId && (
                        <div className="text-[10px] text-zinc-400 mt-2 font-mono">
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs">
                      {hasUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target={cert.credentialUrl?.startsWith('#') ? undefined : '_blank'}
                          rel={cert.credentialUrl?.startsWith('#') ? undefined : 'noopener noreferrer'}
                          onClick={(e) => {
                            if (cert.credentialUrl?.startsWith('#')) {
                              e.preventDefault();
                              const el = document.querySelector(cert.credentialUrl);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                            e.stopPropagation();
                          }}
                          className="inline-flex items-center gap-1.5 font-semibold text-zinc-900 hover:text-black hover:underline"
                        >
                          <span>{cert.credentialUrl?.startsWith('#') ? 'View in Document Vault' : 'Verify Direct Link'}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-zinc-500">Verified Credential</span>
                      )}

                      <span className="text-zinc-500 group-hover:text-zinc-800 text-[11px] font-medium">
                        Details & Syllabus
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Certification Detail Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {activeCert.issuingOrganisation || activeCert.issuer}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mt-1">
                  {activeCert.title || activeCert.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-md hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Issue Date</span>
                <span className="font-medium text-zinc-900">
                  {activeCert.issueYear || activeCert.issueDate}
                </span>
              </div>

              {/* Subject Tags */}
              {activeCert.skillsTagged && activeCert.skillsTagged.length > 0 && (
                <div className="py-2 border-b border-zinc-100">
                  <span className="text-zinc-500 block mb-1.5">Certification Subjects & Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skillsTagged.map((subj, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-zinc-100 text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeCert.credentialId && (
                <div className="flex justify-between py-1.5 border-b border-zinc-100 font-mono">
                  <span className="text-zinc-500">Credential ID</span>
                  <span className="font-medium text-zinc-900">{activeCert.credentialId}</span>
                </div>
              )}

              {activeCert.description && (
                <div className="py-2 leading-relaxed">
                  <span className="text-zinc-500 block mb-1">Details & Syllabus</span>
                  <p className="text-zinc-800 bg-[#FAFAFA] p-3 rounded-md border border-zinc-200 text-xs sm:text-sm leading-relaxed">
                    {activeCert.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
              {activeCert.credentialUrl ? (
                <a
                  href={activeCert.credentialUrl}
                  target={activeCert.credentialUrl.startsWith('#') ? undefined : '_blank'}
                  rel={activeCert.credentialUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
                  onClick={(e) => {
                    if (activeCert.credentialUrl?.startsWith('#')) {
                      e.preventDefault();
                      setActiveCert(null);
                      const el = document.querySelector(activeCert.credentialUrl);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-md text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <span>{activeCert.credentialUrl.startsWith('#') ? 'View in Document Vault' : 'Open Direct Credential Link'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-zinc-500">Verified Certificate</span>
              )}
              <button
                onClick={() => setActiveCert(null)}
                className="text-xs font-medium text-zinc-700 hover:text-black px-4 py-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
