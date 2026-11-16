import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Film, Sparkles, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '../types';
import { projectsData } from '../data/projectsData';
import { worksByCategory, WorkProjectItem } from '../data/worksData';

gsap.registerPlugin(ScrollTrigger);

interface SeriesSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onExploreWork?: () => void;
}

export const SeriesSection: React.FC<SeriesSectionProps> = ({ onSelectProject, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section refs for scroll triggers
  const headerRef = useRef<HTMLDivElement>(null);
  const headingBadgeRef = useRef<HTMLSpanElement>(null);
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const logoCardsRef = useRef<HTMLDivElement[]>([]);

  const socialSectionRef = useRef<HTMLDivElement>(null);
  const socialTextRef = useRef<HTMLDivElement>(null);
  const socialCardsRef = useRef<HTMLDivElement[]>([]);

  const reelSectionRef = useRef<HTMLDivElement>(null);
  const reelTextRef = useRef<HTMLDivElement>(null);
  const reelCardsRef = useRef<HTMLDivElement[]>([]);

  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  // Helper to open project case study modal
  const handleSelectWork = (work: WorkProjectItem) => {
    const matchedProject = projectsData.find((p) => p.id === work.id);
    if (matchedProject) {
      onSelectProject(matchedProject);
    } else {
      const presentationImages =
        work.projectImages && work.projectImages.length > 0
          ? work.projectImages
          : work.images && work.images.length > 0
          ? work.images
          : [work.image];

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
          editingProcess: work.reelData?.editingProcess?.description,
          tools: work.reelData?.toolsUsed,
          role: work.reelData?.details.role,
        },
      };
      onSelectProject(modalProject);
    }
  };

  // Projects data sets (4 curated items per section for optimal layered composition)
  const allLogoProjects = worksByCategory['logo-designs'] || [];
  const logoItems = [
    allLogoProjects.find((p) => p.id === 'get-it-delivery-logo') || allLogoProjects[0],
    allLogoProjects.find((p) => p.id === 'dimora-luxury-fragrance-logo') || allLogoProjects[1],
    allLogoProjects.find((p) => p.id === 'marbex-furniture-interiors-logo') || allLogoProjects[2],
    allLogoProjects.find((p) => p.id === 'candy-cloud-mascot-mark') || allLogoProjects[3],
  ].filter(Boolean) as WorkProjectItem[];

  const allSocialProjects = worksByCategory['social-media-posts'] || [];
  const socialItems = [
    allSocialProjects.find((p) => p.id === 'dimora-social-campaign') || allSocialProjects[0],
    allSocialProjects.find((p) => p.id === 'konnect-compiler-social-campaign') || allSocialProjects[1],
    allSocialProjects.find((p) => p.id === 'soul-fashion-social-campaign') || allSocialProjects[2],
    allSocialProjects.find((p) => p.id === 'hyperlex-social-campaign') || allSocialProjects[3],
  ].filter(Boolean) as WorkProjectItem[];

  const allReelProjects = worksByCategory['reels'] || [];
  const reelItems = [
    allReelProjects.find((p) => p.id === 'fourtwnty-streetwear-lookbook-reel') || allReelProjects[0],
    allReelProjects.find((p) => p.id === 'doshi-wealth-iepf-cheque-reel') || allReelProjects[1],
    allReelProjects.find((p) => p.id === 'avyukta-realty-investment-reel') || allReelProjects[2],
    allReelProjects.find((p) => p.id === 'makato-popped-chips-campaign-reel') || allReelProjects[3],
  ].filter(Boolean) as WorkProjectItem[];

  // ScrollTrigger Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const width = window.innerWidth;
      const isMobile = width < 768;

      // ========================================================
      // 1. SECTION HEADER SCROLL-LINKED ANIMATION
      // - "My Projects" badge: Left to Right (translateX -120px -> 0, opacity 0 -> 1)
      // - "Great work with my project": Bottom to Top masked word-by-word (translateY 35px -> 0, opacity 0 -> 1)
      // ========================================================
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (headingBadgeRef.current) {
          headerTl.fromTo(
            headingBadgeRef.current,
            { x: isMobile ? -50 : -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            0
          );
        }

        const validWords = titleWordsRef.current.filter(Boolean);
        if (validWords.length > 0) {
          headerTl.fromTo(
            validWords,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power2.out',
            },
            0.15
          );
        }
      }

      // ========================================================
      // 2. LOGO CONTENT SECTION (Row 1)
      // - Left column text: Right to Left (translateX 100px -> 0, opacity 0 -> 1)
      // - Right column square cards: Right to Left (translateX 140px -> 0, opacity 0 -> 1, staggered)
      // ========================================================
      if (logoSectionRef.current) {
        const logoTl = gsap.timeline({
          scrollTrigger: {
            trigger: logoSectionRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (logoTextRef.current) {
          logoTl.fromTo(
            logoTextRef.current,
            { x: isMobile ? 40 : 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
            0
          );
        }

        const validLogoCards = logoCardsRef.current.filter(Boolean);
        if (validLogoCards.length > 0) {
          logoTl.fromTo(
            validLogoCards,
            { x: isMobile ? 50 : 140, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: 'power2.out',
            },
            0.1
          );
        }
      }

      // ========================================================
      // 3. SOCIAL MEDIA CONTENT SECTION (Row 2 - Reverse Layout)
      // - Left column cards: Left to Right (translateX -140px -> 0, opacity 0 -> 1, staggered)
      // - Right column text: Left to Right (translateX -100px -> 0, opacity 0 -> 1)
      // ========================================================
      if (socialSectionRef.current) {
        const socialTl = gsap.timeline({
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (socialTextRef.current) {
          socialTl.fromTo(
            socialTextRef.current,
            { x: isMobile ? -40 : -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
            0
          );
        }

        const validSocialCards = socialCardsRef.current.filter(Boolean);
        if (validSocialCards.length > 0) {
          socialTl.fromTo(
            validSocialCards,
            { x: isMobile ? -50 : -140, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: 'power2.out',
            },
            0.1
          );
        }
      }

      // ========================================================
      // 4. REEL CONTENT SECTION (Row 3)
      // - Left column text: Right to Left (translateX 100px -> 0, opacity 0 -> 1)
      // - Right column 9:16 cards: Right to Left (translateX 150px -> 0, opacity 0 -> 1, staggered)
      // ========================================================
      if (reelSectionRef.current) {
        const reelTl = gsap.timeline({
          scrollTrigger: {
            trigger: reelSectionRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (reelTextRef.current) {
          reelTl.fromTo(
            reelTextRef.current,
            { x: isMobile ? 40 : 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
            0
          );
        }

        const validReelCards = reelCardsRef.current.filter(Boolean);
        if (validReelCards.length > 0) {
          reelTl.fromTo(
            validReelCards,
            { x: isMobile ? 50 : 150, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: 'power2.out',
            },
            0.1
          );
        }
      }

      // ========================================================
      // 5. EXPLORE MY WORK FINAL CTA
      // - Bottom to Top (translateY 80px -> 0, opacity 0 -> 1)
      // ========================================================
      if (ctaSectionRef.current && ctaButtonRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        ctaTl.fromTo(
          ctaButtonRef.current,
          { y: isMobile ? 40 : 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingWords = ['Great', 'work', 'with', 'my', 'project'];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-16 sm:py-20 lg:py-28 overflow-x-clip bg-[#070709] text-white selection:bg-[#4757fe] selection:text-white"
      aria-label="My Projects Showcase"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 w-[550px] h-[550px] bg-purple-600/8 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/6 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: / My projects + Word-by-word Reveal     */}
        {/* ======================================================== */}
        <div ref={headerRef} className="mb-12 sm:mb-16 lg:mb-24">
          {/* Main Heading: / My projects (animates Left to Right) */}
          <div className="overflow-hidden mb-2.5 sm:mb-3">
            <span
              ref={headingBadgeRef}
              className="inline-block text-xs sm:text-base font-bold text-[#4757fe] tracking-widest uppercase font-mono will-change-transform"
            >
              / My projects
            </span>
          </div>

          {/* Masked Word-by-Word Reveal: Great work with my project (Bottom to Top) */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06] flex flex-wrap gap-x-[0.25em] gap-y-1">
            {headingWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-1">
                <span
                  ref={(el) => {
                    if (el) titleWordsRef.current[idx] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* ======================================================== */}
        {/* ROW 1: LOGO CONTENT & CARDS SECTION                      */}
        {/* Left Column: Text (Right -> Left)                        */}
        {/* Right Column: Layered Square Cards (Right -> Left)       */}
        {/* ======================================================== */}
        <div
          ref={logoSectionRef}
          className="mb-16 sm:mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center"
        >
          {/* Left Column: Logo Content Text */}
          <div
            ref={logoTextRef}
            className="lg:col-span-5 space-y-4 sm:space-y-5 max-w-lg will-change-transform"
          >
            <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>/ 01 • LOGO CONTENT</span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
              Logo Content
            </h3>

            <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed font-normal">
              Distinctive vector logomarks, monogram explorations, and complete visual identity systems. Crafted with disciplined geometric precision to establish immediate brand recall, market authority, and lasting recognition.
            </p>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {['Vector Logomarks', 'Brand Guidelines', 'Monograms', 'Visual Identity'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-white/[0.04] border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => onExploreWork?.()}
                className="group/btn inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.05] hover:bg-indigo-600/20 border border-white/12 hover:border-indigo-400 text-xs sm:text-sm font-bold tracking-wider uppercase text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>EXPLORE ALL LOGOS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-indigo-300" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Square Cards (1:1 Ratio, Layered Composition) */}
          <div className="lg:col-span-7 overflow-x-auto lg:overflow-visible no-scrollbar py-3 px-1 -mx-1">
            <div className="flex items-center justify-start lg:justify-end min-w-max lg:min-w-0 pr-6 lg:pr-0">
              {logoItems.map((project, idx) => {
                const zIndexStyle = 40 - idx * 10;
                const marginOverlap = idx === 0 ? '' : '-ml-12 sm:-ml-16 md:-ml-18 lg:-ml-16 xl:-ml-20';

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      if (el) logoCardsRef.current[idx] = el;
                    }}
                    onClick={() => handleSelectWork(project)}
                    style={{ zIndex: zIndexStyle }}
                    className={`relative ${marginOverlap} w-[210px] xs:w-[230px] sm:w-[260px] md:w-[280px] lg:w-[265px] xl:w-[295px] 2xl:w-[315px] aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-[#0d0c18] border border-white/15 shadow-2xl transition-all duration-300 group cursor-pointer hover:z-50 hover:scale-105 hover:-translate-y-2 hover:border-indigo-400 hover:shadow-[0_20px_45px_rgba(71,87,254,0.45)] select-none will-change-transform`}
                  >
                    {/* Full-bleed 1:1 Cover Image */}
                    <img
                      src={project.coverImage || project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:opacity-60 transition-opacity duration-300" />

                    {/* Top Header Badge & Quick Action */}
                    <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/10 text-indigo-300 shadow-sm">
                        {project.badge || 'LOGO'}
                      </span>

                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-[#4757fe] border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-0 inset-x-0 z-10 p-3 sm:p-3.5 space-y-0.5">
                      <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-indigo-300 uppercase tracking-wider truncate">
                        {project.client || 'Logo Design'}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate group-hover:text-indigo-200 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ROW 2: SOCIAL MEDIA CONTENT SECTION (Reverse Layout)     */}
        {/* Left Column: Layered 4:5 Cards (Left -> Right)           */}
        {/* Right Column: Text (Left -> Right)                       */}
        {/* ======================================================== */}
        <div
          ref={socialSectionRef}
          className="mb-16 sm:mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center"
        >
          {/* Left Column: 4 Social Media Cards (4:5 Ratio, Layered Composition, Left -> Right) */}
          <div className="order-2 lg:order-1 lg:col-span-7 overflow-x-auto lg:overflow-visible no-scrollbar py-3 px-1 -mx-1">
            <div className="flex items-center justify-start min-w-max lg:min-w-0 pr-6 lg:pr-0">
              {socialItems.map((project, idx) => {
                const zIndexStyle = 10 + idx * 10;
                const marginOverlap = idx === 0 ? '' : '-ml-10 sm:-ml-14 md:-ml-16 lg:-ml-14 xl:-ml-16';

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      if (el) socialCardsRef.current[idx] = el;
                    }}
                    onClick={() => handleSelectWork(project)}
                    style={{ zIndex: zIndexStyle }}
                    className={`relative ${marginOverlap} w-[180px] xs:w-[200px] sm:w-[225px] md:w-[245px] lg:w-[235px] xl:w-[260px] 2xl:w-[280px] aspect-[4/5] flex-shrink-0 rounded-2xl overflow-hidden bg-[#0d0c18] border border-white/15 shadow-2xl transition-all duration-300 group cursor-pointer hover:z-50 hover:scale-105 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_20px_45px_rgba(6,182,212,0.45)] select-none will-change-transform`}
                  >
                    {/* Full-bleed 4:5 Post Cover Image */}
                    <img
                      src={project.coverImage || project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:opacity-60 transition-opacity duration-300" />

                    {/* Top Badge & Action */}
                    <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/10 text-cyan-300 shadow-sm">
                        {project.badge || 'CAROUSEL'}
                      </span>

                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-[#4757fe] border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-0 inset-x-0 z-10 p-3 sm:p-3.5 space-y-0.5">
                      <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-300 uppercase tracking-wider truncate">
                        {project.client || 'Social Media'}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Social Media Content Text (Left -> Right) */}
          <div
            ref={socialTextRef}
            className="order-1 lg:order-2 lg:col-span-5 space-y-4 sm:space-y-5 max-w-lg will-change-transform"
          >
            <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>/ 02 • SOCIAL MEDIA CONTENT</span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
              Social Media Content
            </h3>

            <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed font-normal">
              High-impact multi-slide carousels, promotional campaign creatives, and digital marketing suites. Engineered with strong visual hierarchy and thumb-stopping power to drive measurable audience engagement and retention.
            </p>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {['Multi-Slide Carousels', 'Campaign Creatives', 'Visual Hierarchy', 'Brand Narratives'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-white/[0.04] border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => onExploreWork?.()}
                className="group/btn inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.05] hover:bg-cyan-600/20 border border-white/12 hover:border-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>EXPLORE ALL SOCIAL POSTS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-cyan-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ROW 3: REEL CONTENT & CARDS SECTION                      */}
        {/* Left Column: Text (Right -> Left)                        */}
        {/* Right Column: Layered 9:16 Reel Cards (Right -> Left)    */}
        {/* ======================================================== */}
        <div
          ref={reelSectionRef}
          className="mb-16 sm:mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center"
        >
          {/* Left Column: Reel Content Text */}
          <div
            ref={reelTextRef}
            className="lg:col-span-5 space-y-4 sm:space-y-5 max-w-lg will-change-transform"
          >
            <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-pink-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span>/ 03 • REEL CONTENT</span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
              Reel Content
            </h3>

            <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed font-normal">
              Dynamic commercial video edits, kinetic short-form narratives, and beat-synced motion graphics. Cut with razor-sharp timing, cinematic color grading, and viral pacing for modern vertical video platforms.
            </p>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {['9:16 Vertical Video', 'Beat-Synced Cuts', 'Color Grading', 'Motion Graphics'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-white/[0.04] border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => onExploreWork?.()}
                className="group/btn inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.05] hover:bg-pink-600/20 border border-white/12 hover:border-pink-400 text-xs sm:text-sm font-bold tracking-wider uppercase text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>EXPLORE ALL COMMERCIAL REELS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-pink-300" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Reel Cards (9:16 Vertical Ratio, Layered Composition) */}
          <div className="lg:col-span-7 overflow-x-auto lg:overflow-visible no-scrollbar py-3 px-1 -mx-1">
            <div className="flex items-center justify-start lg:justify-end min-w-max lg:min-w-0 pr-6 lg:pr-0">
              {reelItems.map((project, idx) => {
                const zIndexStyle = 40 - idx * 10;
                const marginOverlap = idx === 0 ? '' : '-ml-8 sm:-ml-12 md:-ml-14 lg:-ml-12 xl:-ml-15';

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      if (el) reelCardsRef.current[idx] = el;
                    }}
                    onClick={() => handleSelectWork(project)}
                    style={{ zIndex: zIndexStyle }}
                    className={`relative ${marginOverlap} w-[155px] xs:w-[170px] sm:w-[195px] md:w-[215px] lg:w-[205px] xl:w-[230px] 2xl:w-[245px] aspect-[9/16] flex-shrink-0 rounded-2xl overflow-hidden bg-[#0d0c18] border border-white/15 shadow-2xl transition-all duration-300 group cursor-pointer hover:z-50 hover:scale-105 hover:-translate-y-2 hover:border-pink-500 hover:shadow-[0_20px_45px_rgba(236,72,153,0.45)] select-none will-change-transform flex flex-col justify-between`}
                  >
                    {/* Full-bleed 9:16 Reel Cover Image */}
                    <img
                      src={project.coverImage || project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for text & play icon */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

                    {/* Top Header Badge & 9:16 Aspect Pill */}
                    <div className="relative z-10 p-2.5 sm:p-3 flex items-center justify-between gap-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-pink-500/30 text-pink-300 shadow-sm">
                        <Film className="w-2.5 h-2.5 text-pink-400" />
                        <span>REEL</span>
                      </span>

                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold bg-black/60 border border-white/15 text-gray-300">
                        9:16
                      </span>
                    </div>

                    {/* Center Play Button Icon Glow */}
                    <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-pink-600/30 border border-pink-400/80 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 group-hover:scale-115 group-hover:bg-pink-600">
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="relative z-10 p-2.5 sm:p-3 space-y-0.5">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-pink-300 font-semibold uppercase tracking-wider">
                        <span className="truncate max-w-[95px]">{project.client || 'Commercial Reel'}</span>
                        <span className="text-gray-400">{project.year || '2026'}</span>
                      </div>
                      <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-tight line-clamp-1 group-hover:text-pink-200 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* EXPLORE MY WORK: FINAL SCROLL-LINKED ANIMATION           */}
        {/* Slowly reveals from Bottom to Top                        */}
        {/* ======================================================== */}
        <div ref={ctaSectionRef} className="pt-6 pb-10 flex justify-center items-center">
          <button
            ref={ctaButtonRef}
            type="button"
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
            className="group relative inline-flex items-center justify-center p-[2.5px] rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/70 bg-gradient-to-b from-blue-300/40 via-blue-500/20 to-indigo-600/45 will-change-transform"
            aria-label="Explore My Work"
          >
            {/* Inner Pill Body */}
            <span className="relative inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#4d5eff] via-[#3848ee] to-[#2535d4] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:from-[#5868ff] group-hover:via-[#4252f5] group-hover:to-[#2e3edd]">
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
