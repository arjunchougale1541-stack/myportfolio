import React, { useState, useEffect, useRef, useCallback } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [continuousOffset, setContinuousOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [cardSpacing, setCardSpacing] = useState<number>(340);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; time: number; offset: number } | null>(null);
  const velocityTrackerRef = useRef<{ x: number; time: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // GSAP Animation Refs
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const carouselScrollWrapperRef = useRef<HTMLDivElement>(null);
  const navControlsRef = useRef<HTMLDivElement>(null);

  const totalCards = testimonialsData.length;

  const headingWords = ['What', 'people', 'say'];

  // Responsive card spacing calculation
  const updateSpacing = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) {
      setCardSpacing(Math.min(width * 0.78, 280)); // Mobile: 1 centered card + partial peeks
    } else if (width < 1024) {
      setCardSpacing(230); // Tablet: 3 visible cards
    } else if (width < 1440) {
      setCardSpacing(275); // Desktop: 5 visible cards (center + 2 left + 2 right)
    } else {
      setCardSpacing(305); // Large screens: 5 visible cards
    }
  }, []);

  useEffect(() => {
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, [updateSpacing]);

  // Smooth physics animation to target slot
  const animateToSlot = useCallback((targetSlot: number, duration = 480) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startOffset = continuousOffset;
    const delta = targetSlot - startOffset;
    const startTime = performance.now();

    // Cubic ease-out curve for natural momentum feel
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = startOffset + delta * eased;

      setContinuousOffset(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Animation finished: normalize index
        const normalized = ((Math.round(targetSlot) % totalCards) + totalCards) % totalCards;
        setCurrentIndex(normalized);
        setContinuousOffset(normalized);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [continuousOffset, totalCards]);

  // Navigate forward/backward by n slots
  const navigateBy = useCallback((delta: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const target = Math.round(continuousOffset) + delta;
    animateToSlot(target, 450);
  }, [continuousOffset, animateToSlot]);

  // Navigate to specific index via shortest wrap path
  const navigateToIndex = useCallback((targetIndex: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const currentNorm = ((Math.round(continuousOffset) % totalCards) + totalCards) % totalCards;
    let diff = targetIndex - currentNorm;
    if (diff > totalCards / 2) diff -= totalCards;
    else if (diff < -totalCards / 2) diff += totalCards;
    const target = Math.round(continuousOffset) + diff;
    animateToSlot(target, 500);
  }, [continuousOffset, totalCards, animateToSlot]);

  // Autoplay functionality (pauses when hovered or dragged)
  useEffect(() => {
    if (isHovered || isDragging) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      navigateBy(1);
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, isDragging, navigateBy]);

  // Drag Gesture Handlers (Touch & Mouse unified via Pointer Events)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary mouse button or touch
    if (e.button !== 0) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    dragStartRef.current = {
      x: e.clientX,
      time: performance.now(),
      offset: continuousOffset,
    };
    velocityTrackerRef.current = [{ x: e.clientX, time: performance.now() }];
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !isDragging) return;

    const currentX = e.clientX;
    const currentTime = performance.now();
    const deltaX = currentX - dragStartRef.current.x;

    // Convert pixel delta into slot offset
    const slotDelta = -deltaX / cardSpacing;
    setContinuousOffset(dragStartRef.current.offset + slotDelta);

    // Track position history for velocity estimation
    const history = velocityTrackerRef.current;
    history.push({ x: currentX, time: currentTime });
    if (history.length > 5) history.shift();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !isDragging) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture release fails
    }

    setIsDragging(false);

    const startX = dragStartRef.current.x;
    const totalDeltaX = e.clientX - startX;
    const history = velocityTrackerRef.current;

    let velocity = 0;
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.time - first.time;
      if (dt > 0) {
        velocity = (last.x - first.x) / dt; // px per ms
      }
    }

    dragStartRef.current = null;

    // If it was a small tap/click rather than a swipe, click handler on card will handle it
    if (Math.abs(totalDeltaX) < 8) {
      const targetSlot = Math.round(continuousOffset);
      animateToSlot(targetSlot, 350);
      return;
    }

    // Momentum easing: projected landing slot based on velocity
    let momentumStep = 0;
    if (Math.abs(velocity) > 0.35) {
      // Swiped with speed: apply momentum in swipe direction
      momentumStep = velocity < 0 ? 1 : -1;
      if (Math.abs(velocity) > 1.2) {
        momentumStep = velocity < 0 ? 2 : -2;
      }
    }

    const targetSlot = Math.round(continuousOffset + momentumStep);
    animateToSlot(targetSlot, 480);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
      setIsDragging(false);
      dragStartRef.current = null;
      animateToSlot(Math.round(continuousOffset), 350);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateBy(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateBy(1);
    }
  };

  // Coordinated GSAP Scroll-Triggered Entrance and Exit Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const initialCarouselY = isMobile ? 40 : 80;

      // Master coordinated entrance timeline
      const entranceTl = gsap.timeline({
        paused: true,
      });

      // 1. Initial states for all animated targets
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: 20, opacity: 0 });
      }

      const wordInners = headingRef.current?.querySelectorAll<HTMLElement>('.testimonial-word-inner');
      if (wordInners && wordInners.length > 0) {
        gsap.set(wordInners, { y: 55, opacity: 0 });
      }

      if (descRef.current) {
        gsap.set(descRef.current, { y: 25, opacity: 0 });
      }

      if (carouselScrollWrapperRef.current) {
        gsap.set(carouselScrollWrapperRef.current, {
          y: initialCarouselY,
          opacity: 0,
          scale: 0.96,
        });
      }

      const navItems = navControlsRef.current?.querySelectorAll<HTMLElement>('.nav-control-item');
      if (navItems && navItems.length > 0) {
        gsap.set(navItems, { y: 15, opacity: 0 });
      }

      // 2. Build entrance timeline
      // Step 1: Label reveal (duration 450ms, power3.out)
      if (labelRef.current) {
        entranceTl.to(
          labelRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
          },
          0
        );
      }

      // Step 2: Heading word-by-word reveal (duration ~700ms per word, stagger 85ms, power3.out)
      if (wordInners && wordInners.length > 0) {
        entranceTl.to(
          wordInners,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.085,
            ease: 'power3.out',
          },
          0.18
        );
      }

      // Step 3: Description fade-in (starts at 0.55s after heading is mostly revealed, duration 650ms, power2.out)
      if (descRef.current) {
        entranceTl.to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
          },
          0.55
        );
      }

      // Step 4: Entire carousel wrapper rises from below (duration 1000ms, power3.out)
      if (carouselScrollWrapperRef.current) {
        entranceTl.to(
          carouselScrollWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
          },
          1.0
        );
      }

      // Step 5: Navigation controls fade in (duration 450ms, stagger 80ms, power3.out)
      if (navItems && navItems.length > 0) {
        entranceTl.to(
          navItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          1.7
        );
      }

      // 3. ScrollTrigger attachment for entrance, exit, and re-entry
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        end: 'bottom 15%',
        onEnter: () => {
          entranceTl.play();
        },
        onLeaveBack: () => {
          entranceTl.reverse();
        },
        onLeave: () => {
          // Scroll-Down Exit: carousel wrapper moves downward 60px, fades to 0, scale 0.98
          if (carouselScrollWrapperRef.current) {
            gsap.to(carouselScrollWrapperRef.current, {
              y: 60,
              opacity: 0,
              scale: 0.98,
              duration: 0.65,
              ease: 'power2.inOut',
              overwrite: 'auto',
            });
          }
        },
        onEnterBack: () => {
          // Scroll-Up Re-Entry: re-enter smoothly from below without resetting active testimonial
          if (carouselScrollWrapperRef.current) {
            gsap.killTweensOf(carouselScrollWrapperRef.current);
          }
          entranceTl.restart();
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 sm:py-28 lg:py-32 w-full bg-gradient-to-b from-[#0A0F2C] via-[#040614] to-[#000000] overflow-hidden select-none"
      aria-label="Client Testimonials Section"
    >
      {/* 1. Faint Grid-Line Pattern Background with Radial Vignette Fade */}
      <div
        className="absolute inset-0 bg-testimonials-grid opacity-60 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 35%, transparent 100%)',
        }}
      />

      {/* 2. Top Section Header: Badge + Centered Heading + Subheading */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-16 lg:mb-20">
        {/* Subtle Section Label */}
        <div
          ref={labelRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3FFF]/10 border border-[#1E3FFF]/30 text-[#4757fe] text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 sm:mb-4 will-change-transform"
        >
          <span>/ Client Feedback</span>
        </div>

        {/* Centered Heading with Word-by-Word Overflow Mask Reveal */}
        <h2
          ref={headingRef}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-center"
        >
          {headingWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block overflow-hidden py-0.5 mr-[0.28em] last:mr-0 align-top"
            >
              <span className="testimonial-word-inner inline-block will-change-transform bg-gradient-to-r from-white via-sky-100 to-[#9db2ff] bg-clip-text text-transparent">
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Centered Subheading in Muted Gray-Blue */}
        <p
          ref={descRef}
          className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-[#94a3b8] font-normal max-w-xl mx-auto leading-relaxed will-change-transform"
        >
          Real words from founders, creative directors, and teams I've had the privilege of collaborating with.
        </p>
      </div>

      {/* 3. Separate Outer Animation Wrapper Around Existing Carousel */}
      <div
        ref={carouselScrollWrapperRef}
        className="carousel-scroll-wrapper relative w-full will-change-transform"
      >
        {/* Coverflow Drag Carousel Stage */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Testimonials coverflow carousel"
          className={`relative w-full max-w-7xl mx-auto h-[460px] xs:h-[440px] sm:h-[420px] flex items-center justify-center touch-pan-y outline-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Soft Ambient Electric Blue Glow Behind Active Center Card */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[460px] rounded-full pointer-events-none -z-10 animate-testimonial-glow"
            style={{
              background: 'radial-gradient(circle, rgba(30, 63, 255, 0.45) 0%, rgba(71, 87, 254, 0.22) 42%, rgba(0, 0, 0, 0) 72%)',
            }}
          />

          {/* Secondary subtle high-frequency core pulse */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full pointer-events-none -z-10 blur-[80px]"
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(30, 63, 255, 0.15) 50%, transparent 75%)',
            }}
          />

          {/* Carousel Cards Track */}
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonialsData.map((item, idx) => {
              // Calculate shortest relative circular distance
              let relDist = (idx - continuousOffset) % totalCards;
              if (relDist > totalCards / 2) relDist -= totalCards;
              else if (relDist < -totalCards / 2) relDist += totalCards;

              const absDist = Math.abs(relDist);
              const isCenter = absDist < 0.45;

              // Compute continuous coverflow transforms
              const translateX = relDist * cardSpacing;

              // Scale: 1.05 at center, ~0.89 at ±1, ~0.76 at ±2, fading outward
              const scale = Math.max(0.70, 1.05 - absDist * 0.14);

              // Opacity: 1 at center, ~0.70 at ±1, ~0.42 at ±2, fading further at edges
              const opacity = Math.max(0, 1 - absDist * 0.28);

              // Brightness & Saturation filter
              const brightness = Math.max(0.60, 1 - absDist * 0.20);
              const saturation = Math.max(0.65, 1 - absDist * 0.18);

              // Z-Index layering (center card on top)
              const zIndex = Math.round(30 - absDist * 10);

              // Active and neighbor cards are interactive
              const isInteractive = absDist <= 2.4;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    // If clicking a side card without dragging, animate it to center
                    if (!isDragging && absDist >= 0.45) {
                      navigateToIndex(idx);
                    }
                  }}
                  className={`absolute w-[86vw] max-w-[320px] sm:max-w-[360px] md:max-w-[390px] transition-shadow duration-300 ${
                    isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
                    opacity,
                    filter: `brightness(${brightness}) saturate(${saturation})`,
                    zIndex,
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  {/* Glassmorphic Card Container */}
                  <div
                    className={`relative p-5 xs:p-6 sm:p-7 md:p-8 rounded-[20px] backdrop-blur-xl transition-all duration-300 ${
                      isCenter
                        ? 'bg-gradient-to-b from-[#111942]/90 to-[#070b22]/95 border-2 border-blue-400/60 shadow-[0_10px_45px_-5px_rgba(30,63,255,0.42)] ring-1 ring-blue-400/40'
                        : 'bg-gradient-to-b from-[#0e1433]/80 to-[#07091a]/85 border border-blue-500/20 shadow-xl'
                    }`}
                  >
                    {/* Watermark Quote Icon in Top-Right Corner */}
                    <div className="absolute top-4 right-5 text-blue-400/10 pointer-events-none">
                      <Quote className="w-14 h-14 -rotate-12" />
                    </div>

                    {/* Card Content Top Bar: Profile Photo, Name, Role */}
                    <div className="flex items-center gap-3.5 mb-5 relative z-10">
                      {/* Circular Profile Avatar */}
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 ${
                          isCenter
                            ? 'ring-2 ring-blue-400 shadow-md shadow-blue-500/30'
                            : 'ring-1 ring-blue-500/30 opacity-90'
                        }`}
                      >
                        <img
                          src={item.avatar}
                          alt={`${item.name} profile`}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>

                      {/* Author Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-white text-base sm:text-lg tracking-tight truncate">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#8ca3cf] font-medium leading-tight truncate">
                          {item.role}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-400 truncate mt-0.5">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* 5-Star Rating Row + Category Badge */}
                    <div className="flex items-center justify-between mb-4 relative z-10 pt-1 border-t border-blue-500/10">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating)].map((_, starIdx) => (
                          <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#1E3FFF]/15 border border-[#1E3FFF]/30 text-blue-300">
                        {item.tag}
                      </span>
                    </div>

                    {/* Testimonial Quote Body */}
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal relative z-10 italic">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Controls: Arrows + Indicator Dots for Accessibility */}
      <div
        ref={navControlsRef}
        className="relative z-10 flex items-center justify-center mt-6 sm:mt-10 px-4 will-change-transform"
      >
        {/* Subtle Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateBy(-1)}
            aria-label="Previous testimonial"
            className="nav-control-item p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white transition-all duration-200 cursor-pointer active:scale-90 shadow-md shadow-black/40 will-change-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="nav-control-item flex items-center gap-2 px-3 py-2 rounded-full bg-[#080d24]/60 border border-blue-500/20 backdrop-blur-md will-change-transform">
            {testimonialsData.map((t, dotIdx) => {
              const currentNorm = ((Math.round(continuousOffset) % totalCards) + totalCards) % totalCards;
              const isActive = currentNorm === dotIdx;
              return (
                <button
                  key={t.id}
                  onClick={() => navigateToIndex(dotIdx)}
                  aria-label={`Go to testimonial ${dotIdx + 1} by ${t.name}`}
                  className={`transition-all duration-300 cursor-pointer rounded-full ${
                    isActive
                      ? 'w-7 h-2 bg-[#1E3FFF] shadow-[0_0_12px_#1E3FFF]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => navigateBy(1)}
            aria-label="Next testimonial"
            className="nav-control-item p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white transition-all duration-200 cursor-pointer active:scale-90 shadow-md shadow-black/40 will-change-transform"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
