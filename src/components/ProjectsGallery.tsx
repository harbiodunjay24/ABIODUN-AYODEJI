import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import {
  FolderGit2,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  Wrench,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

interface ProjectsGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ onSelectProject }) => {
  const { data } = usePortfolio();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Business Intelligence', 'Data Analytics', 'Research & Social Impact'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>PORTFOLIO & CASE STUDIES</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">03</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              FEATURED WORK
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2">
              Deep-dive case studies detailing business challenges, analytical execution, SQL data models, and measurable commercial results.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0d0f14] border border-zinc-800 p-1.5 rounded-2xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="bg-[#0d0f14] border border-zinc-800 hover:border-zinc-700 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-5">
                {/* Header: Index + Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      CASE 0{idx + 1}
                    </span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      CORE
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Key Impact Metric Badge */}
                {project.keyMetric && (
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-sans">
                      {project.keyMetric.label}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-emerald-400">
                      {project.keyMetric.value}
                    </span>
                  </div>
                )}

                {/* Tools Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tools.slice(0, 4).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800/80 px-2 py-0.5 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 4 && (
                    <span className="text-[10px] font-mono text-zinc-400 py-0.5">
                      +{project.tools.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-6 border-t border-zinc-800/80 mt-6 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

