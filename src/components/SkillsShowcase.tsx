import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Database, BarChart2, Layers, Sparkles } from 'lucide-react';

export const SkillsShowcase: React.FC = () => {
  const { data } = usePortfolio();

  const skillGroups = [
    {
      title: 'Data & Analytics',
      desc: 'Extraction, hygiene, and relational query modeling',
      icon: Database,
      skills: [
        { name: 'SQL', level: 'Advanced' },
        { name: 'Microsoft Excel', level: 'Advanced' },
        { name: 'Data Cleaning & Wrangling', level: 'Advanced' },
        { name: 'Exploratory Data Analysis (EDA)', level: 'Proficient' },
        { name: 'Relational Database Design', level: 'Proficient' },
      ],
    },
    {
      title: 'Business Intelligence',
      desc: 'Interactive visual governance and executive scorecards',
      icon: BarChart2,
      skills: [
        { name: 'Power BI', level: 'Advanced' },
        { name: 'Dashboard Development', level: 'Advanced' },
        { name: 'Google Looker Studio', level: 'Proficient' },
        { name: 'Executive Presentations', level: 'Proficient' },
        { name: 'Cohort & Churn Analytics', level: 'Advanced' },
      ],
    },
    {
      title: 'Performance & Planning',
      desc: 'KPI frameworks, variance tracking, and forecast models',
      icon: Layers,
      skills: [
        { name: 'KPI Reporting Systems', level: 'Advanced' },
        { name: 'Variance Analysis (Budget vs Actual)', level: 'Advanced' },
        { name: 'Forecasting & Trend Analysis', level: 'Proficient' },
        { name: 'Capacity & Resource Planning', level: 'Proficient' },
        { name: 'Operations Governance', level: 'Proficient' },
      ],
    },
    {
      title: 'AI & Automation',
      desc: 'Modern AI tools, prompt engineering, and automated ETL',
      icon: Sparkles,
      skills: [
        { name: 'AI-assisted Data Analysis', level: 'Advanced' },
        { name: 'Workflow Automation', level: 'Proficient' },
        { name: 'Prompt Engineering & LLMs', level: 'Advanced' },
        { name: 'Automated Reporting Pipelines', level: 'Proficient' },
        { name: 'Data Pipeline Integration', level: 'Proficient' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          TOOLKIT & METHODOLOGIES
        </span>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Skills & Capabilities
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Technical tools, analytical methods, and modern AI automation.
          </p>
        </div>

        {/* 4 Clean Group Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 mb-4 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 mb-1">
                    {group.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
                    {group.desc}
                  </p>

                  <div className="space-y-2.5">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs py-1 border-b border-zinc-200/50 last:border-b-0"
                      >
                        <span className="text-zinc-800 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-semibold text-zinc-500 bg-white border border-zinc-200/80 px-2 py-0.5 rounded">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-600">
                  Verified in active production
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
