import React from 'react';
import { ProjectItem } from '../types';
import {
  X,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Lightbulb,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0d0f14] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-zinc-900 bg-[#0a0c10]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400 uppercase tracking-widest font-bold">
                {project.category}
              </span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400">ARCHIVE RECORD</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            id="btn-close-project-modal"
            onClick={onClose}
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Key Metric Spotlight */}
          {project.keyMetric && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  PRIMARY VERIFIED BENCHMARK
                </span>
                <div className="text-sm font-semibold text-zinc-200">
                  {project.keyMetric.label}
                </div>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                  {project.keyMetric.value}
                </span>
              </div>
            </div>
          )}

          {/* Tools & Tech Stack */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              ANALYTICAL STACK & INFRASTRUCTURE
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 1. The Challenge */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
              01 // THE BUSINESS PROBLEM & CONTEXT
            </span>
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 text-sm text-zinc-300 leading-relaxed font-sans">
              {project.businessProblem}
            </div>
          </div>

          {/* 2. The Analytical Approach */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              02 // DATA ARCHITECTURE & METHODOLOGY
            </span>
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 text-sm text-zinc-300 leading-relaxed font-sans">
              {project.approach}
            </div>
          </div>

          {/* 3. Discovered Insights */}
          {project.insights && project.insights.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                03 // EMPIRICAL FINDINGS & DISCOVERIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {project.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-start gap-3"
                  >
                    <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Outcome & Business Value */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              04 // COMMERCIAL IMPACT & REALIZED EFFICIENCY
            </span>
            <div className="p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/20 text-sm text-emerald-200 leading-relaxed font-sans">
              {project.outcome}
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-5 sm:p-6 border-t border-zinc-900 bg-[#0a0c10] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-400">
            RECORD VERIFIED // PORTFOLIO DATA PIPELINE
          </div>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors"
              >
                <span>OPEN DASHBOARD</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-mono transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

