import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Lock,
  Play,
  Pause,
  ArrowUp,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  Sparkles,
  ChevronDown,
  Eye,
  Check,
  MousePointer
} from 'lucide-react';
import candyCloudUiuxImg from '../../assets/images/candy_cloud_uiux_full.png';

interface CandyCloudUiUxMockupProps {
  onExplore?: () => void;
  className?: string;
}

export const CandyCloudUiUxMockup: React.FC<CandyCloudUiUxMockupProps> = ({
  onExplore,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollAnimRef = useRef<number | null>(null);

  // Track scroll progress for the embedded frame
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 0) {
      const progress = (el.scrollTop / maxScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }

    if (el.scrollTop > 40 && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  // Scroll to Top
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (fullscreenContainerRef.current) {
      fullscreenContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-scroll loop
  useEffect(() => {
    if (!isAutoScrolling) {
      if (autoScrollAnimRef.current) {
        cancelAnimationFrame(autoScrollAnimRef.current);
        autoScrollAnimRef.current = null;
      }
      return;
    }

    const targetEl = isFullscreen
      ? fullscreenContainerRef.current
      : containerRef.current;

    if (!targetEl) return;

    let lastTimestamp = performance.now();
    const speed = 70; // px per second

    const step = (timestamp: number) => {
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (targetEl) {
        const maxScroll = targetEl.scrollHeight - targetEl.clientHeight;
        if (targetEl.scrollTop >= maxScroll - 2) {
          // Reached bottom - pause briefly and loop back
          setIsAutoScrolling(false);
          return;
        } else {
          targetEl.scrollTop += speed * elapsed;
        }
      }

      autoScrollAnimRef.current = requestAnimationFrame(step);
    };

    autoScrollAnimRef.current = requestAnimationFrame(step);

    return () => {
      if (autoScrollAnimRef.current) {
        cancelAnimationFrame(autoScrollAnimRef.current);
      }
    };
  }, [isAutoScrolling, isFullscreen]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const copyUrl = () => {
    navigator.clipboard.writeText('https://www.candycloud.com');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <>
      {/* Embedded Browser Mockup Container */}
      <div
        className={`relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-pink-500/30 bg-[#0e0c18] shadow-2xl flex flex-col ${className}`}
      >
        {/* Browser Chrome Top Header */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-2.5 bg-gradient-to-r from-[#17142b] via-[#141224] to-[#17142b] border-b border-pink-500/20 select-none">
          {/* Left: macOS Window Traffic Dots & Nav Arrows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span
                onClick={() => {
                  if (onExplore) onExplore();
                }}
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity"
                title="Close"
              />
              <span
                onClick={() => scrollToTop()}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80 transition-opacity"
                title="Scroll to Top"
              />
              <span
                onClick={() => setIsFullscreen(true)}
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition-opacity"
                title="Fullscreen Scroll Mode"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1 text-slate-500 text-xs">
              <button
                onClick={scrollToTop}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                title="Reload / Top"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center: Realistic Web URL Address Bar */}
          <div
            onClick={copyUrl}
            className="flex-1 max-w-xs sm:max-w-md mx-auto flex items-center justify-between gap-2 px-3 py-1 rounded-full bg-[#0a0814]/90 border border-pink-500/20 text-gray-300 text-[11px] sm:text-xs font-mono shadow-inner cursor-pointer hover:border-pink-400/50 transition-colors"
            title="Click to copy link"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Lock className="w-3 h-3 text-pink-400 flex-shrink-0" />
              <span className="text-pink-300/80">https://</span>
              <span className="text-white font-semibold truncate">www.candycloud.com</span>
            </div>
            <span className="text-[10px] text-pink-400 font-mono hidden md:inline px-1.5 py-0.2 rounded bg-pink-950/60 border border-pink-500/30">
              {copiedUrl ? 'COPIED!' : 'LIVE D2C'}
            </span>
          </div>

          {/* Right: Quick Interactive Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Auto-Scroll Toggle */}
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isAutoScrolling
                  ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] animate-pulse'
                  : 'bg-white/5 hover:bg-pink-900/30 text-pink-200 border border-pink-500/30'
              }`}
              title="Toggle continuous smooth auto-scrolling"
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3 h-3 text-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-pink-400" />
                  <span>Auto-Scroll</span>
                </>
              )}
            </button>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-1 sm:px-2 sm:py-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-[10px] sm:text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Scroll to top of webpage"
            >
              <ArrowUp className="w-3 h-3 text-pink-400" />
              <span className="hidden sm:inline">Top</span>
            </button>

            {/* Expand Fullscreen */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              title="Open full-page scroll viewer"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Full View</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="relative w-full h-[3px] bg-pink-950/60 z-20">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-400 to-pink-300 transition-all duration-100 ease-out shadow-[0_0_8px_rgba(236,72,153,0.8)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Main Scrollable Viewport */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative w-full h-[460px] sm:h-[580px] md:h-[640px] overflow-y-auto overflow-x-hidden bg-[#faf5f8] select-text scroll-smooth custom-pink-scrollbar"
        >
          {/* Candy Cloud High-Resolution Full Webpage Image */}
          <img
            src={candyCloudUiuxImg}
            alt="Candy Cloud D2C Store Full Page UI/UX Design"
            className="w-full h-auto block select-none cursor-pointer"
            onClick={() => setIsFullscreen(true)}
            title="Click to view in fullscreen scroll mode"
          />

          {/* Floating 'Scroll to explore' guide pill (fades away once scrolled) */}
          {!hasScrolled && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-pink-400/50 text-white text-xs font-semibold shadow-2xl animate-bounce">
              <MousePointer className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Scroll down to explore full store UI</span>
              <ChevronDown className="w-3.5 h-3.5 text-pink-300" />
            </div>
          )}

          {/* Quick Click-to-Enlarge Overlay Badge */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono border border-pink-500/40 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-pink-400" />
              <span>Click for Fullscreen Scroll</span>
            </span>
          </div>
        </div>

        {/* Browser Mockup Footer Info Bar */}
        <div className="relative z-20 px-4 py-2 bg-[#121022] border-t border-pink-500/20 flex items-center justify-between text-[11px] text-gray-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Candy Cloud D2C Storefront</span>
            <span className="hidden sm:inline text-pink-300/80">• Responsive E-Commerce Architecture</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] text-pink-300">
            <span>Scroll: {Math.round(scrollProgress)}%</span>
            <button
              onClick={() => setIsFullscreen(true)}
              className="text-pink-400 hover:text-pink-200 transition-colors cursor-pointer flex items-center gap-1 underline underline-offset-2"
            >
              <span>Inspect Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN SCROLL MODAL (Edge-to-edge full window scroll view) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
          {/* Top Bar with Controls */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0d0b1a] border-b border-pink-500/30 text-white z-30 select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-600/30 border border-pink-500/40 flex items-center justify-center text-pink-300 font-bold text-xs">
                CC
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  CANDY CLOUD — FULL WEBPAGE UI/UX DESIGN
                </h3>
                <p className="text-[11px] text-pink-300 font-mono hidden sm:block">
                  Live Interactive Scroll View • High-Fidelity Prototype
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Auto Scroll Toggle */}
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isAutoScrolling
                    ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.7)] animate-pulse'
                    : 'bg-white/10 hover:bg-pink-900/40 text-pink-200 border border-pink-500/30'
                }`}
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-white" />
                    <span>Pause Scroll</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-pink-400" />
                    <span>Auto-Scroll</span>
                  </>
                )}
              </button>

              {/* Scroll To Top */}
              <button
                onClick={scrollToTop}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                title="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden sm:inline">Top</span>
              </button>

              {/* Close Fullscreen */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Exit Fullscreen (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Scroll Progress Bar */}
          <div className="w-full h-1 bg-pink-950/80 z-30">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-400 to-amber-300 transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Fullscreen Scrollable Content */}
          <div
            ref={fullscreenContainerRef}
            onScroll={() => {
              const el = fullscreenContainerRef.current;
              if (!el) return;
              const maxScroll = el.scrollHeight - el.clientHeight;
              if (maxScroll > 0) {
                setScrollProgress((el.scrollTop / maxScroll) * 100);
              }
            }}
            className="flex-1 w-full overflow-y-auto overflow-x-hidden flex justify-center bg-[#07060f] p-2 sm:p-6 md:p-8 custom-pink-scrollbar"
          >
            <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-pink-500/20 bg-white">
              <img
                src={candyCloudUiuxImg}
                alt="Candy Cloud Full Website UI/UX Design"
                className="w-full h-auto block select-none"
              />
            </div>
          </div>

          {/* Fullscreen Floating Bottom Bar */}
          <div className="py-2.5 px-4 bg-[#0d0b1a]/90 backdrop-blur border-t border-pink-500/20 flex items-center justify-between text-xs text-gray-400">
            <span className="text-pink-300 font-mono text-[11px]">
              Use mouse wheel, trackpad, or Auto-Scroll to browse the full page
            </span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-4 py-1 rounded bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Exit Full View
            </button>
          </div>
        </div>
      )}
    </>
  );
};
