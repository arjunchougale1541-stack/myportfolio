import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Play, Film } from 'lucide-react';
import { WorkProjectItem } from '../data/worksData';

interface WorksCoverflowCarouselProps {
  items: WorkProjectItem[];
  onSelectProject: (work: WorkProjectItem) => void;
  accentColor?: string;
  isReel?: boolean;
}

export const WorksCoverflowCarousel: React.FC<WorksCoverflowCarouselProps> = ({
  items,
  onSelectProject,
  isReel = false,
}) => {
  const [continuousOffset, setContinuousOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [cardSpacing, setCardSpacing] = useState<number>(310);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; time: number; offset: number } | null>(null);
  const velocityTrackerRef = useRef<{ x: number; time: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalCards = items.length;

  // Responsive card spacing calculation (optimized for both standard cards and vertical 9:16 reel cards)
  const updateSpacing = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (isReel) {
      if (width < 640) {
        setCardSpacing(Math.min(width * 0.58, 200)); // Mobile: centered 9:16 reel + peeks
      } else if (width < 1024) {
        setCardSpacing(195); // Tablet: 3 visible reel cards
      } else if (width < 1440) {
        setCardSpacing(230); // Desktop: 5 visible reel cards
      } else {
        setCardSpacing(255); // Large desktop: 5 visible reel cards
      }
    } else {
      if (width < 640) {
        setCardSpacing(Math.min(width * 0.78, 270)); // Mobile: 1 center + partial peeks
      } else if (width < 1024) {
        setCardSpacing(230); // Tablet: 3 visible cards
      } else if (width < 1440) {
        setCardSpacing(285); // Desktop: 5 visible cards
      } else {
        setCardSpacing(320); // Large desktop: 5 visible cards
      }
    }
  }, [isReel]);

  useEffect(() => {
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, [updateSpacing]);

  // Smooth cubic ease-out physics animation
  const animateToSlot = useCallback((targetSlot: number, duration = 460) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startOffset = continuousOffset;
    const delta = targetSlot - startOffset;
    const startTime = performance.now();

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
        const normalized = ((Math.round(targetSlot) % totalCards) + totalCards) % totalCards;
        setContinuousOffset(normalized);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [continuousOffset, totalCards]);

  const navigateBy = useCallback((delta: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const target = Math.round(continuousOffset) + delta;
    animateToSlot(target, 450);
  }, [continuousOffset, animateToSlot]);

  const navigateToIndex = useCallback((targetIndex: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const currentNorm = ((Math.round(continuousOffset) % totalCards) + totalCards) % totalCards;
    let diff = targetIndex - currentNorm;
    if (diff > totalCards / 2) diff -= totalCards;
    else if (diff < -totalCards / 2) diff += totalCards;
    const target = Math.round(continuousOffset) + diff;
    animateToSlot(target, 480);
  }, [continuousOffset, totalCards, animateToSlot]);

  // Subtle autoplay (pauses on interaction)
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
    }, 7500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, isDragging, navigateBy]);

  const hasMovedRef = useRef<boolean>(false);

  // Drag Gesture Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    hasMovedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      time: performance.now(),
      offset: continuousOffset,
    };
    velocityTrackerRef.current = [{ x: e.clientX, time: performance.now() }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    const currentX = e.clientX;
    const currentTime = performance.now();
    const deltaX = currentX - dragStartRef.current.x;

    if (!hasMovedRef.current) {
      if (Math.abs(deltaX) > 6) {
        hasMovedRef.current = true;
        setIsDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Safe catch
        }
      } else {
        return;
      }
    }

    const slotDelta = -deltaX / cardSpacing;
    setContinuousOffset(dragStartRef.current.offset + slotDelta);

    const history = velocityTrackerRef.current;
    history.push({ x: currentX, time: currentTime });
    if (history.length > 5) history.shift();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
      setIsDragging(false);
    }

    const startX = dragStartRef.current.x;
    const totalDeltaX = e.clientX - startX;
    const history = velocityTrackerRef.current;

    let velocity = 0;
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.time - first.time;
      if (dt > 0) {
        velocity = (last.x - first.x) / dt;
      }
    }

    dragStartRef.current = null;

    if (Math.abs(totalDeltaX) < 8) {
      const targetSlot = Math.round(continuousOffset);
      animateToSlot(targetSlot, 350);
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 60);
      return;
    }

    let momentumStep = 0;
    if (Math.abs(velocity) > 0.35) {
      momentumStep = velocity < 0 ? 1 : -1;
      if (Math.abs(velocity) > 1.2) {
        momentumStep = velocity < 0 ? 2 : -2;
      }
    }

    const targetSlot = Math.round(continuousOffset + momentumStep);
    animateToSlot(targetSlot, 480);
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 60);
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

  const activeNormIndex = ((Math.round(continuousOffset) % totalCards) + totalCards) % totalCards;

  return (
    <div className="relative z-10 w-full select-none overflow-visible">
      {/* Coverflow Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full ${
          isReel
            ? 'h-[440px] xs:h-[480px] sm:h-[520px] md:h-[545px]'
            : 'h-[440px] xs:h-[470px] sm:h-[490px] md:h-[515px]'
        } flex items-center justify-center touch-pan-y outline-none overflow-visible ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Soft Ambient Electric Blue Glow Behind Active Center Card */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[450px] rounded-full pointer-events-none -z-10 animate-testimonial-glow"
          style={{
            background: isReel
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.40) 0%, rgba(168, 85, 247, 0.22) 42%, rgba(0, 0, 0, 0) 72%)'
              : 'radial-gradient(circle, rgba(30, 63, 255, 0.42) 0%, rgba(71, 87, 254, 0.20) 42%, rgba(0, 0, 0, 0) 72%)',
          }}
        />

        {/* Secondary subtle high-frequency core pulse */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full pointer-events-none -z-10 blur-[75px]"
          style={{
            background: isReel
              ? 'radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(30, 63, 255, 0.12) 50%, transparent 75%)',
          }}
        />

        {/* Cards Track */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          {items.map((project, idx) => {
            let relDist = (idx - continuousOffset) % totalCards;
            if (relDist > totalCards / 2) relDist -= totalCards;
            else if (relDist < -totalCards / 2) relDist += totalCards;

            const absDist = Math.abs(relDist);
            const isCenter = absDist < 0.45;

            const translateX = relDist * cardSpacing;

            // Scale: 1.05 at center, ~0.89 at ±1, ~0.76 at ±2, fading outward
            const scale = Math.max(0.70, 1.05 - absDist * 0.14);

            // Opacity: 1 at center, ~0.68 at ±1, ~0.40 at ±2, fading further at edges
            const opacity = Math.max(0, 1 - absDist * 0.28);

            // Brightness & Saturation filter
            const brightness = Math.max(0.58, 1 - absDist * 0.20);
            const saturation = Math.max(0.65, 1 - absDist * 0.18);

            // Z-Index layering (strictly below sticky category nav bar's z-30)
            const zIndex = Math.max(1, Math.round(20 - absDist * 5));
            const isInteractive = absDist <= 2.4;

            return (
              <div
                key={project.id}
                onClick={(e) => {
                  if (hasMovedRef.current) return;
                  if (absDist >= 0.45) {
                    e.stopPropagation();
                    navigateToIndex(idx);
                  } else {
                    onSelectProject(project);
                  }
                }}
                className={`absolute ${
                  isReel
                    ? 'w-[66vw] xs:w-[58vw] max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] md:max-w-[275px]'
                    : 'w-[86vw] max-w-[320px] sm:max-w-[360px] md:max-w-[390px]'
                } transition-shadow duration-300 ${
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
                {/* 1. REEL FORMAT CARD (9:16 Vertical Phone Aspect Ratio) */}
                {isReel ? (
                  <div
                    className={`group relative w-full aspect-[9/16] rounded-2xl sm:rounded-[22px] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isCenter
                        ? 'bg-gradient-to-b from-[#18112c] to-[#0a0718] border-2 border-pink-500/80 shadow-[0_12px_45px_-5px_rgba(236,72,153,0.45)] ring-1 ring-pink-400/40'
                        : 'bg-[#0e0d16]/95 border border-indigo-900/40 shadow-xl hover:border-pink-500/50'
                    }`}
                  >
                    {/* Full-bleed 9:16 Reel Cover Image */}
                    <img
                      src={project.coverImage || project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      style={{ objectPosition: project.objectPosition || 'center' }}
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Cine Gradient Overlays for optimal text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/95 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent opacity-95 pointer-events-none" />

                    {/* Top Header: Floating Reel Badge + 9:16 Aspect Pill */}
                    <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-black/65 backdrop-blur-md border border-pink-500/40 text-pink-300 shadow-md">
                        <Film className="w-3 h-3 text-pink-400" />
                        <span>{project.badge || 'REEL'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-black/60 backdrop-blur-md border border-white/15 text-gray-300">
                        9:16
                      </span>
                    </div>

                    {/* Center Play Icon Glow Button */}
                    <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                      <div
                        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-2xl ${
                          isCenter
                            ? 'bg-pink-600/30 border-2 border-pink-400/80 text-white group-hover:scale-115 group-hover:bg-pink-600 shadow-[0_0_25px_rgba(236,72,153,0.6)]'
                            : 'bg-black/55 border border-white/30 text-white/80 group-hover:scale-110'
                        }`}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Info & Action Overlay */}
                    <div className="relative z-10 p-3.5 sm:p-4.5 space-y-1.5 sm:space-y-2">
                      {/* Category & Client */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-pink-300 font-semibold tracking-wider uppercase">
                        <span className="truncate max-w-[130px]">{project.client || 'Featured Reel'}</span>
                        <span className="text-gray-400 font-mono text-[9px] sm:text-[10px]">{project.year || '2024'}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white line-clamp-2 leading-snug group-hover:text-pink-200 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description snippet */}
                      <p className="text-[10px] sm:text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Action Pill: VIEW REEL DETAILS */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-lg shadow-pink-950/60 active:scale-95 transition-all cursor-pointer"
                        >
                          <span>VIEW REEL DETAILS</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-pink-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 2. STANDARD FORMAT CARD (4:3 Media Aspect Ratio) */
                  <div
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                      isCenter
                        ? 'bg-gradient-to-b from-[#121124] to-[#0a0914] border-2 border-blue-400/60 shadow-[0_12px_45px_-5px_rgba(30,63,255,0.42)] ring-1 ring-blue-400/30'
                        : 'bg-[#0e0d16]/90 border border-indigo-900/35 shadow-xl hover:border-indigo-500/40'
                    }`}
                  >
                    {/* Media Container with 4:3 Aspect Ratio */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-950">
                      <img
                        src={project.coverImage || project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                        style={{ objectPosition: project.objectPosition || 'center' }}
                        loading="lazy"
                        draggable={false}
                      />

                      {/* Dark Vignette / Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d16] via-transparent to-black/30 opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

                      {/* Top Floating Category Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${
                          project.badge === 'SCROLLABLE WEB UI'
                            ? 'bg-pink-950/80 border-pink-500/50 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.35)]'
                            : 'bg-black/70 border-white/10 text-indigo-300'
                        }`}>
                          {project.badge || project.category}
                        </span>
                      </div>

                      {/* Top-Right Quick Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md cursor-pointer ${
                          project.badge === 'SCROLLABLE WEB UI'
                            ? 'bg-pink-600 hover:bg-pink-500 opacity-100 shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                            : isCenter
                            ? 'opacity-100 bg-[#4d5eff] hover:bg-[#3d4ff5] border border-indigo-400/50'
                            : 'opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-[#4d5eff] backdrop-blur-md border border-white/10'
                        }`}
                        title={project.badge === 'SCROLLABLE WEB UI' ? 'Open Scrollable UI/UX Preview' : 'View Project Case Study'}
                        aria-label="View Project"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {/* Bottom floating hint for scrollable project */}
                      {project.badge === 'SCROLLABLE WEB UI' && (
                        <div className="absolute bottom-3 right-3 z-10">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-pink-950/90 backdrop-blur-md border border-pink-400/60 text-pink-200 shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                            SCROLL VIEW
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Meta Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#0e0d16] to-[#090812]">
                      <div>
                        {/* Category Tag */}
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          <span>{project.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Bottom Card Footer */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span className="truncate max-w-[160px] font-medium text-slate-300">
                          {project.client || 'Creative Showcase'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className={`flex items-center gap-1 font-semibold text-[11px] tracking-wider uppercase transition-colors cursor-pointer ${
                            project.badge === 'SCROLLABLE WEB UI'
                              ? 'text-pink-400 hover:text-pink-300'
                              : 'text-indigo-400 hover:text-indigo-300'
                          }`}
                        >
                          <span>{project.badge === 'SCROLLABLE WEB UI' ? 'SCROLL WEBPAGE' : 'VIEW CASE'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls: Arrows + Indicator Dots */}
      <div className="relative z-30 flex items-center justify-center gap-3.5 mt-5 sm:mt-7">
        <button
          onClick={() => navigateBy(-1)}
          aria-label="Previous project"
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-blue-500/25 hover:border-blue-400 text-blue-200 hover:text-white transition-all duration-200 cursor-pointer active:scale-90 shadow-md shadow-black/40"
        >
          <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080d24]/80 border border-blue-500/20 backdrop-blur-md shadow-md">
          {items.map((p, dotIdx) => {
            const isActive = activeNormIndex === dotIdx;
            return (
              <button
                key={p.id}
                onClick={() => navigateToIndex(dotIdx)}
                aria-label={`Go to ${p.title}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? 'w-6 sm:w-7 h-2 bg-[#1E3FFF] shadow-[0_0_10px_#1E3FFF]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigateBy(1)}
          aria-label="Next project"
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-blue-500/25 hover:border-blue-400 text-blue-200 hover:text-white transition-all duration-200 cursor-pointer active:scale-90 shadow-md shadow-black/40"
        >
          <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </div>
  );
};
