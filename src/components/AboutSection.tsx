import React, { useEffect, useRef } from 'react';
import { Instagram, Linkedin, Scissors, Play, Pause, Video, Volume2, Lock, Layers } from 'lucide-react';
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
  const floatingLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wrappers = floatingLayerRef.current?.querySelectorAll<HTMLElement>('.v-float-wrapper');
      const inners = floatingLayerRef.current?.querySelectorAll<HTMLElement>('.v-float-inner');

      // Floating tweens storage
      const floatTweens: gsap.core.Tween[] = [];
      let isFloatingStarted = false;

      const floatConfigs = [
        { y: -12, rot: -1.5, dur: 5.2, delay: 0 },    // 0: Timeline
        { y: 10, rot: 2.5, dur: 4.6, delay: 0.3 },     // 1: Pr Badge
        { y: -10, rot: -2.5, dur: 5.6, delay: 0.6 },   // 2: Ae Badge
        { y: 12, rot: 2, dur: 6.0, delay: 0.2 },       // 3: Color Wheel
        { y: -13, rot: -3, dur: 4.8, delay: 0.5 },     // 4: Bezier Graph
        { y: 14, rot: 3, dur: 6.4, delay: 0.8 },       // 5: Filmstrip 1
        { y: -10, rot: -2, dur: 5.0, delay: 0.4 },     // 6: Filmstrip 2
        { y: 9, rot: 1.5, dur: 4.4, delay: 0.7 },      // 7: Play/Pause
        { y: -12, rot: -3, dur: 5.4, delay: 0.5 },     // 8: Cut Tool
        { y: 10, rot: 2, dur: 4.7, delay: 0.9 },       // 9: Audio Waveform
        { y: -9, rot: -2, dur: 5.8, delay: 0.1 },      // 10: Type Tool
        { y: 11, rot: 2.5, dur: 6.2, delay: 0.6 },     // 11: Layer Stack
      ];

      const startFloating = () => {
        if (!inners) return;
        if (isFloatingStarted) {
          floatTweens.forEach((t) => t.resume());
          return;
        }
        isFloatingStarted = true;
        inners.forEach((el, idx) => {
          const cfg = floatConfigs[idx % floatConfigs.length];
          const tween = gsap.to(el, {
            y: cfg.y,
            rotation: cfg.rot,
            duration: cfg.dur,
            delay: cfg.delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          floatTweens.push(tween);
        });
      };

      const pauseFloating = () => {
        floatTweens.forEach((t) => t.pause());
      };

      // ========================================================
      // STRICT SEQUENTIAL ENTRANCE TIMELINE
      // Step 1: Text first (Heading -> Label, Description, Social)
      // Step 2: ONLY after text is fully completed -> Portrait
      // Step 3: Floating UI elements rise into place around portrait
      // Step 4: Continuous floating begins
      // ========================================================
      const masterTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          startFloating();
        },
      });

      // Initial layout states
      if (headingRef.current) gsap.set(headingRef.current, { y: 55, opacity: 0 });
      const textItems = [labelRef.current, descRef.current, socialRef.current].filter(Boolean);
      if (textItems.length > 0) gsap.set(textItems, { x: -50, opacity: 0 });
      if (portraitContainerRef.current) gsap.set(portraitContainerRef.current, { x: 80, opacity: 0, scale: 0.94 });
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.75 });
      if (wrappers && wrappers.length > 0) gsap.set(wrappers, { y: 90, opacity: 0, scale: 0.9 });

      // PHASE A: Main Heading reveals upward from bottom (0.0s -> 0.75s)
      if (headingRef.current) {
        masterTl.to(
          headingRef.current,
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          0
        );
      }

      // PHASE B: About Me label, description, and social icons slide in from left (0.45s -> 1.35s)
      if (textItems.length > 0) {
        masterTl.to(
          textItems,
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out' },
          0.45
        );
      }

      // ========================================================
      // TEXT PHASE IS FULLY FINISHED HERE (~1.4s)
      // ========================================================

      // PHASE C: Portrait enters from right with confident ease-out (1.45s -> 2.3s)
      if (portraitContainerRef.current) {
        masterTl.to(
          portraitContainerRef.current,
          { x: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
          1.45
        );
      }

      // Radial Glow emerges behind the portrait
      if (glowRef.current) {
        masterTl.to(
          glowRef.current,
          { opacity: 1, scale: 1, duration: 0.95, ease: 'power2.out' },
          1.45
        );

        // Continuous subtle ambient breathing effect on the glow
        gsap.to(glowRef.current, {
          scale: 1.08,
          opacity: 0.85,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.4,
        });
      }

      // PHASE D: Floating editing elements rise from bottom to their positions (2.15s -> 3.0s)
      if (wrappers && wrappers.length > 0) {
        masterTl.to(
          wrappers,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: 'power3.out',
          },
          2.15
        );
      }

      // ========================================================
      // SCROLLTRIGGER FOR ENTRANCE, EXIT & REVERSE
      // ========================================================
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 15%',
        onEnter: () => {
          // Entering while scrolling down: play the sequential story
          masterTl.play();
        },
        onLeave: () => {
          // Leaving while scrolling down: elements gently move downward and fade out
          pauseFloating();
          if (wrappers && wrappers.length > 0) {
            gsap.to(wrappers, {
              y: 90,
              opacity: 0,
              duration: 0.7,
              stagger: 0.03,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          }
        },
        onEnterBack: () => {
          // Re-entering while scrolling back up: re-enter elements from bottom & resume floating
          if (wrappers && wrappers.length > 0) {
            gsap.to(wrappers, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: 'power3.out',
              overwrite: 'auto',
              onComplete: () => {
                startFloating();
              },
            });
          }
        },
        onLeaveBack: () => {
          // Reversing back up to Hero: smoothly reverse master sequence
          pauseFloating();
          masterTl.reverse();
        },
      });

      // Subtle pulsing glow on neon badges
      if (floatingLayerRef.current) {
        const glowingElements = floatingLayerRef.current.querySelectorAll('.v-neon-pulse');
        gsap.to(glowingElements, {
          boxShadow: '0 0 25px rgba(99,102,241,0.5)',
          opacity: 0.9,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
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

      <div className="w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-14 lg:gap-8 xl:gap-12 2xl:gap-16">
        
        {/* ======================================================== */}
        {/* PRIORITY 1: LEFT SIDE – TEXT CONTENT (z-30)               */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[50%] xl:w-[51%] flex flex-col justify-center space-y-7 sm:space-y-9 lg:space-y-11 z-30">
          
          {/* Main Heading: Large, prominent & bold in #463FD1 */}
          <div ref={headingRef} className="will-change-transform">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.75rem] font-extrabold tracking-tight text-[#463FD1] leading-[1.08]">
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
              “Hi, I'm a Graphic Designer &amp; Video Editor with 2.5 years of experience across agency and freelance work. I create engaging designs, videos, and visual content that help brands communicate, connect, and stand out.”
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

        {/* Right Side Container */}
        <div className="w-full lg:w-[50%] xl:w-[49%] flex items-center justify-center lg:justify-end relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] xl:min-h-[760px]">
          
          {/* ======================================================== */}
          {/* PRIORITY 4: BACKGROUND GLOW & DECORATIVE ORBITS (-z-10)   */}
          {/* ======================================================== */}
          <div
            ref={glowRef}
            className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[500px] xl:w-[580px] 2xl:w-[620px] h-[340px] sm:h-[440px] lg:h-[500px] xl:h-[580px] 2xl:h-[620px] bg-[radial-gradient(ellipse_at_center,_rgba(70,63,209,0.45)_0%,_rgba(99,102,241,0.22)_40%,_transparent_72%)] rounded-full blur-[80px] pointer-events-none will-change-transform -z-10"
          />
          <div className="absolute top-1/4 -right-10 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Orbiting Neon Light Trails (Strictly behind portrait at -z-10) */}
          <div className="absolute inset-0 pointer-events-none overflow-visible -z-10 opacity-70">
            <svg className="w-full h-full" viewBox="0 0 700 700" fill="none">
              <ellipse
                cx="340"
                cy="380"
                rx="320"
                ry="180"
                transform="rotate(-20 340 380)"
                stroke="url(#neonOrbit1)"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <ellipse
                cx="360"
                cy="420"
                rx="290"
                ry="140"
                transform="rotate(18 360 420)"
                stroke="url(#neonOrbit2)"
                strokeWidth="1.2"
                className="opacity-40"
              />
              <defs>
                <linearGradient id="neonOrbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#463FD1" stopOpacity="0" />
                  <stop offset="30%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="neonOrbit2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                  <stop offset="40%" stopColor="#818cf8" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#463FD1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* ======================================================== */}
          {/* PRIORITY 3: FLOATING VIDEO EDITING UI ELEMENTS (z-10)     */}
          {/* Sits BEHIND the portrait (z-20) so it never covers Arjun */}
          {/* ======================================================== */}
          <div ref={floatingLayerRef} className="absolute inset-0 pointer-events-none select-none z-10">

            {/* 1. Premiere Pro Timeline Panel (Sits behind Arjun's left shoulder/torso) */}
            <div className="v-float-wrapper absolute left-[-25px] sm:left-[-45px] lg:left-[-75px] xl:left-[-90px] top-[30%] sm:top-[32%] z-[1]">
              <div className="v-float-inner will-change-transform">
                <div className="w-[280px] xs:w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[450px] rounded-2xl bg-[#0a0c16]/85 backdrop-blur-xl border border-indigo-500/35 shadow-[0_20px_50px_rgba(70,63,209,0.3)] p-3 sm:p-4 text-white overflow-hidden">
                  
                  {/* Timeline Header: Timecode Ruler */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] sm:text-[10px] font-mono text-gray-400">
                    <span className="text-cyan-400 font-semibold">00:00:00:00</span>
                    <span className="hidden xs:inline">00:00:25:00</span>
                    <span className="hidden sm:inline">00:00:50:00</span>
                    <span>00:01:15:00</span>
                  </div>

                  {/* Ruler Ticks */}
                  <div className="flex justify-between py-1 px-1 opacity-30">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span key={i} className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-2.5 opacity-80' : 'h-1.5 opacity-40'}`} />
                    ))}
                  </div>

                  {/* Video Track (V1) */}
                  <div className="relative mt-1.5 flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-400 pl-0.5">
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      <Lock className="w-3 h-3 text-gray-500" />
                    </div>
                    {/* Clips Container */}
                    <div className="flex-1 flex gap-2 h-7 sm:h-8 relative overflow-hidden">
                      {/* Clip 1 */}
                      <div className="flex-1 rounded-md bg-gradient-to-r from-indigo-700/60 to-purple-800/60 border border-indigo-400/40 p-1 flex items-center justify-between shadow-inner">
                        <span className="text-[9px] sm:text-[10px] font-medium text-indigo-200 truncate">Commercial_Cut_01</span>
                        <div className="w-1.5 h-full bg-indigo-400/60 rounded-r" />
                      </div>
                      {/* Clip 2 */}
                      <div className="w-[36%] rounded-md bg-gradient-to-r from-blue-700/60 to-cyan-800/60 border border-blue-400/40 p-1 flex items-center justify-between shadow-inner">
                        <span className="text-[9px] sm:text-[10px] font-medium text-blue-200 truncate">B-Roll_02</span>
                        <div className="w-1.5 h-full bg-cyan-400/60 rounded-r" />
                      </div>
                    </div>
                  </div>

                  {/* Audio Track (A1) */}
                  <div className="relative mt-2 flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-gray-400 pl-0.5">
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <Lock className="w-3 h-3 text-gray-500" />
                    </div>
                    {/* Audio Waveform visualization */}
                    <div className="flex-1 h-6 sm:h-7 rounded-md bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-around px-2 overflow-hidden">
                      {Array.from({ length: 36 }).map((_, i) => {
                        const h = Math.sin(i * 0.45) * 45 + 50;
                        return (
                          <span
                            key={i}
                            className="w-[2px] bg-gradient-to-t from-cyan-400 to-indigo-300 rounded-full"
                            style={{ height: `${h}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Playhead Vertical Glowing Line */}
                  <div className="absolute top-2 bottom-2 left-[58%] w-[1.5px] bg-cyan-300 shadow-[0_0_10px_#22d3ee] pointer-events-none">
                    <div className="absolute -top-1 -left-[5px] w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-cyan-300 filter drop-shadow-[0_0_6px_#22d3ee]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Floating Premiere Pro (Pr) Badge */}
            <div className="v-float-wrapper absolute left-[15px] sm:left-[45px] lg:left-[55px] xl:left-[70px] top-[14%] sm:top-[15%] z-[5]">
              <div className="v-float-inner v-neon-pulse will-change-transform w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#09081a]/90 backdrop-blur-md border border-[#9999ff]/40 shadow-[0_0_25px_rgba(153,153,255,0.35)] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-[#a78bfa] tracking-tight drop-shadow-[0_0_10px_rgba(167,139,250,0.8)] font-sans">
                  Pr
                </span>
              </div>
            </div>

            {/* 3. Floating After Effects (Ae) Badge */}
            <div className="v-float-wrapper absolute -right-2 sm:right-2 lg:right-2 xl:right-4 top-[45%] sm:top-[47%] z-[5]">
              <div className="v-float-inner v-neon-pulse will-change-transform w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#09081a]/90 backdrop-blur-md border border-[#818cf8]/40 shadow-[0_0_25px_rgba(129,140,248,0.35)] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-[#818cf8] tracking-tight drop-shadow-[0_0_10px_rgba(129,140,248,0.8)] font-sans">
                  Ae
                </span>
              </div>
            </div>

            {/* 4. Glowing Color Grading Wheel & Balance Sliders (Top Right) */}
            <div className="v-float-wrapper absolute right-1 sm:right-4 lg:right-6 xl:right-8 top-[3%] sm:top-[4%] z-[5]">
              <div className="v-float-inner will-change-transform flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#0a0c1a]/85 backdrop-blur-xl border border-indigo-500/35 shadow-[0_15px_40px_rgba(70,63,209,0.3)]">
                {/* Hue Circle Wheel */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  style={{
                    background: 'conic-gradient(from 0deg, #ff0055, #ffaa00, #00ff66, #00ffff, #0066ff, #aa00ff, #ff0055)'
                  }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0b16] border border-white/20 flex items-center justify-center shadow-inner">
                    {/* Reticle balance dot */}
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  </div>
                </div>

                {/* Adjustment Sliders */}
                <div className="space-y-1.5 w-16 sm:w-20">
                  <div className="h-1.5 rounded-full bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-[65%] bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[62%] w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-[45%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[42%] w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_6px_#f472b6]" />
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-[80%] bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[77%] w-2.5 h-2.5 rounded-full bg-indigo-300 shadow-[0_0_6px_#818cf8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Motion Graphics Bezier Curve & Keyframe Graph */}
            <div className="v-float-wrapper absolute -right-3 sm:right-1 lg:right-2 xl:right-4 top-[24%] sm:top-[26%] z-[5]">
              <div className="v-float-inner will-change-transform w-36 sm:w-44 h-24 sm:h-28 rounded-2xl bg-[#090b18]/85 backdrop-blur-xl border border-white/15 p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-indigo-300 border-b border-white/10 pb-1">
                  <span>Speed Ramp</span>
                  <span className="text-cyan-400 font-bold">Bézier</span>
                </div>
                {/* SVG Graph Grid & Curve */}
                <div className="relative flex-1 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 120 60" fill="none">
                    {/* Grid lines */}
                    <line x1="0" y1="15" x2="120" y2="15" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    <line x1="0" y1="45" x2="120" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    <line x1="40" y1="0" x2="40" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    <line x1="80" y1="0" x2="80" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    
                    {/* Tangent control handle */}
                    <line x1="20" y1="48" x2="55" y2="48" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
                    <circle cx="55" cy="48" r="2" fill="#60a5fa" />
                    <line x1="65" y1="12" x2="100" y2="12" stroke="rgba(192,132,252,0.4)" strokeWidth="1" />
                    <circle cx="65" cy="12" r="2" fill="#c084fc" />

                    {/* Glowing S-Curve */}
                    <path
                      d="M 20 48 C 55 48, 65 12, 100 12"
                      stroke="url(#graphCurve)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Keyframe Diamond 1 */}
                    <rect x="17" y="45" width="6" height="6" transform="rotate(45 20 48)" fill="#38bdf8" className="filter drop-shadow-[0_0_6px_#38bdf8]" />
                    {/* Keyframe Diamond 2 */}
                    <rect x="97" y="9" width="6" height="6" transform="rotate(45 100 12)" fill="#c084fc" className="filter drop-shadow-[0_0_6px_#c084fc]" />

                    <defs>
                      <linearGradient id="graphCurve" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* 6. Floating Curved Filmstrip 1 (Top Left) */}
            <div className="v-float-wrapper absolute left-[0px] sm:left-[25px] lg:left-[35px] xl:left-[45px] top-[1%] sm:top-[2%] z-[2]">
              <div className="v-float-inner will-change-transform -rotate-6">
                <div className="w-32 sm:w-40 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  {/* Top sprocket holes */}
                  <div className="flex justify-between px-1 pb-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="w-2 h-1.5 bg-white/30 rounded-[1px]" />
                    ))}
                  </div>
                  {/* Film frames */}
                  <div className="flex gap-1.5">
                    <div className="flex-1 h-12 sm:h-14 rounded bg-gradient-to-br from-indigo-900/80 via-blue-900/60 to-purple-900/80 border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1 left-1 text-[7px] font-mono text-cyan-300">#01A</span>
                    </div>
                    <div className="flex-1 h-12 sm:h-14 rounded bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-indigo-900/80 border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1 left-1 text-[7px] font-mono text-pink-300">#02B</span>
                    </div>
                  </div>
                  {/* Bottom sprocket holes */}
                  <div className="flex justify-between px-1 pt-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="w-2 h-1.5 bg-white/30 rounded-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Floating Filmstrip Cell 2 (Middle Right) */}
            <div className="v-float-wrapper absolute right-[45px] sm:right-[75px] lg:right-[90px] xl:right-[105px] top-[49%] sm:top-[51%] z-[2] hidden xs:block">
              <div className="v-float-inner will-change-transform rotate-6">
                <div className="w-20 sm:w-24 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 p-1 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  <div className="flex justify-between px-1 pb-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span key={i} className="w-1.5 h-1 bg-white/30 rounded-[1px]" />
                    ))}
                  </div>
                  <div className="h-9 sm:h-11 rounded bg-gradient-to-tr from-cyan-900/80 to-blue-950/80 border border-cyan-400/20 flex items-center justify-center">
                    <span className="text-[7px] font-mono text-cyan-300 font-bold">REC ●</span>
                  </div>
                  <div className="flex justify-between px-1 pt-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span key={i} className="w-1.5 h-1 bg-white/30 rounded-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Play / Pause Glass Pill */}
            <div className="v-float-wrapper absolute left-[38%] sm:left-[43%] lg:left-[41%] xl:left-[43%] top-[10%] sm:top-[11%] z-[5]">
              <div className="v-float-inner will-change-transform px-3.5 py-1.5 rounded-full bg-[#090b16]/90 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
                <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <span className="w-[1px] h-3 bg-white/20" />
                <Pause className="w-3 h-3 text-gray-300 fill-gray-300" />
              </div>
            </div>

            {/* 9. Razor / Cut Tool Badge [ ✂ ] */}
            <div className="v-float-wrapper absolute -left-4 sm:left-2 lg:left-4 xl:left-6 top-[66%] sm:top-[68%] z-[5]">
              <div className="v-float-inner will-change-transform px-3.5 sm:px-4 py-2 rounded-xl bg-[#090b16]/90 backdrop-blur-md border border-[#463FD1]/45 flex items-center gap-2 shadow-[0_0_20px_rgba(70,63,209,0.35)] font-mono text-sm">
                <span className="text-gray-400 font-bold">[</span>
                <Scissors className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-400 font-bold">]</span>
                <span className="text-[10px] text-gray-400 ml-1">C</span>
              </div>
            </div>

            {/* 10. Glowing Audio Waveform Pill */}
            <div className="v-float-wrapper absolute left-4 sm:left-10 lg:left-12 xl:left-14 top-[82%] sm:top-[84%] z-[5]">
              <div className="v-float-inner will-change-transform px-3.5 py-2 rounded-xl bg-[#0a0c1a]/90 backdrop-blur-md border border-cyan-500/35 flex items-center gap-1 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                {Array.from({ length: 14 }).map((_, i) => {
                  const heights = [35, 60, 90, 45, 75, 100, 70, 40, 85, 65, 95, 50, 80, 40];
                  return (
                    <span
                      key={i}
                      className="w-[2px] bg-gradient-to-t from-cyan-400 to-indigo-400 rounded-full animate-pulse"
                      style={{
                        height: `${heights[i % heights.length] * 0.22}px`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 11. Type / Text Tool Badge [ T ] */}
            <div className="v-float-wrapper absolute -right-3 sm:right-1 lg:right-2 xl:right-4 top-[62%] sm:top-[64%] z-[5]">
              <div className="v-float-inner will-change-transform w-11 h-11 rounded-xl bg-[#090b18]/90 backdrop-blur-md border border-dashed border-indigo-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] relative">
                {/* 4 corner handles */}
                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#ffffff]" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#ffffff]" />
                <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#ffffff]" />
                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#ffffff]" />
                <span className="font-serif font-black text-xl text-white tracking-wide">T</span>
              </div>
            </div>

            {/* 12. Layer Stack Isometric Planes */}
            <div className="v-float-wrapper absolute right-8 sm:right-12 lg:right-14 xl:right-16 top-[78%] sm:top-[80%] z-[5]">
              <div className="v-float-inner will-change-transform p-2.5 rounded-xl bg-[#090b18]/90 backdrop-blur-md border border-indigo-500/35 flex items-center justify-center shadow-[0_0_20px_rgba(70,63,209,0.35)]">
                <Layers className="w-5 h-5 text-indigo-300" />
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* PRIORITY 2: PERSONAL PORTRAIT (z-20)                      */}
          {/* ALWAYS IN FRONT of all floating editing elements          */}
          {/* ======================================================== */}
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[660px] xl:max-w-[720px] 2xl:max-w-[780px] flex items-end justify-center select-none will-change-transform z-20 pointer-events-auto"
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
