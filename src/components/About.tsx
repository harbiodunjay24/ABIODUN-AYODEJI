import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Database,
  LineChart,
  BarChart2,
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const corePillars = [
    {
      tag: '01 / EXTRACTION & HYGIENE',
      title: 'SQL & Relational Analytics',
      desc: 'Writing optimized relational queries, CTEs, and window functions to extract clean, reliable data from disparate operational schemas.',
    },
    {
      tag: '02 / DIMENSIONAL MODELING',
      title: 'Power BI & BI Architecture',
      desc: 'Building scalable star-schema data models and dynamic DAX measures that turn transactions into actionable retention and revenue metrics.',
    },
    {
      tag: '03 / DECISION GOVERNANCE',
      title: 'Performance & Planning Governance',
      desc: 'Engineering budget vs. actual variance systems, forecasting frameworks, and executive scorecards that cut turnaround times by 35%.',
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>PHILOSOPHY & BACKGROUND</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">01</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            "I WORK WHERE <br />
            <span className="text-emerald-400">DATA MEETS</span> BUSINESS DECISIONS."
          </h2>
        </div>

        {/* Two-Column Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-zinc-900">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
            <p className="text-white font-medium">
              Over the past 5+ years, my career has evolved across frontline customer operations, digital project management, and high-impact commercial analytics.
            </p>
            <p>
              I specialize in bridging the gap between raw database tables and executive strategy. By combining rigorous <strong className="text-white font-semibold">SQL</strong> querying, dimensional <strong className="text-white font-semibold">Power BI</strong> modeling, and disciplined <strong className="text-white font-semibold">Performance & Planning</strong> analysis, I transform ambiguous business questions into clear, quantifiable answers.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Whether conducting statistical research on student behaviour or orchestrating 135% sales surges during national campaigns like Showmax 2.0, I focus on measurable outcomes: faster reporting cycles, reliable forecasts, and transparent operational governance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                SQL / CTEs / Window Functions
              </span>
              <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                Power BI / DAX / Tabular Models
              </span>
              <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                Variance & Capacity Planning
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0d0f14] border border-zinc-800 rounded-3xl p-7 shadow-xl">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4 pb-3 border-b border-zinc-800 flex items-center justify-between">
                <span>OPERATING PRINCIPLES</span>
                <span className="text-zinc-400 font-normal">[VERIFIED]</span>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Accuracy Over Assumption
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-3.5">
                    Every metric is verified against underlying relational sources and transactional logs.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Speed Through Automation
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-3.5">
                    Eliminating repetitive manual exports through structured pipelines, reducing report cycle times by 35%.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Clarity at the Executive Level
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-3.5">
                    Designing executive dashboards that highlight actionable variances rather than cognitive overload.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Capability Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          {corePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-emerald-400 tracking-wider">
                  {pillar.tag}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

