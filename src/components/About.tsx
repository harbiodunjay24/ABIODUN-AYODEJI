import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  CheckCircle2,
  Database,
  BarChart2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const operatingPrinciples = [
    {
      title: 'Accuracy Over Assumption',
      desc: 'Every KPI and recommendation is validated against verified relational data and business operational logs.',
    },
    {
      title: 'Speed to Clarity',
      desc: 'Automating pipelines to eliminate reporting latency so leadership can make timely, informed decisions.',
    },
    {
      title: 'Human-Centered Impact',
      desc: 'Translating quantitative findings into real behavioral change, whether in corporate strategy or social research.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          ABOUT ABIODUN
        </span>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 mb-12">
          A little about me.
        </h2>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Story & Journey */}
          <div className="lg:col-span-7 space-y-5 text-zinc-700 leading-relaxed text-sm sm:text-base">
            <p className="text-zinc-900 font-medium text-base sm:text-lg">
              Over the past 5+ years, my career has spanned customer engagement, operations management, and high-impact commercial analytics at MultiChoice Group.
            </p>
            <p>
              I bridge the gap between raw data tables and strategic business decisions. By pairing rigorous <strong className="text-zinc-900 font-semibold">SQL</strong> data extraction with modern <strong className="text-zinc-900 font-semibold">Power BI</strong> dashboarding and disciplined <strong className="text-zinc-900 font-semibold">Performance & Planning</strong> analysis, I turn fragmented operational numbers into actionable intelligence.
            </p>
            <p>
              I am also vast in contemporary <strong className="text-zinc-900 font-semibold">AI tooling</strong>—leveraging prompt engineering and AI-assisted workflows to accelerate ETL cycles and produce intelligent reporting dashboards.
            </p>
            <p className="text-zinc-600">
              Beyond commercial enterprise systems, I am passionate about social impact. I serve as both an Analyst and a Psychologist for <strong className="text-zinc-900">GamblePause Africa</strong> (currently active in 3 countries and expanding), conducting research and counseling clients, and I lead data and career initiatives as a <strong className="text-zinc-900">NOUN Cowrywise Ambassador</strong>.
            </p>

            <div className="pt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md border border-zinc-200/80">
                SQL & Data Hygiene
              </span>
              <span className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md border border-zinc-200/80">
                Power BI & Reporting
              </span>
              <span className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md border border-zinc-200/80">
                Variance & Capacity Planning
              </span>
              <span className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md border border-zinc-200/80">
                AI Analytics & Workflows
              </span>
            </div>
          </div>

          {/* Right Column: Professional Highlights Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 sm:p-7 shadow-xs">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 pb-3 border-b border-zinc-200">
                Core Operating Principles
              </div>

              <div className="space-y-5">
                {operatingPrinciples.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed pl-3.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
                <span>Location: Lagos, Nigeria</span>
                <span className="text-zinc-900 font-medium">Open to Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
