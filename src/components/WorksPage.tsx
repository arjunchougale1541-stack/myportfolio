import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string>(WORK_SECTIONS[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Real-time scroll spy for category anchor navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = WORK_SECTIONS.length - 1; i >= 0; i--) {
        const sec = WORK_SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 60) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 135;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  const handleProjectClick = (work: WorkProjectItem) => {
    const matchedProject = projectsData.find((p) => p.id === work.id);
    if (matchedProject) {
      onSelectProject(matchedProject);
    } else {
      const modalProject: ProjectItem = {
        id: work.id,
        number: 'WORKS',
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
        details: {
          overview: work.description,
          role: 'Creative Design, Art Direction & Production',
          timeline: 'Completed ' + work.year,
          tools: ['Adobe Photoshop', 'Adobe Illustrator', 'After Effects', 'Figma'],
          colors: [
            { name: 'Electric Accent', hex: work.accentColor || '#4d5eff' },
            { name: 'Obsidian Black', hex: '#08080a' },
            { name: 'Pure White', hex: '#ffffff' },
          ],
          typography: [
            { name: 'Plus Jakarta Sans Bold', usage: 'Headings & Accents' },
            { name: 'Inter Regular', usage: 'Body Copy' },
          ],
          deliverables: [
            'High-Resolution Master Deliverables',
            'Full Asset Variations & Colorways',
            'Commercial Digital & Print Ready Formats',
          ],
          galleryImages: [work.image],
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
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Identity / Profile */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 sm:gap-3.5 group text-left cursor-pointer"
            aria-label="Back to Home"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-indigo-500/50 shadow-md group-hover:ring-indigo-400 transition-all flex-shrink-0">
              <img
                src={profileImg}
                alt="Arjun Chougale Profile"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-base tracking-tight text-white font-sans uppercase group-hover:text-indigo-300 transition-colors">
                ARJUN CHOUGALE
              </span>
              <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                GRAPHIC DESIGNER &amp; VIDEO EDITOR
              </span>
            </div>
          </button>

          {/* Right: Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.06] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(77,94,255,0.35)] cursor-pointer active:scale-95"
            aria-label="Return to Homepage"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>BACK TO HOME</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto pt-10 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-8">
          {/* Mini Pill Tag: CURATED PORTFOLIO */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-5 shadow-[0_0_15px_rgba(77,94,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>CURATED PORTFOLIO</span>
          </div>

          {/* Main Title: MY WORKS */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm font-sans mb-4 sm:mb-5">
            MY WORKS
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            A collection of selected creative work, branding, and visual experiences.
          </p>
        </div>

        {/* Sticky Anchor Navigation Bar: Full-bleed edge-to-edge outer container */}
        <div className="sticky top-16 sm:top-20 z-30 w-full left-0 right-0 bg-[#070709]/85 backdrop-blur-md border-y border-white/5 shadow-md shadow-black/30">
          {/* Inner centered row of category pills with consistent 12px 32px padding */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 py-0.5">
              {WORK_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const count = worksByCategory[sec.id]?.length || 0;

                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollToSection(sec.id)}
                    className={`relative px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#4d5eff] via-[#3d4ff5] to-[#2b3ee3] text-white shadow-[0_0_20px_rgba(77,94,255,0.45)] border border-indigo-300/40 scale-105'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5 hover:border-indigo-500/30'
                    }`}
                    aria-label={`Jump to ${sec.name} section`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{sec.name}</span>
                      <span
                        className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7 Vertically Stacked Category Sections in Exact Order */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-32 py-12 sm:py-16">
          {WORK_SECTIONS.map((sec, sectionIdx) => {
            const items = worksByCategory[sec.id] || [];

            return (
              <section
                key={sec.id}
                id={sec.id}
                className="relative w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-32 overflow-x-clip"
                aria-label={`${sec.name} Showcase`}
              >
                {/* Section Header: Category Name + Item Count + Subtitle */}
                <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    {/* Number and Tag */}
                    <div className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-2 flex items-center gap-2">
                      <span>/ 0{sectionIdx + 1}</span>
                      <span>•</span>
                      <span>CATEGORY</span>
                    </div>

                    {/* Category Heading with Item Count Badge */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 font-sans">
                        {sec.name}
                      </h2>

                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                        {items.length} Projects
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal max-w-xl">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                {/* Coverflow Carousel for this Category with negative margin offset for full-width track */}
                <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 px-2 sm:px-4 lg:px-6 overflow-visible">
                  <WorksCoverflowCarousel
                    items={items}
                    onSelectProject={handleProjectClick}
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
                Ready to elevate your brand identity, packaging, or digital content? Let's discuss your next breakthrough project.
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
