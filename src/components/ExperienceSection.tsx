import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const { experiences } = data;

  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const careerSteps = [
    { year: '2020', stage: 'Customer Operations', entity: 'Multichoice / Outcess' },
    { year: '2022', stage: 'Project Management', entity: 'AIESEC in Lagos' },
    { year: '2024', stage: 'Sales & Analytics', entity: 'Commercial Retail' },
    { year: '2025+', stage: 'Performance & Planning', entity: 'Multichoice Group' },
  ];

  return (
    <section id="experience" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>CAREER TIMELINE</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">02</span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              CAREER JOURNEY
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Chronological track record spanning operations, commercial analytics, and enterprise performance planning.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>SINGLE SOURCE OF TRUTH</span>
          </div>
        </div>

        {/* Stepped Horizontal Progression Ribbon */}
        <div className="mb-14 pb-6 border-b border-zinc-900 overflow-x-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-[600px]">
            {careerSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 relative"
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold">
                  PHASE 0{idx + 1} // {step.year}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {step.stage}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {step.entity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                id={`experience-entry-${exp.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0d0f14] border-emerald-500/30 shadow-2xl'
                    : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-xs font-mono font-bold text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl shrink-0">
                      0{idx + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {exp.jobTitle}
                        </h3>
                        {exp.isCurrent && (
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
                        <span className="text-zinc-200 font-sans font-semibold">{exp.organisation}</span>
                        <span>/</span>
                        <span>{exp.location}</span>
                        <span>/</span>
                        <span>{exp.startDate} – {exp.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right KPI & Toggle */}
                  <div className="flex items-center gap-4 self-end md:self-center">
                    {exp.highlightKpi && (
                      <div className="hidden sm:flex flex-col items-end text-right">
                        <span className="text-sm font-mono font-bold text-emerald-400">
                          {exp.highlightKpi.value}
                        </span>
                        <span className="text-[10px] text-zinc-400 uppercase font-mono">
                          {exp.highlightKpi.metric}
                        </span>
                      </div>
                    )}
                    <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors border border-zinc-800">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-800/80 space-y-6 animate-in fade-in-50 duration-200">
                    
                    {/* Highlight KPI Box */}
                    {exp.highlightKpi && (
                      <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                            Key Impact Benchmark
                          </span>
                          <div className="text-xs font-semibold text-zinc-200">
                            {exp.highlightKpi.context}
                          </div>
                        </div>
                        <div className="text-lg font-mono font-extrabold text-emerald-400">
                          {exp.highlightKpi.value}
                        </div>
                      </div>
                    )}

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                        Scope of Accountability:
                      </div>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                          Key Analytical Achievements:
                        </div>
                        <div className="space-y-2">
                          {exp.achievements.map((ach, i) => (
                            <div
                              key={i}
                              className="text-xs sm:text-sm text-zinc-200 bg-zinc-950/90 p-3 rounded-xl border border-zinc-800 flex items-start gap-2.5"
                            >
                              <span className="text-emerald-400 font-mono text-xs">★</span>
                              <span className="leading-relaxed">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

