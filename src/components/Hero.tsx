import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  ArrowRight,
  MapPin,
  BarChart2,
  Database,
  Calendar,
  Layers,
  Camera,
} from 'lucide-react';
import { PhotoModal, formatDirectImageUrl } from './PhotoModal';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const { data } = usePortfolio();
  const { profile } = data;
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const formattedPhotoUrl = formatDirectImageUrl(profile.profilePhoto || '');
  const hasValidPhoto = Boolean(formattedPhotoUrl && !imgFailed);

  useEffect(() => {
    setImgFailed(false);
  }, [formattedPhotoUrl]);

  const snapshotPillars = [
    {
      title: '5+ Years',
      subtitle: 'Professional Experience',
      desc: 'Multidisciplinary operations & analytics',
      icon: Calendar,
    },
    {
      title: 'Power BI',
      subtitle: 'Business Intelligence',
      desc: 'Interactive executive reporting dashboards',
      icon: BarChart2,
    },
    {
      title: 'SQL',
      subtitle: 'Data Analysis',
      desc: 'Extraction, transformation & data hygiene',
      icon: Database,
    },
    {
      title: 'Performance & Planning',
      subtitle: 'Reporting Frameworks',
      desc: 'Variance modeling & KPI governance',
      icon: Layers,
    },
  ];

  return (
    <>
      <section id="home" className="pt-8 sm:pt-14 pb-16 bg-[#FAFAFA] border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Main 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 bg-zinc-100 border border-zinc-200/80 px-3 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span>DATA ANALYST · PERFORMANCE & PLANNING</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.08]">
                Turning data into clearer business decisions.
              </h1>

              {/* Introduction Paragraph */}
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                Hi, I'm Abiodun Ayodeji. I help organizations make sense of complex data — building reporting systems, dashboards, and analytical frameworks that give leaders the clarity they need to act with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <a
                  id="btn-hero-explore-work"
                  href="#projects"
                  className="bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2 transition-colors shadow-xs active:scale-98"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  id="btn-hero-view-cv"
                  onClick={onOpenCvModal}
                  className="bg-white hover:bg-zinc-50 text-zinc-800 hover:text-black border border-zinc-300 text-xs sm:text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2 transition-colors active:scale-98"
                >
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <span>View My CV</span>
                </button>
              </div>

              {/* Understated Location & Availability */}
              <div className="pt-3 flex items-center gap-2 text-xs text-zinc-500 font-normal">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Based in Lagos, Nigeria · Open to full-time roles & analytics projects</span>
              </div>
            </div>

            {/* Right Column: Clean Portrait Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Photo Container */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/90 shadow-sm flex flex-col items-center justify-center group">
                  {hasValidPhoto ? (
                    <>
                      <img
                        src={formattedPhotoUrl}
                        alt="Abiodun Ayodeji - Data Analyst"
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('googleusercontent.com')) {
                            target.src = 'https://lh3.googleusercontent.com/d/1LNHQaePi0LPjkbSXdoq7INdo0W7bMT5D';
                          } else {
                            setImgFailed(true);
                          }
                        }}
                      />
                      {/* Direct update button on hover */}
                      <button
                        type="button"
                        onClick={() => setIsPhotoModalOpen(true)}
                        className="absolute top-3 right-3 bg-zinc-900/80 hover:bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md backdrop-blur-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title="Change Photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Update</span>
                      </button>
                    </>
                  ) : (
                    /* Executive Monogram Presentation when photo is not yet provided */
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-zinc-50 to-zinc-100">
                      {/* Monogram Badge */}
                      <div className="w-24 h-24 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-4 text-zinc-900">
                        <span className="text-3xl font-bold tracking-tight text-zinc-800 font-serif">AA</span>
                      </div>
                      
                      <div className="text-base font-semibold text-zinc-900">Abiodun Ayodeji</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Data Analyst · Performance & Planning</div>
                      
                      <button
                        type="button"
                        onClick={() => setIsPhotoModalOpen(true)}
                        className="mt-6 px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-medium rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Set Profile Picture Link</span>
                      </button>
                      <p className="text-[11px] text-zinc-400 mt-2 max-w-xs leading-normal">
                        Paste your direct image link or upload directly
                      </p>
                    </div>
                  )}

                  {/* Understated Floating Tag */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs border border-zinc-200/90 rounded-md py-2 px-3.5 flex items-center justify-between text-xs text-zinc-700 shadow-xs pointer-events-none">
                    <div className="flex items-center gap-1.5 font-medium text-zinc-900">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Abiodun Ayodeji</span>
                    </div>
                    <span className="text-zinc-500">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Professional Snapshot Strip */}
          <div className="mt-16 pt-10 border-t border-zinc-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {snapshotPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {pillar.subtitle}
                      </span>
                      <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-zinc-900 mb-1">
                        {pillar.title}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Photo Setup Modal */}
      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => {
          setIsPhotoModalOpen(false);
          setImgFailed(false);
        }}
      />
    </>
  );
};
