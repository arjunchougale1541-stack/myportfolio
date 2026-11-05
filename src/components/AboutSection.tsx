import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 scroll-mt-20">
      <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
        {/* Left Column: Massive Statement in Rich Indigo / Purple */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#4757fe] leading-[1.08]">
            Turning ideas into visuals that create impact.
          </h2>
        </div>

        {/* Right Column: / About me + Paragraph + Social Pills */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-base font-bold text-[#4757fe] tracking-wide">
              / About me
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-normal leading-relaxed">
            “Hi, I'm a Graphic Designer &amp; Video Editor with 1.5 years of experience and 1 year of freelance experience. I create engaging designs, videos, and visual content that help brands communicate, connect, and stand out.”
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 pt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/axial_graphic?igsi=dGF6M2Nqa2dhNnN3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#4757fe] bg-white/[0.03] hover:bg-[#4757fe]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm group"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* Behance (Bē) */}
            <a
              href="https://www.behance.net/arjunchougale"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 h-12 rounded-full border border-white/20 hover:border-[#4757fe] bg-white/[0.03] hover:bg-[#4757fe]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm group font-extrabold text-sm"
              aria-label="Behance Profile"
            >
              <span className="group-hover:scale-110 transition-transform">Bē</span>
            </a>

            {/* LinkedIn (in) */}
            <a
              href="https://www.linkedin.com/in/arjun-chougale-969a26326"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#4757fe] bg-white/[0.03] hover:bg-[#4757fe]/20 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

