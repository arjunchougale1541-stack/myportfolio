import React, { useState, useEffect, useRef } from 'react';
import { servicesData } from '../data/projectsData';
import { Sparkles, Video, PenTool, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingContainerRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'graphic-design':
        return <PenTool className="w-5 h-5" />;
      case 'video-editor':
        return <Video className="w-5 h-5" />;
      case 'content-creation':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const headingWords = [
    'I',
    'create',
    'visual',
    'solutions',
    'that',
    'bring',
    'ideas',
    'to',
    'life.',
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Coordinated master timeline for the entire Services section entrance
      const servicesTl = gsap.timeline({
        paused: true,
      });

      // 1. Initial states for all animated targets
      const wordSpans = headingContainerRef.current?.querySelectorAll<HTMLElement>('.service-word-inner');
      if (wordSpans && wordSpans.length > 0) {
        gsap.set(wordSpans, { y: 55, opacity: 0 });
      }

      if (labelRef.current) {
        gsap.set(labelRef.current, { x: -30, opacity: 0 });
      }

      if (descRef.current) {
        gsap.set(descRef.current, { y: 25, opacity: 0 });
      }

      const cardWrappers = cardsContainerRef.current?.querySelectorAll<HTMLElement>('.service-card-wrapper');
      if (cardWrappers && cardWrappers.length > 0) {
        gsap.set(cardWrappers, { y: 70, opacity: 0, scale: 0.96 });
      }

      const cardInners = cardsContainerRef.current?.querySelectorAll<HTMLElement>('.service-card-inner');

      // 2. Main Heading: Word-by-word upward reveal from bottom with overflow mask
      if (wordSpans && wordSpans.length > 0) {
        servicesTl.to(
          wordSpans,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.085,
            ease: 'power3.out',
          },
          0
        );
      }

      // 3. Right-side Introduction: Label slides gently left-to-right, description fades upward
      if (labelRef.current) {
        servicesTl.to(
          labelRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          0.42
        );
      }

      if (descRef.current) {
        servicesTl.to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          0.52
        );
      }

      // 4. Three Service Cards: Staggered entrance cascade (Graphic Design -> Video Editor -> Content Creation)
      if (cardWrappers && cardWrappers.length > 0) {
        servicesTl.to(
          cardWrappers,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
          },
          0.85
        );
      }

      // 5. Card Internal Content: Quick, elegant micro-reveals as each card settles
      if (cardInners && cardInners.length > 0) {
        cardInners.forEach((card, idx) => {
          const cardStartTime = 0.95 + idx * 0.15;

          const headerEl = card.querySelector('.service-card-header');
          const descEl = card.querySelector('.service-card-desc');
          const capHeadEl = card.querySelector('.service-card-cap-head');
          const skillItems = card.querySelectorAll('.service-card-skill-item');
          const toolBadges = card.querySelectorAll('.service-card-tool-badge');

          if (headerEl) {
            gsap.set(headerEl, { y: 15, opacity: 0 });
            servicesTl.to(
              headerEl,
              { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
              cardStartTime
            );
          }

          if (descEl) {
            gsap.set(descEl, { y: 20, opacity: 0 });
            servicesTl.to(
              descEl,
              { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
              cardStartTime + 0.08
            );
          }

          if (capHeadEl) {
            gsap.set(capHeadEl, { y: 12, opacity: 0 });
            servicesTl.to(
              capHeadEl,
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              cardStartTime + 0.14
            );
          }

          if (skillItems && skillItems.length > 0) {
            gsap.set(skillItems, { y: 12, opacity: 0 });
            servicesTl.to(
              skillItems,
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' },
              cardStartTime + 0.18
            );
          }

          if (toolBadges && toolBadges.length > 0) {
            gsap.set(toolBadges, { y: 10, opacity: 0 });
            servicesTl.to(
              toolBadges,
              { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' },
              cardStartTime + 0.25
            );
          }
        });
      }

      // ScrollTrigger connection
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          servicesTl.play();
        },
        onLeaveBack: () => {
          // Reverses when scrolling back up past the section, ready to replay
          servicesTl.reverse();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt and Restrained Hover Handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt: max 2.5 degrees
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setHoveredIndex(idx);
    const card = e.currentTarget;
    gsap.to(card, {
      y: -7,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(null);
    const card = e.currentTarget;
    gsap.to(card, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-14 sm:py-24 lg:py-28 w-full px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-[#070709] text-white"
    >
      {/* Top Header: Statement Left + Paragraph Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-start mb-8 sm:mb-16">
        
        {/* Left Column: Bold Indigo Statement with Word-by-Word Reveal */}
        <div className="lg:col-span-7">
          <h2
            ref={headingContainerRef}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#4757fe] leading-[1.08] flex flex-wrap"
          >
            {headingWords.map((word, wIdx) => (
              <span
                key={wIdx}
                className="inline-block overflow-hidden py-0.5 mr-[0.28em] last:mr-0 align-top"
              >
                <span className="service-word-inner inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Right Column: / My Services + Description */}
        <div className="lg:col-span-5 space-y-2.5 sm:space-y-4">
          <div ref={labelRef} className="flex items-center gap-2 will-change-transform">
            <span className="text-xs sm:text-base font-bold text-[#4757fe] tracking-wide font-mono uppercase">
              / My Services
            </span>
          </div>

          <p
            ref={descRef}
            className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 font-normal leading-relaxed will-change-transform"
          >
            My services go beyond just design. I create meaningful visual experiences through graphic design, video editing, and digital content creation—helping ideas communicate clearly, connect with audiences, and stand out.
          </p>
        </div>
      </div>

      {/* 3 Services Cards Grid - Full Width Rectangular Layout */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-5 sm:gap-6 lg:gap-8 w-full"
      >
        {servicesData.map((service, idx) => {
          const isHovered = hoveredIndex === idx;
          const isVideoEditor = service.id === 'video-editor';

          return (
            /* Outer Wrapper: Dedicated solely to Scroll Entrance Transforms (y: 70 -> 0, scale: 0.96 -> 1) */
            <div
              key={service.id}
              className="service-card-wrapper w-full h-full flex flex-col will-change-transform"
            >
              {/* Inner Card: Handles 3D Tilt, Lift (-7px), and Ambient Glow */}
              <div
                onMouseMove={handleCardMouseMove}
                onMouseEnter={(e) => handleCardMouseEnter(e, idx)}
                onMouseLeave={handleCardMouseLeave}
                className={`service-card-inner w-full h-full p-6 sm:p-7 md:p-8 rounded-2xl border transition-[border-color,box-shadow,background] duration-300 ease-out space-y-5 sm:space-y-6 flex flex-col justify-between group cursor-pointer will-change-transform select-none ${
                  isVideoEditor
                    ? isHovered
                      ? 'border-indigo-400/90 shadow-2xl shadow-indigo-600/40 ring-2 ring-indigo-400/50 bg-gradient-to-b from-[#18153c] to-[#0d0c1e]'
                      : 'border-indigo-500/60 shadow-xl shadow-indigo-950/60 ring-1 ring-indigo-500/35 bg-gradient-to-b from-[#13112c] to-[#0a0a14]'
                    : isHovered
                    ? 'border-indigo-500/80 shadow-2xl shadow-indigo-600/30 ring-1 ring-indigo-500/40 bg-gradient-to-b from-[#141230] to-[#0c0b1a]'
                    : 'border-indigo-950/80 bg-gradient-to-b from-[#100f24] to-[#0a0a14]'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Header: Title + Service Icon + /01, /02, /03 */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="service-card-header flex items-center justify-between gap-3 will-change-transform">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`p-2 sm:p-2.5 rounded-lg border transition-all duration-300 ${
                          isVideoEditor
                            ? 'bg-indigo-600/30 border-indigo-400/60 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.35)] group-hover:scale-110 group-hover:bg-indigo-600/40 group-hover:border-indigo-300'
                            : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600/30 group-hover:border-indigo-400/60 group-hover:text-indigo-300'
                        }`}
                      >
                        {getServiceIcon(service.id)}
                      </div>
                      <h3
                        className={`text-lg sm:text-2xl font-extrabold tracking-tight uppercase transition-colors ${
                          isVideoEditor
                            ? 'text-indigo-200 group-hover:text-white'
                            : 'text-[#4757fe] group-hover:text-indigo-300'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-lg sm:text-xl font-bold font-mono text-gray-500 group-hover:text-indigo-400 transition-colors">
                      /{service.number}
                    </span>
                  </div>

                  <p className="service-card-desc text-sm text-gray-300 leading-relaxed font-normal will-change-transform">
                    {service.description}
                  </p>

                  {/* Skills Highlights */}
                  <div className="pt-2 space-y-2">
                    <div className="service-card-cap-head text-xs font-bold text-gray-400 group-hover:text-indigo-300 uppercase tracking-wider transition-colors will-change-transform">
                      Core Capabilities:
                    </div>
                    <div className="space-y-1.5 text-xs text-gray-300">
                      {service.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="service-card-skill-item flex items-center gap-2 will-change-transform"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                              isVideoEditor ? 'bg-indigo-400' : 'bg-indigo-500 group-hover:bg-indigo-400'
                            }`}
                          />
                          <span className="leading-snug">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Software Badges */}
                <div className="pt-4 border-t border-indigo-950/80 group-hover:border-indigo-900/80 transition-colors mt-auto">
                  <div className="flex flex-wrap items-center gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className="service-card-tool-badge px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wider bg-[#1c194c] hover:bg-[#28236b] text-indigo-200 hover:text-white border border-indigo-500/30 hover:border-indigo-400/60 uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-default will-change-transform select-none"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default ServicesSection;
