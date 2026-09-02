import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillProficiency } from '../types';
import {
  Sparkles,
  Database,
  BarChart3,
  LineChart,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const SkillsShowcase: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { name: 'All' },
    { name: 'Data Analysis' },
    { name: 'Business Intelligence' },
    { name: 'Business Performance' },
    { name: 'AI & Automation' },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getProficiencyBadge = (level: SkillProficiency) => {
    switch (level) {
      case 'Advanced':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            ADVANCED
          </span>
        );
      case 'Proficient':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
            PROFICIENT
          </span>
        );
      case 'Working Knowledge':
      default:
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
            WORKING
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>CAPABILITIES & METHODOLOGIES</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">04</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              TECHNICAL TOOLKIT
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Organized by concrete competency levels and operational application — verified against real enterprise workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#0d0f14] border border-zinc-800 p-1.5 rounded-2xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat.name
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-[#0d0f14] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex items-center justify-between transition-all group"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  {skill.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {skill.name}
                </h3>
              </div>
              <div>{getProficiencyBadge(skill.proficiency)}</div>
            </div>
          ))}
        </div>

        {/* 4 Architectural Core Competency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-[#0d0f14] border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
              PILLAR 01
            </div>
            <h3 className="text-base font-bold text-white">Relational SQL Analytics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Complex joins, windowing, subqueries, and CTEs to structure messy transactional data into clean analytical datasets.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
              DataCamp Certified Associate
            </div>
          </div>

          <div className="bg-[#0d0f14] border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-widest">
              PILLAR 02
            </div>
            <h3 className="text-base font-bold text-white">Power BI & Modeling</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Dimensional star-schemas, dynamic DAX calculations, and interactive executive dashboards for retention and sales.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
              Star-Schema Architecture
            </div>
          </div>

          <div className="bg-[#0d0f14] border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              PILLAR 03
            </div>
            <h3 className="text-base font-bold text-white">Performance Governance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Variance analysis, forecasting models, capacity planning, and standardized scorecard frameworks.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
              -35% Executive Reporting Lag
            </div>
          </div>

          <div className="bg-[#0d0f14] border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
              PILLAR 04
            </div>
            <h3 className="text-base font-bold text-white">Applied AI & Automation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Leveraging Gemini models, prompt pipelines, and workflow automation to accelerate research and reporting cycles.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
              ALX AI Career Essentials
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

