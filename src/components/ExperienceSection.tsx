import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const { experiences } = data;

  return (
    <section id="experience" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          CAREER TRACK RECORD
        </span>

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            5+ years bridging business operations, commercial analytics, and data-driven planning.
          </p>
        </div>

        {/* Chronological Experience List */}
        <div className="space-y-8">
          {(experiences || []).map((exp) => {
            const roleTitle = exp.jobTitle || exp.role || 'Analyst';
            const orgName = exp.organisation || exp.company || 'MultiChoice Group';
            const dateRange =
              exp.startDate && exp.endDate
                ? `${exp.startDate} – ${exp.endDate}`
                : exp.period || '2024 – Present';
            const responsibilities = exp.responsibilities || [];
            const achievements = exp.achievements || [];
            const technologies = exp.technologies || [];

            return (
              <div
                key={exp.id}
                id={`experience-entry-${exp.id}`}
                className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 sm:p-7 shadow-xs transition-shadow hover:shadow-sm"
              >
                {/* Top Row: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-zinc-200/80">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                      {roleTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-600">
                      <span className="font-medium text-zinc-900">{orgName}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-white border border-zinc-200 px-3 py-1 rounded-md self-start sm:self-auto font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{dateRange}</span>
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="text-xs sm:text-sm text-zinc-700 mt-4 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Core Responsibilities */}
                {responsibilities.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider block">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-2">
                      {responsibilities.map((resp, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements Bullets */}
                {achievements.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-semibold text-zinc-900 uppercase tracking-wider block">
                      Key Outcomes & Quantitative Impact:
                    </span>
                    <ul className="space-y-2">
                      {achievements.map((achievement, aIdx) => (
                        <li
                          key={aIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mt-2 shrink-0" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: achievement
                                .replace(
                                  /(35%|135%|20%|42%|420|200\+|4 days)/g,
                                  '<strong>$1</strong>'
                                )
                                .replace(
                                  /(MultiChoice Group|Showmax 2\.0|SQL|Power BI|GamblePause Africa)/g,
                                  '<strong>$1</strong>'
                                ),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlight KPI Card if present */}
                {exp.highlightKpi && (
                  <div className="mt-4 p-3.5 bg-white border border-zinc-200/90 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Highlight Result
                      </span>
                      <div className="text-xs font-semibold text-zinc-900 mt-0.5">
                        {exp.highlightKpi.metric}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {exp.highlightKpi.context}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">
                      {exp.highlightKpi.value}
                    </div>
                  </div>
                )}

                {/* Tools / Skills Tags */}
                {technologies.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-zinc-200/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-medium text-zinc-500 mr-1.5">
                      Technologies:
                    </span>
                    {technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium bg-white text-zinc-700 border border-zinc-200 px-2.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
