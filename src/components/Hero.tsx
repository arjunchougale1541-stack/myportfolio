import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCollaborate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCollaborate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07070d]">
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

        {/* Elegant overlay for text legibility & seamless fade to next section */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07070d]/80 via-[#07070d]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07070d] via-[#07070d]/70 to-transparent" />
      </div>

      {/* Main Content: Vertically Centered */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center flex flex-col items-center justify-center py-20">
        {/* Main Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.08] max-w-6xl">
          <span className="text-[#4757fe]">Creative</span> ideas.
          <br />
          meaningful <span className="text-[#4757fe]">impact.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl font-normal leading-relaxed px-2 sm:px-0">
          I turn ideas into bold visual experiences that connect brands with their audience and make them stand out.
        </p>

        {/* Action Row: CTA Button */}
        <div className="mt-5 sm:mt-8 md:mt-10 flex items-center justify-center">
          {/* Primary CTA Button */}
          <button
            onClick={onCollaborate}
            className="group relative inline-flex items-center justify-center p-[2px] sm:p-[2.5px] rounded-full transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/70 bg-gradient-to-b from-blue-300/40 via-blue-500/20 to-indigo-600/45"
            aria-label="Let's Create Together"
          >
            {/* Inner Pill Body */}
            <span className="relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#4d5eff] via-[#3848ee] to-[#2535d4] text-white font-bold text-xs sm:text-base tracking-wider uppercase shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:from-[#5868ff] group-hover:via-[#4252f5] group-hover:to-[#2e3edd]">
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                LET'S CREATE TOGETHER
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-100 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
