import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  ArrowDownRight,
  TrendingUp,
  Activity,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const { data } = usePortfolio();
  const { profile } = data;

  // Live GMT+1 Clock for Lagos / WAT
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(`${new Intl.DateTimeFormat('en-GB', options).format(now)} WAT [GMT+1]`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-tech-grid"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* Top Technical Metadata Header Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE FOR HIRE
            </span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="text-zinc-400">ABIODUN AYODEJI // PERFORMANCE & PLANNING</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 font-mono">
            <span className="hidden md:inline">LAT 06°27'N · LON 03°23'E [LOS]</span>
            <span className="text-zinc-400 bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800">
              {timeString || '12:00:00 WAT [GMT+1]'}
            </span>
          </div>
        </div>

        {/* Hero Central Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-8">
          
          {/* Left Column: Bold Display Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Professional Title Micro-tag */}
            <div className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 uppercase">
              {profile.professionalTitle}
            </div>

            {/* Oversized Statement Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92]">
              DATA <br />
              <span className="text-zinc-500">THAT DRIVES</span> <br />
              DECISIONS.
            </h1>

            {/* Concise Editorial Narrative */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed pt-2">
              Transforming complex operational workflows and raw transactional data into high-leverage business intelligence. Specializing in <span className="text-white font-medium">SQL</span>, <span className="text-white font-medium">Power BI DAX</span>, <span className="text-white font-medium">Performance Planning</span>, and <span className="text-white font-medium">Variance Analysis</span>.
            </p>

            {/* Interactive Navigation Triggers */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4 w-full sm:w-auto">
              <a
                id="btn-hero-explore-work"
                href="#projects"
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
              >
                <span>Selected Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <button
                id="btn-hero-view-cv"
                onClick={onOpenCvModal}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 font-mono text-xs tracking-wider uppercase px-5 py-3.5 rounded-xl flex items-center gap-2 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Executive CV</span>
              </button>

              <a
                id="btn-hero-ask-ai"
                href="#ask-ai"
                className="bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-emerald-400 border border-zinc-800/80 font-mono text-xs tracking-wider uppercase px-4 py-3.5 rounded-xl flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ask AI</span>
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Framed Portrait & Live KPI Fragments */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Technical Frame Box */}
              <div className="relative bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
                
                {/* Corner Crosshairs */}
                <div className="absolute top-2 left-2 text-zinc-700 font-mono text-[10px] select-none">+</div>
                <div className="absolute top-2 right-2 text-zinc-700 font-mono text-[10px] select-none">+</div>
                <div className="absolute bottom-2 left-2 text-zinc-700 font-mono text-[10px] select-none">+</div>
                <div className="absolute bottom-2 right-2 text-zinc-700 font-mono text-[10px] select-none">+</div>

                {/* Top Card Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ANALYTICS IDENTITY</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ID: AA-0809-BI
                  </div>
                </div>

                {/* Portrait Display */}
                <div className="relative mx-auto mb-5">
                  <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center group">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt={profile.fullName}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 to-zinc-950">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                          <span className="text-3xl font-display font-black text-emerald-400">
                            AA
                          </span>
                        </div>
                        <span className="text-sm font-bold text-white tracking-wider font-mono">
                          {profile.fullName}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono mt-1">
                          Lagos, Nigeria · [GMT+1]
                        </span>
                      </div>
                    )}

                    {/* Grounded Badge Overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#08090c]/90 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1.5 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AUTHENTIC & VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Live Data Fragment 1: Reporting Automation Speed */}
                <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-3.5 mb-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                      Reporting Turnaround
                    </div>
                    <div className="text-xs font-semibold text-zinc-200">
                      Automated Pipeline Consolidation
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-extrabold text-emerald-400">
                      -35%
                    </span>
                    <div className="text-[9px] font-mono text-zinc-400">Cycle Time</div>
                  </div>
                </div>

                {/* Live Data Fragment 2: Commercial Launch Surge */}
                <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                      Showmax 2.0 Campaign
                    </div>
                    <div className="text-xs font-semibold text-zinc-200">
                      Sales Operations & Tracking
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-extrabold text-white">
                      +135%
                    </span>
                    <div className="text-[9px] font-mono text-zinc-400">Relaunch Surge</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Editorial Statistics Ribbon */}
        <div className="pt-8 border-t border-zinc-800/80 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                35%
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">TURNAROUND REDUCTION</div>
              <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Accelerated executive management reporting cycle from days to hours.
              </div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                135%
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">SHOWMAX 2.0 SURGE</div>
              <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Sales channel cohort tracking & real-time retail activation monitoring.
              </div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                420
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">RESEARCH COHORT</div>
              <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Pioneering academic survey on gambling impact in African tertiary institutions.
              </div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                5+ YRS
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">PROGRESSIVE CAREER</div>
              <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                From frontline customer operations to high-impact BI & performance planning.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

