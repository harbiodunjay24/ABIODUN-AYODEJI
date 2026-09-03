import React from 'react';
import { ProjectItem } from '../types';
import {
  X,
  ExternalLink,
  AlertCircle,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-200 bg-white">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            id="btn-close-project-modal"
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Key Metric Spotlight */}
          {project.keyMetric && (
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  PRIMARY OUTCOME
                </span>
                <div className="text-sm font-semibold text-zinc-800 mt-0.5">
                  {project.keyMetric.label}
                </div>
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {project.keyMetric.value}
              </div>
            </div>
          )}

          {/* Tools & Tech Stack */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              TOOLS & TECHNOLOGIES
            </span>
            <div className="flex flex-wrap gap-2">
              {(project.tools || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="bg-[#FAFAFA] border border-zinc-200 text-zinc-700 text-xs px-2.5 py-1 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 1. The Challenge */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
              <span>THE CHALLENGE</span>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200">
              {project.challenge || project.businessProblem || project.description || project.shortDescription}
            </p>
          </div>

          {/* 2. Analytical Approach */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Lightbulb className="w-3.5 h-3.5 text-zinc-500" />
              <span>THE APPROACH & METHODOLOGY</span>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200">
              {project.solution || project.approach || 'Applied structured data cleaning, exploratory data analysis (EDA), and executive visual reporting frameworks.'}
            </p>
          </div>

          {/* 3. Business Impact */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
              <span>BUSINESS IMPACT & RESULTS</span>
            </div>
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200">
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.impact || project.outcome || 'Delivered quantifiable reporting turnaround reductions, actionable commercial insights, and reliable metric governance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:px-8 border-t border-zinc-200 bg-white flex items-center justify-between">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-zinc-500">Documented Analytics Project</span>
          )}

          <button
            onClick={onClose}
            className="text-xs font-medium text-zinc-700 hover:text-black px-4 py-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
