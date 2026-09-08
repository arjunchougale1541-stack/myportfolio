import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import devsthanCoverImg from '../../assets/images/devsthan_samiti_cover.jpg';
import devsthanDesktopCoverImg from '../../assets/images/devsthan_samiti_desktop_cover.png';

interface DevsthanMockupProps {
  onExplore?: () => void;
}

export const DevsthanMockup: React.FC<DevsthanMockupProps> = ({ onExplore }) => {
  return (
    <div 
      onClick={onExplore}
      className="group relative w-full h-full min-h-[260px] sm:min-h-[460px] md:min-h-[500px] bg-[#1a0f0b] rounded-none sm:rounded-lg overflow-hidden border border-amber-900/60 shadow-2xl transition-all duration-500 hover:border-amber-500/80 cursor-pointer select-none flex flex-col justify-between"
    >
      {/* Mobile / Tablet Cover Image (screens smaller than lg) */}
      <img
        src={devsthanCoverImg}
        alt="Devsthan Vyavasthapan Samiti Brand Identity Project Cover"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Desktop Cover Image (lg screens and above) */}
      <img
        src={devsthanDesktopCoverImg}
        alt="Devsthan Vyavasthapan Samiti Brand Identity Project Cover (Desktop)"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Interactive Arrow Button on Hover */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex items-start justify-end">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 bg-amber-500 text-black p-2 rounded-full shadow-lg font-bold">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

