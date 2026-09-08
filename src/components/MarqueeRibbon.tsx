import React from 'react';

export const MarqueeRibbon: React.FC = () => {
  const topTape = [
    'MARKETING',
    'BRANDING',
    'DESIGNING',
    'DIGITAL MARKETING',
    'CONTENT MAKING',
    'VIDEO EDITING',
    'LOGO DESIGN',
    'MOTION GRAPHICS'
  ];

  const bottomTape = [
    'BRANDING',
    'UI/UX DESIGN',
    'DESIGNING',
    'DIGITAL MARKETING',
    'VIDEO EDITING',
    'DESIGNING',
    'VISUAL IDENTITY',
    'BRAND STRATEGY'
  ];

  return (
    <div className="relative w-full py-6 sm:py-10 overflow-hidden my-4 select-none">
      {/* Top Angled Dark Purple/Indigo Ribbon */}
      <div className="relative transform -rotate-2 scale-105 z-10 shadow-xl overflow-hidden bg-gradient-to-r from-[#1c194c] via-[#241f64] to-[#1a1645] border-y border-indigo-500/20 py-3 sm:py-4">
        <div className="animate-marquee-left flex items-center whitespace-nowrap gap-8 sm:gap-12 text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-indigo-200/90 uppercase font-sans">
          {[...topTape, ...topTape, ...topTape].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400 opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Angled Vibrant Electric Indigo Ribbon Overlapping */}
      <div className="relative transform rotate-1 scale-105 -mt-3.5 z-20 shadow-2xl overflow-hidden bg-gradient-to-r from-[#3b49df] via-[#4f5df7] to-[#343fc7] border-y border-white/20 py-3 sm:py-4">
        <div className="animate-marquee-right flex items-center whitespace-nowrap gap-8 sm:gap-12 text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-white uppercase font-sans drop-shadow-sm">
          {[...bottomTape, ...bottomTape, ...bottomTape].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
