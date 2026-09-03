import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Users, BookOpen, Globe, HeartHandshake } from 'lucide-react';

export const VolunteeringImpact: React.FC = () => {
  const { data } = usePortfolio();
  const { volunteering } = data;

  return (
    <section id="impact" className="py-20 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          COMMUNITY & IMPACT
        </span>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Beyond Work
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Community initiatives, psychological counseling, and empirical research across Africa.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="space-y-8">
          {(volunteering || []).map((item) => {
            const orgName = item.organisation || (item as any).organization || 'Community Initiative';
            const roleTitle = item.role || 'Volunteer';
            const dates = item.dates || (item as any).period || '';
            const findings = (item as any).achievements || item.researchFindings || [];
            const impactStats = item.impactStats || [];

            return (
              <div
                key={item.id}
                className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-zinc-200/80">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      <span>{orgName}</span>
                      <span>·</span>
                      <span className="text-zinc-700">{roleTitle}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">
                      {orgName === 'GamblePause Africa'
                        ? 'GamblePause Africa — Research & Psychological Support'
                        : orgName}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-md self-start sm:self-auto font-medium">
                    <span>{dates}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 mt-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements / Findings */}
                {findings.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <div className="text-xs font-semibold text-zinc-900">Key Contributions & Outcomes:</div>
                    <ul className="space-y-2">
                      {findings.map((ach: string, aIdx: number) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                          <span dangerouslySetInnerHTML={{
                            __html: ach
                              .replace(/(420|71\.1%|40\.6%|3 African countries|200\+|4-day|4 days|1,000\+|15\+|100%)/g, '<strong>$1</strong>')
                          }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact Metrics Callout */}
                {impactStats.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-zinc-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {impactStats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-[#FAFAFA] border border-zinc-200 rounded-lg p-4">
                        <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
                        <div className="text-xs font-medium text-zinc-700 mt-0.5">{stat.label}</div>
                        <p className="text-[11px] text-zinc-500 mt-1">{stat.detail}</p>
                      </div>
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
