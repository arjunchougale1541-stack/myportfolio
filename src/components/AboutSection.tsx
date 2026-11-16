import React, { useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutPortraitImg from '../assets/images/arjun_about_portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline when About section enters the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // A. Main Heading Animation: Smooth upward movement with subtle fade-in
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          0
        );
      }

      // B. About Me Content Animation: Animate label, description, and social icons from left to right with stagger
      const contentElements = [labelRef.current, descRef.current, socialRef.current].filter(Boolean);
      if (contentElements.length > 0) {
        tl.fromTo(
          contentElements,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power2.out',
          },
          0.2
        );
      }

      // C. Portrait Image Animation: Animate from right toward final position with subtle scale
      if (portraitContainerRef.current) {
        tl.fromTo(
          portraitContainerRef.current,
          { x: 60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.15
        );
      }

      // D. Background Glow Animation: Radial glow emerges smoothly
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' },
          0.1
        );

        // Continuous subtle ambient breathing effect
        gsap.to(glowRef.current, {
          scale: 1.08,
          opacity: 0.85,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[auto] lg:min-h-screen w-full flex items-center px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-24 lg:py-32 scroll-mt-20 overflow-hidden bg-[#070709] text-white"
      aria-label="About Me Section"
    >
      {/* Background Ambient Atmosphere */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-14 lg:gap-12 xl:gap-16 2xl:gap-20">
        
        {/* Left Side – Text Content (~55% Desktop Width) */}
        <div className="w-full lg:w-[54%] xl:w-[55%] flex flex-col justify-center space-y-8 sm:space-y-10 lg:space-y-12">
          
          {/* Main Heading: Moved slightly upward, large, prominent & bold in #463FD1 */}
          <div ref={headingRef} className="will-change-transform">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] 2xl:text-[5.25rem] font-extrabold tracking-tight text-[#463FD1] leading-[1.06]">
              Turning ideas into visuals that create impact.
            </h2>
          </div>

          {/* About Me Content: Arranged vertically directly below the main heading */}
          <div className="space-y-5 sm:space-y-6 max-w-[620px]">
            {/* Label */}
            <div ref={labelRef} className="flex items-center gap-2.5 will-change-transform">
              <span className="w-2 h-2 rounded-full bg-[#463FD1] animate-pulse" />
              <span className="text-xs sm:text-sm md:text-base font-bold text-[#463FD1] tracking-widest uppercase font-mono">
                / About me
              </span>
            </div>

            {/* Description Paragraph */}
            <p
              ref={descRef}
              className="text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed will-change-transform"
            >
              “Hi, I'm a Graphic Designer &amp; Video Editor with 1.5 years of experience and 1 year of freelance experience. I create engaging designs, videos, and visual content that help brands communicate, connect, and stand out.”
            </p>

            {/* Social Media Icons */}
            <div ref={socialRef} className="flex items-center gap-3 sm:gap-4 pt-2 will-change-transform">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/axial_graphic?igsi=dGF6M2Nqa2dhNnN3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-white/20 hover:border-[#463FD1] bg-white/[0.04] hover:bg-[#463FD1]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(70,63,209,0.4)] group active:scale-95"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* Behance (Bē) */}
              <a
                href="https://www.behance.net/arjunchougale"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4.5 sm:px-5 h-12 sm:h-13 rounded-full border border-white/20 hover:border-[#463FD1] bg-white/[0.04] hover:bg-[#463FD1]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(70,63,209,0.4)] group font-extrabold text-sm sm:text-base active:scale-95"
                aria-label="Behance Profile"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">Bē</span>
              </a>

              {/* LinkedIn (in) */}
              <a
                href="https://www.linkedin.com/in/arjun-chougale-969a26326"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-white/20 hover:border-[#463FD1] bg-white/[0.04] hover:bg-[#463FD1]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(70,63,209,0.4)] group active:scale-95"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side – Personal Portrait (~45% Desktop Width) */}
        <div className="w-full lg:w-[46%] xl:w-[45%] flex items-center justify-center lg:justify-end relative">
          
          {/* Subtle Blue/Purple Radial Glow Concentrated Behind Head & Shoulders */}
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[480px] xl:w-[540px] h-[340px] sm:h-[440px] lg:h-[500px] xl:h-[560px] bg-[radial-gradient(ellipse_at_center,_rgba(70,63,209,0.42)_0%,_rgba(99,102,241,0.2)_40%,_transparent_70%)] rounded-full blur-[70px] pointer-events-none will-change-transform -z-10"
          />
          <div className="absolute -top-10 -right-6 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

          {/* Large Editorial Portrait (Naturally blended into dark background, no borders/cards) */}
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[550px] 2xl:max-w-[580px] flex items-center justify-center select-none will-change-transform"
          >
            <img
              src={aboutPortraitImg}
              alt="Arjun Chougale - Personal Portrait"
              className="w-full h-auto object-cover rounded-3xl drop-shadow-[0_20px_50px_rgba(70,63,209,0.22)]"
              style={{
                maskImage: 'radial-gradient(ellipse 92% 88% at 50% 45%, black 65%, transparent 100%), linear-gradient(to bottom, black 82%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 45%, black 65%, transparent 100%), linear-gradient(to bottom, black 82%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
