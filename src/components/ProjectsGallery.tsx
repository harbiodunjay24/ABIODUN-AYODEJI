import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ArrowRight, TrendingUp } from 'lucide-react';

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
    <section id="projects" className="py-20 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          PORTFOLIO & CASE STUDIES
        </span>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
              Selected case studies, BI dashboards, and empirical research frameworks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-zinc-300 transition-all cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Category & Context */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-zinc-500 text-[11px]">
                    {project.category}
                  </span>
                  {project.context && (
                    <span className="text-zinc-500 font-medium">
                      {project.context}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-black leading-snug">
                  {project.title}
                </h3>

                {/* Summary / Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3">
                  {project.shortDescription || project.summary || project.description}
                </p>

                {/* Key Metric Highlight */}
                {(project.impact || project.outcome || project.keyMetric) && (
                  <div className="bg-[#F8F9FA] border border-zinc-200/80 rounded-md p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-zinc-900" />
                      <span>{project.keyMetric?.label || 'Key Outcome'}</span>
                    </div>
                    <p className="text-xs text-zinc-900 font-medium leading-relaxed">
                      {project.impact || project.outcome || (project.keyMetric ? `${project.keyMetric.value} — ${project.keyMetric.label}` : '')}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom: Tools & View Details CTA */}
              <div className="mt-6 pt-4 border-t border-zinc-100">
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {(project.tools || []).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black">
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
