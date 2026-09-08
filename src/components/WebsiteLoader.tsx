import React, { useState, useEffect, useRef } from 'react';

interface WebsiteLoaderProps {
  onComplete: () => void;
}

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  // 4 brand-defining disciplines for Arjun Chougale
  const words = ['Design', 'Create', 'Edit', 'Inspire'];

  useEffect(() => {
    // 1. Prevent scrolling while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Motion preference & total duration (~3.0 seconds total)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 600 : 3000;
    const startTime = performance.now();

    // Smooth subtle acceleration / deceleration curve (ease-in-out cubic)
    const easeProgress = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const normalizedTime = Math.min(elapsed / duration, 1);
      const easedProgress = easeProgress(normalizedTime) * 100;

      const currentVal = Math.min(Math.round(easedProgress), 100);
      setProgress(currentVal);

      // Cycle through 4 words evenly across the 3s duration (~0.75s per word)
      const wordIdx = Math.min(
        Math.floor(normalizedTime * words.length),
        words.length - 1
      );
      setCurrentWordIndex(wordIdx);

      if (normalizedTime < 1) {
        animationFrameRef.current = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setCurrentWordIndex(words.length - 1);

        // On reaching 100%, trigger smooth 0.5s opacity fade-out
        const fadeOutTimer = setTimeout(() => {
          setIsFadingOut(true);

          // Once 500ms fade-out completes, restore overflow & unmount
          const finishTimer = setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            onComplete();
          }, 500);

          return () => clearTimeout(finishTimer);
        }, 120);

        return () => clearTimeout(fadeOutTimer);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateLoader);

    // Fallback safety timeout so preloader never hangs under any circumstance
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setIsFadingOut(true);
      setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        onComplete();
      }, 500);
    }, duration + 1500);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Formatted numeric counter: 3-digit tabular figures (000 → 100)
  const formattedCounter = String(progress).padStart(3, '0');

  return (
    <aside
      role="status"
      aria-label="Website loading animation"
      aria-live="polite"
      aria-busy={!isFadingOut}
      className={`fixed inset-0 z-[99999] w-screen h-screen bg-[#070709] select-none flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden pointer-events-auto transition-opacity ${
        isFadingOut ? 'animate-loader-fade-out pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top-Left: Small uppercase label "PORTFOLIO" with ~3px letter-spacing */}
      <div className="w-full flex items-center justify-between z-10">
        <span
          className="text-[12px] font-semibold text-white/60 uppercase font-sans select-none"
          style={{ letterSpacing: '3px' }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Center: Large italic serif word cycling through brand disciplines with fade + blur/scale */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative flex items-center justify-center w-full px-4">
          {words.map((word, idx) => {
            const isActive = currentWordIndex === idx;
            return (
              <span
                key={word}
                className={`absolute font-editorial italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-normal text-[#E8E8E8] transition-all duration-600 ease-out transform ${
                  isActive
                    ? 'opacity-100 translate-y-0 scale-100 blur-0'
                    : currentWordIndex > idx
                    ? 'opacity-0 -translate-y-4 scale-95 blur-[4px]'
                    : 'opacity-0 translate-y-4 scale-95 blur-[4px]'
                }`}
                style={{
                  textShadow: '0 4px 24px rgba(71, 87, 254, 0.18)',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom-Right: Numeric counter from 000 to 100 in Poppins Medium font */}
      <div className="w-full flex justify-end items-end z-10 pb-3 sm:pb-5">
        <div className="flex flex-col items-end pr-1 sm:pr-2">
          <span
            className="font-poppins font-medium tabular-nums text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-none drop-shadow-sm select-none"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formattedCounter}
          </span>
        </div>
      </div>

      {/* Bottom Edge: 2.5px horizontal progress bar filled in electric blue with subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden z-20">
        <div
          className="h-full bg-[#4757fe] transition-[width] duration-75 ease-linear"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 12px rgba(71, 87, 254, 0.9), 0 0 4px #4757fe',
          }}
        />
      </div>
    </aside>
  );
};
