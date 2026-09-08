import React, { useState } from 'react';
import { servicesData } from '../data/projectsData';
import { Sparkles, Video, PenTool, Layers } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'graphic-design':
        return <PenTool className="w-5 h-5" />;
      case 'video-editor':
        return <Video className="w-5 h-5" />;
      case 'content-creation':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-14 sm:py-24 lg:py-28 w-full px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* Top Header: Statement Left + Paragraph Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start mb-10 sm:mb-16">
        {/* Left Column: Bold Indigo Statement */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#4757fe] leading-[1.08]">
            I create visual solutions that bring ideas to life.
          </h2>
        </div>

        {/* Right Column: / My Services + Description */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-base font-bold text-[#4757fe] tracking-wide">
              / My Services
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-normal leading-relaxed">
            My services go beyond just design. I create meaningful visual experiences through graphic design, video editing, and digital content creation—helping ideas communicate clearly, connect with audiences, and stand out.
          </p>
        </div>
      </div>

      {/* 3 Services Cards Grid - Full Width Rectangular Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        {servicesData.map((service, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-full p-6 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-b from-[#100f24] to-[#0a0a14] border transition-all duration-300 ease-out space-y-5 sm:space-y-6 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-2 hover:scale-[1.01] ${
                isHovered
                  ? 'border-indigo-500/90 shadow-2xl shadow-indigo-600/30 ring-2 ring-indigo-500/40 from-[#141230] to-[#0c0b1a]'
                  : 'border-indigo-950/80 hover:border-indigo-500/70 hover:shadow-2xl hover:shadow-indigo-600/25'
              }`}
            >
              {/* Header: Title + /01, /02, /03 */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600/30 group-hover:border-indigo-400/60 group-hover:text-indigo-300 transition-all duration-200">
                      {getServiceIcon(service.id)}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-[#4757fe] group-hover:text-indigo-300 tracking-tight uppercase transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <span className="text-lg sm:text-xl font-bold font-mono text-gray-500 group-hover:text-indigo-400 transition-colors">
                    /{service.number}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Skills Highlights */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-gray-400 group-hover:text-indigo-300 uppercase tracking-wider transition-colors">
                    Core Capabilities:
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-300">
                    {service.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 group-hover:bg-indigo-400 transition-colors" />
                        <span className="leading-snug">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Software Badges */}
              <div className="pt-4 border-t border-indigo-950/80 group-hover:border-indigo-900/80 transition-colors">
                <div className="flex flex-wrap items-center gap-2">
                  {service.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wider bg-[#1c194c] text-indigo-200 border border-indigo-500/30 uppercase group-hover:bg-indigo-900/60 group-hover:border-indigo-400/60 group-hover:text-white transition-all shadow-xs"
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
