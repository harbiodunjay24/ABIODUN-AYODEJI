import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  HeartHandshake,
  Users,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const VolunteeringImpact: React.FC = () => {
  const { data } = usePortfolio();
  const vol = data.volunteering[0];

  if (!vol) return null;

  return (
    <section id="impact" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>DATA WITH PURPOSE</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">05</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              SOCIAL IMPACT & RESEARCH
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Empirical statistical research investigating youth behaviours to drive real-world institutional policy and community advocacy.
            </p>
          </div>

          {vol.links?.[0] && (
            <a
              href={vol.links[0].url}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0d0f14] hover:bg-zinc-900 text-zinc-300 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-mono inline-flex items-center gap-2 transition-colors self-start md:self-auto"
            >
              <span>GAMBLE PAUSE INITIATIVE</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          )}
        </div>

        {/* Big Narrative & Metrics Card */}
        <div className="bg-[#0d0f14] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-zinc-900">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {vol.organisation} — {vol.role}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Statistical Investigation into Campus Gambling & Academic Outcomes
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed pt-2 font-sans">
                {vol.description}
              </p>
            </div>

            <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                RESEARCH TIMEFRAME
              </span>
              <div className="text-sm font-bold text-white font-mono">
                {vol.dates}
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Quantitative sampling across tertiary institutions in South-West Nigeria.
              </p>
            </div>
          </div>

          {/* 3 Hard Data Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-2">
              <div className="text-4xl font-extrabold font-mono text-emerald-400">
                420
              </div>
              <h4 className="text-sm font-bold text-white">Sample Population</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Multi-variable dataset sampled and sanitized across tertiary undergraduate cohorts.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-2">
              <div className="text-4xl font-extrabold font-mono text-amber-400">
                71.1%
              </div>
              <h4 className="text-sm font-bold text-white">Student Participation Identified</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Documented active engagement in sports wagering and digital betting platforms.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-2">
              <div className="text-4xl font-extrabold font-mono text-rose-400">
                40.6%
              </div>
              <h4 className="text-sm font-bold text-white">Academic Disruption Rate</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Direct correlation established with missed deadlines, lecture absenteeism, and stress.
              </p>
            </div>

          </div>

          {/* Research Pipeline Sequence */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              METHODOLOGY PIPELINE // FROM SURVEY DESIGN TO POLICY ACTION
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vol.researchPipeline.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"
                >
                  <div className="text-[10px] font-mono font-bold text-emerald-400">
                    STAGE 0{step.step}
                  </div>
                  <h5 className="text-xs font-bold text-white">{step.title}</h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings Checklist */}
          {vol.researchFindings && vol.researchFindings.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                CORE EMPIRICAL FINDINGS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {vol.researchFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-start gap-3"
                  >
                    <span className="text-emerald-400 font-mono text-xs mt-0.5">★</span>
                    <span className="leading-relaxed font-sans">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

