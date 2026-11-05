import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import axialCoverImg from '../../assets/images/axial_graphic_cover.webp';

interface AxialMockupProps {
  onExplore?: () => void;
}

export const AxialMockup: React.FC<AxialMockupProps> = ({ onExplore }) => {
  return (
    <div 
      onClick={onExplore}
      className="group relative w-full h-full min-h-[260px] sm:min-h-[460px] md:min-h-[500px] bg-[#0d0c24] rounded-none sm:rounded-lg overflow-hidden border border-indigo-950/60 shadow-2xl transition-all duration-500 hover:border-indigo-500/50 cursor-pointer select-none flex flex-col justify-between"
    >
      {/* Main Project Card Thumbnail */}
      <img
        src={axialCoverImg}
        alt="Axial Graphic Brand Identity Project Cover"
        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Interactive Arrow Button on Hover */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex items-start justify-end">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 bg-[#4757fe] text-white p-2 rounded-full shadow-lg">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

