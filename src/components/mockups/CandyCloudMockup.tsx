

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import candyCloudCoverImg from '../../assets/images/candy_cloud_desktop_cover.png';

interface CandyCloudMockupProps {
  onExplore?: () => void;
}

export const CandyCloudMockup: React.FC<CandyCloudMockupProps> = ({ onExplore }) => {
  return (
    <div
      onClick={onExplore}
      className="group relative w-full h-full min-h-[260px] sm:min-h-[460px] md:min-h-[500px] bg-[#1e1b4b] rounded-none sm:rounded-lg overflow-hidden border border-pink-200/40 shadow-2xl transition-all duration-500 hover:border-pink-400/80 cursor-pointer select-none flex flex-col justify-between"
    >
      {/* Cover Image with smooth scale animation on hover */}
      <img
        src={candyCloudCoverImg}
        alt="Candy Cloud Brand Identity Project Cover"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Interactive Arrow Button on Hover */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex items-start justify-end">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 bg-pink-600 text-white p-2 rounded-full shadow-lg">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

add this post in