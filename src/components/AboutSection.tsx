import React, { useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutPortraitPng from '../assets/images/arjun_about_portrait_transparent.png';

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
      // Bidirectional ScrollTrigger timeline with smooth scrub response
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // 1. Main Heading Animation: Slides smoothly upward from bottom
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 65, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
          0
        );
      }

      // 2. About Me Content: Slides smoothly in from the left
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
          0.08
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { x: -70, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
          0.14
        );
      }

      // 3. Social Media Icons: Subtle staggered entrance
      if (socialRef.current) {
        tl.fromTo(
          socialRef.current,
          { x: -45, opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.2
        );
      }

      // 4. Portrait: Slides smoothly in from the right with subtle scale
      if (portraitContainerRef.current) {
        tl.fromTo(
          portraitContainerRef.current,
          { x: 85, opacity: 0, scale: 0.94 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          0.08
        );
      }

      // 5. Radial Glow: Expands softly behind the portrait
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
          0.05
        );

        // Continuous subtle ambient breathing effect
        gsap.to(glowRef.current, {
          scale: 1.08,
          opacity: 0.85,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[auto] lg:min-h-screen w-full flex items-center px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-24 lg:py-28 scroll-mt-20 overflow-hidden bg-[#070709] text-white"
      aria-label="About Me Section"
    >
      {/* Background Ambient Atmosphere */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-14 lg:gap-10 xl:gap-14 2xl:gap-18">
        
        {/* Left Side – Text Content (~52% to 54% Desktop Width) */}
        <div className="w-full lg:w-[52%] xl:w-[53%] flex flex-col justify-center space-y-7 sm:space-y-9 lg:space-y-11">
          
          {/* Main Heading: Moved slightly upward, large, prominent & bold in #463FD1 */}
          <div ref={headingRef} className="will-change-transform">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-[4.3rem] 2xl:text-[4.85rem] font-extrabold tracking-tight text-[#463FD1] leading-[1.08]">
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

        {/* Right Side – Personal Portrait (~46% to 48% Desktop Width) */}
        <div className="w-full lg:w-[48%] xl:w-[47%] flex items-center justify-center lg:justify-end relative">
          
          {/* Subtle Blue/Purple Radial Glow Concentrated Behind Head & Shoulders */}
          <div
            ref={glowRef}
            className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[500px] xl:w-[580px] 2xl:w-[620px] h-[340px] sm:h-[440px] lg:h-[500px] xl:h-[580px] 2xl:h-[620px] bg-[radial-gradient(ellipse_at_center,_rgba(70,63,209,0.45)_0%,_rgba(99,102,241,0.22)_40%,_transparent_72%)] rounded-full blur-[80px] pointer-events-none will-change-transform -z-10"
          />
          <div className="absolute top-1/4 -right-10 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Large Full-Size Portrait with completely transparent cutout background (fills the green-marked reference area) */}
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[660px] xl:max-w-[720px] 2xl:max-w-[780px] flex items-end justify-center select-none will-change-transform"
          >
            <img
              src={aboutPortraitPng}
              alt="Arjun Chougale - Personal Portrait"
              className="w-full h-auto max-h-[700px] xl:max-h-[760px] 2xl:max-h-[820px] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(70,63,209,0.28)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
export default AboutSection;
