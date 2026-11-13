import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import profileImg from '../assets/images/arjun_profile.jpg';
import { WORK_SECTIONS, worksByCategory, WorkProjectItem } from '../data/worksData';
import { projectsData } from '../data/projectsData';
import { ProjectItem } from '../types';
import { WorksCoverflowCarousel } from './WorksCoverflowCarousel';

interface WorksPageProps {
  onBackToHome: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onCollaborate: () => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  onBackToHome,
  onSelectProject,
  onCollaborate,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProjectClick = (work: WorkProjectItem) => {
    const matchedProject = projectsData.find((p) => p.id === work.id);
    if (matchedProject) {
      onSelectProject(matchedProject);
    } else {
      const presentationImages = (work.projectImages && work.projectImages.length > 0)
        ? work.projectImages
        : (work.images && work.images.length > 0 ? work.images : [work.image]);

      const modalProject: ProjectItem = {
        id: work.id,
        number: work.category === 'Reels' ? 'REEL' : 'WORKS',
        title: work.title,
        subtitle: work.client || work.category,
        year: work.year,
        client: work.client || 'Client Showcase',
        description: work.description,
        tags: work.categories,
        mockupSide: 'left',
        badge: work.badge || work.category,
        category: work.category,
        accentColor: work.accentColor || '#4d5eff',
        bgTone: '#13112c',
        coverImage: work.coverImage || work.image,
        projectImages: presentationImages,
        images: presentationImages,
        videoUrl: work.videoUrl,
        reelData: work.reelData,
        details: {
          galleryImages: presentationImages,
          overview: work.reelData?.overview.description || work.description,
          objective: work.reelData?.overview.objective,
          creativeDirection: work.reelData?.creativeDirection,
          editingProcess: work.reelData?.editingProcess.description,
          tools: work.reelData?.toolsUsed,
          role: work.reelData?.details.role,
        },
      };
      onSelectProject(modalProject);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070709] text-white flex flex-col selection:bg-[#4757fe] selection:text-white relative">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[650px] h-[650px] bg-indigo-600/8 rounded-full blur-[170px] pointer-events-none -z-10" />

      {/* Top Sticky Header with Profile and Back to Home Button */}
      <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="w-full px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Brand Identity / Profile */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 xs:gap-2.5 sm:gap-3.5 group text-left cursor-pointer min-w-0"
            aria-label="Back to Home"
          >
            <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-indigo-500/50 shadow-md group-hover:ring-indigo-400 transition-all flex-shrink-0">
              <img
                src={profileImg}
                alt="Arjun Chougale Profile"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-[11px] xs:text-xs sm:text-base tracking-tight text-white font-sans uppercase group-hover:text-indigo-300 transition-colors whitespace-nowrap">
                ARJUN CHOUGALE
              </span>
              <span className="text-[8px] xs:text-[9.5px] sm:text-[11px] font-semibold tracking-wider text-gray-400 uppercase truncate max-w-[130px] xs:max-w-[170px] sm:max-w-none">
                GRAPHIC DESIGNER &amp; VIDEO EDITOR
              </span>
            </div>
          </button>

          {/* Right: Sleek, Compact Back to Home Button on Mobile */}
          <button
            onClick={onBackToHome}
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(77,94,255,0.35)] cursor-pointer active:scale-95 whitespace-nowrap flex-shrink-0"
            aria-label="Return to Homepage"
          >
            <ArrowLeft className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
            <span className="whitespace-nowrap">BACK TO HOME</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {/* Vertically Stacked Category Sections in Exact Order */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-24 pt-6 sm:pt-10 pb-12 sm:pb-16">
          {WORK_SECTIONS.map((sec, sectionIdx) => {
            const items = worksByCategory[sec.id] || [];

            return (
              <section
                key={sec.id}
                id={sec.id}
                className="relative z-10 isolate w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-28 sm:scroll-mt-32 overflow-x-clip pt-1 sm:pt-2"
                aria-label={`${sec.name} Showcase`}
              >
                {/* Section Header: Category Name + Item Count + Subtitle */}
                <div className="mb-3 sm:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4 border-b border-white/5 pb-3 sm:pb-4">
                  <div>
                    {/* Number and Tag */}
                    <div className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-1 sm:mb-1.5 flex items-center gap-2">
                      <span>/ 0{sectionIdx + 1}</span>
                      <span>•</span>
                      <span>CATEGORY</span>
                    </div>

                    {/* Category Heading with Item Count Badge */}
                    <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 font-sans">
                        {sec.name}
                      </h2>

                      <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                        {items.length} Projects
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                {/* Coverflow Carousel for this Category with negative margin offset for full-width track */}
                <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 px-2 sm:px-4 lg:px-6 pt-0 pb-1 overflow-visible">
                  <WorksCoverflowCarousel
                    items={items}
                    onSelectProject={handleProjectClick}
                    isReel={sec.id === 'reels'}
                  />
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom Collaboration CTA Banner */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-[#100f24]/70 to-indigo-950/50 border border-indigo-900/40 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                HAVE A PROJECT IN MIND?
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                LET’S CREATE SOMETHING EXTRAORDINARY
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Ready to elevate your brand identity, logo design, or digital content? Let's discuss your next breakthrough project.
              </p>
              <div className="pt-3 flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={onCollaborate}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#4d5eff] to-[#3848ee] hover:from-[#5b6bff] hover:to-[#4353f8] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(77,94,255,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  START A PROJECT
                </button>
                <button
                  onClick={onBackToHome}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  RETURN HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#08080a] py-8 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider">ARJUN CHOUGALE</span>
            <span>•</span>
            <span>PORTFOLIO &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <button onClick={onBackToHome} className="hover:text-indigo-400 transition-colors cursor-pointer">Home</button>
            <a href="mailto:arjunchougale1541@gmail.com" className="hover:text-indigo-400 transition-colors">Email</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
