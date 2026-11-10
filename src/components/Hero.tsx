import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PremiereTimeline } from './PremiereTimeline';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onCollaborate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCollaborate }) => {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const timelineWrapperRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Background video playback setup
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playbackRate = 0.5;

      const setHalfSpeed = () => {
        if (video) video.playbackRate = 0.5;
      };

      video.addEventListener('loadedmetadata', setHalfSpeed);
      video.addEventListener('play', setHalfSpeed);

      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay failed or was prevented:', err);
        });
      }

      return () => {
        video.removeEventListener('loadedmetadata', setHalfSpeed);
        video.removeEventListener('play', setHalfSpeed);
      };
    }
  }, []);

  // GSAP ScrollTrigger Sequence Setup
  useEffect(() => {
    if (!containerRef.current || !timelineWrapperRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Controlled flatter diagonal angles
      const initialAngle = prefersReducedMotion ? 0 : isMobile ? 2.5 : isTablet ? 3.5 : 5.0;
      const flatAngle = prefersReducedMotion ? 0 : isMobile ? 0.5 : 1.0;
      // Responsive scale for Premiere timeline
      const timelineScale = isMobile ? 0.68 : isTablet ? 0.90 : 1.08;

      // Vertical position in viewport:
      const initialY = isMobile ? '36vh' : '42vh';
      const showcaseY = isMobile ? '22vh' : '26vh';

      // Pin the hero section during the timeline animation.
      // Once the animation finishes (+100% scroll distance), the pin cleanly releases
      // and normal document scroll carries the entire hero section (background, text, timeline)
      // upward together, revealing the About section immediately with ZERO empty gap!
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%', // Concise, smooth scroll distance (100vh)
          pin: true,
          scrub: 1, // Direct smooth scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial state: timeline is COMPLETELY HIDDEN at initial page load
      gsap.set(timelineWrapperRef.current, {
        y: initialY,
        rotation: initialAngle,
        transformOrigin: 'center center',
        scale: timelineScale,
        autoAlpha: 0, // Hidden at start - reveals only when user begins scrolling
        force3D: true,
      });

      // 2. On scroll: timeline reveals with a smooth, premium fade-in & slight slide-in (0.00 to 0.35)
      masterTl.to(
        timelineWrapperRef.current,
        {
          autoAlpha: 0.385, // Smooth fade-in (decreased by 30% from 0.55 to ~38.5% opacity)
          y: showcaseY, // Smooth slight slide-in into showcase position
          rotation: flatAngle, // Smoothly flattens to approved subtle angle
          duration: 0.35,
          ease: 'power2.out',
        },
        0
      );

      // Hero content stays centered, easing slightly upward to maintain perfect visual balance
      masterTl.to(
        heroContentRef.current,
        {
          y: isMobile ? -10 : -20,
          duration: 0.35,
          ease: 'power2.out',
        },
        0
      );

      // 2. Playhead scrubs across the tracks with real-time timecode updates (0.15 to 1.00)
      const scrubProxy = { progress: 0 };
      masterTl.to(
        scrubProxy,
        {
          progress: 1,
          duration: 0.85,
          ease: 'none',
          onUpdate: () => {
            const p = scrubProxy.progress;

            // Update playhead needle position across timeline tracks
            if (playheadRef.current) {
              const playheadPos = 15 + p * 68;
              playheadRef.current.style.left = `${playheadPos}%`;
            }

            // Update digital timecode in real time (24 fps)
            if (timecodeRef.current) {
              const startFrame = 72; // 00:00:03:00
              const totalFrames = Math.round(startFrame + p * 540);
              const frames = totalFrames % 24;
              const totalSeconds = Math.floor(totalFrames / 24);
              const seconds = totalSeconds % 60;
              const minutes = Math.floor(totalSeconds / 60);

              const pad = (n: number) => String(n).padStart(2, '0');
              timecodeRef.current.textContent = `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
            }
          },
        },
        0.15
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden bg-[#07070d] flex flex-col justify-center items-center"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero_section_background_video_new.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={(e) => {
            e.currentTarget.playbackRate = 0.5;
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero_section_background_video_new.mp4" type="video/mp4" />
          <source src="/hero_section_background_video.mp4" type="video/mp4" />
        </video>

        {/* Elegant dark overlay for text legibility & seamless fade to next section */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07070d]/80 via-[#07070d]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07070d] via-[#07070d]/70 to-transparent" />
      </div>

      {/* Main Content: Vertically Centered with Original Large Typography (Matches Reference Image 1) */}
      <div
        ref={heroContentRef}
        className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center flex flex-col items-center justify-center py-16 sm:py-20 pointer-events-auto select-none"
      >
        {/* Main Display Headline (Responsive scaling with crisp fluid hierarchy) */}
        <h1 className="text-[32px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.08] max-w-6xl drop-shadow-lg">
          <span className="text-[#4757fe]">Creative</span> ideas.
          <br />
          meaningful <span className="text-[#4757fe]">impact.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-6 text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl font-normal leading-relaxed px-2 sm:px-0 drop-shadow">
          I turn ideas into bold visual experiences that connect brands with their audience and make them stand out.
        </p>

        {/* Action Row: CTA Button (Crisp, fully opaque, solid visual strength) */}
        <div
          ref={ctaButtonRef}
          className="mt-6 sm:mt-8 md:mt-10 flex items-center justify-center z-20 opacity-100"
        >
          <button
            onClick={onCollaborate}
            className="group relative inline-flex items-center justify-center p-[2px] sm:p-[2.5px] rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-black/80 bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-600 opacity-100"
            aria-label="Let's Create Together"
          >
            <span className="relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#4d5eff] via-[#3848ee] to-[#2535d4] text-white font-bold text-xs sm:text-base tracking-wider uppercase shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:from-[#5868ff] group-hover:via-[#4252f5] group-hover:to-[#2e3edd] opacity-100">
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                LET'S CREATE TOGETHER
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-100 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll-Driven Adobe Premiere Pro Timeline Component */}
      {/* Hidden on initial page load; reveals smoothly with a fade-in and slide-in as user scrolls */}
      <div
        ref={timelineWrapperRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 will-change-transform opacity-0 pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <PremiereTimeline
          playheadRef={playheadRef}
          timecodeRef={timecodeRef}
        />
      </div>
    </section>
  );
};
