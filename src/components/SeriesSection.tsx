import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter, Eye } from 'lucide-react';
import { ProjectItem } from '../types';
import { projectsData } from '../data/projectsData';
import { AxialMockup } from './mockups/AxialMockup';
import { CandyCloudMockup } from './mockups/CandyCloudMockup';
import { DevsthanMockup } from './mockups/DevsthanMockup';

interface SeriesSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onExploreWork?: () => void;
}

export const SeriesSection: React.FC<SeriesSectionProps> = ({ onSelectProject, onExploreWork }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterCategories = ['All', 'Branding', 'Logo Design', 'Visual Merch', 'Social Media'];

  const seriesProjects = projectsData.filter((p) =>
    ['personal-branding', 'candy-cloud', 'devsthan-samiti'].includes(p.id)
  );

  const filteredProjects = activeFilter === 'All'
    ? seriesProjects
    : seriesProjects.filter((p) => p.tags.includes(activeFilter));

  const renderProjectMockup = (project: ProjectItem) => {
    switch (project.id) {
      case 'personal-branding':
        return <AxialMockup onExplore={() => onSelectProject(project)} />;
      case 'candy-cloud':
        return <CandyCloudMockup onExplore={() => onSelectProject(project)} />;
      case 'devsthan-samiti':
        return <DevsthanMockup onExplore={() => onSelectProject(project)} />;
      default:
        return <AxialMockup onExplore={() => onSelectProject(project)} />;
    }
  };

  return (
    <section id="projects" className="relative py-14 sm:py-24 lg:py-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header: / My projects + Great work with my project */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs sm:text-lg font-bold text-[#4757fe] tracking-wide">
                / My projects
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Great work with my<br className="hidden sm:inline" /> project
            </h2>
          </div>

          {/* Interactive Category Filter Pills (hidden on mobile view) */}
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white/[0.03] p-1.5 rounded-2xl sm:rounded-full border border-white/10 backdrop-blur max-w-full">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#4757fe] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The 3 Featured Series Projects Showcase Grid */}
        <div className="space-y-8 sm:space-y-16">
          {filteredProjects.map((project) => {
            const isMockupLeft = project.mockupSide === 'left';

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 rounded-xl sm:rounded-2xl overflow-hidden border border-indigo-950/80 bg-[#0d0c18] shadow-2xl transition-all duration-300 hover:border-indigo-500/40 group"
              >
                {/* Visual Mockup Container (Shown First on mobile) */}
                <div
                  className={`w-full h-full min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[500px] ${
                    isMockupLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  {renderProjectMockup(project)}
                </div>

                {/* Deep Indigo Project Content Card */}
                <div
                  className={`relative w-full h-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[500px] bg-gradient-to-br from-[#1c194c] via-[#1a1645] to-[#12102f] p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between overflow-hidden ${
                    isMockupLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  {/* Giant Semi-Transparent Watermark Numeral */}
                  <div className="absolute -bottom-8 sm:-bottom-10 right-2 sm:right-6 select-none pointer-events-none text-indigo-500/[0.08] group-hover:text-indigo-500/[0.12] transition-colors font-black text-[100px] sm:text-[180px] md:text-[240px] leading-none font-sans">
                    {project.number}
                  </div>

                  {/* Top Content: Title and Year */}
                  <div className="relative z-10 space-y-3 sm:space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-snug max-w-md">
                        {project.title}
                      </h3>
                      <span className="text-xs sm:text-base font-bold text-indigo-300/80 font-mono flex-shrink-0 pt-1">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-xs sm:text-base md:text-lg text-gray-300/95 leading-relaxed max-w-lg font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Content: Tag Pills and Action Button */}
                  <div className="relative z-10 pt-6 sm:pt-10 space-y-4 sm:space-y-6">
                    {/* Tag Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#4338ca] text-white shadow-xs border border-indigo-400/30 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* "VIEW PROJECT ->" Pill Button */}
                    <div className="pt-1 sm:pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#3b49df] hover:bg-[#4f5df7] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg shadow-indigo-700/30 transition-all duration-200 active:scale-95 cursor-pointer group-hover:translate-x-1"
                      >
                        <span>VIEW PROJECT</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA: EXPLORE MY WORK Button */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center items-center">
          <button
            onClick={() => {
              if (onExploreWork) {
                onExploreWork();
              } else {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="group relative inline-flex items-center justify-center p-[2.5px] rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/70 bg-gradient-to-b from-blue-300/40 via-blue-500/20 to-indigo-600/45"
            aria-label="Explore My Work"
          >
            {/* Inner Pill Body */}
            <span className="relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#4d5eff] via-[#3848ee] to-[#2535d4] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:from-[#5868ff] group-hover:via-[#4252f5] group-hover:to-[#2e3edd]">
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                EXPLORE MY WORK
              </span>
              <ArrowRight className="w-4 h-4 text-blue-100 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
