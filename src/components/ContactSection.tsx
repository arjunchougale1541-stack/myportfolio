import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import profileImg from '../assets/images/arjun_profile.jpg';

interface ContactSectionProps {
  onCollaborate: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCollaborate }) => {
  const socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/axial_graphic?igsi=dGF6M2Nqa2dhNnN3' },
    { name: 'Behance', url: 'https://www.behance.net/arjunchougale' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/arjun-chougale-969a26326' },
  ];

  return (
    <section id="contact" className="relative py-14 sm:py-24 lg:py-28 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      {/* Top Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
        {/* Left Column: Huge Indigo Statement */}
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#4757fe] leading-[1.08]">
            Let's create something that stands out.
          </h2>
        </div>

        {/* Right Column: Profile + Let's Create Together + Contact Button + Social Pills */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-indigo-500/50 shadow-md flex-shrink-0">
              <img
                src={profileImg}
                alt="Arjun Chougale Profile"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div>
              <div className="font-extrabold text-sm sm:text-lg text-white font-sans tracking-tight">
                Arjun Chougale
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-gray-400">
                Designer &amp; Video Editor
              </div>
            </div>
          </div>

          {/* Heading and Bio */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#4757fe] tracking-tight">
              Let's Create Together
            </h3>
            <p className="text-sm sm:text-lg text-gray-300 font-normal leading-relaxed">
              Have a project, idea, or brand that needs a creative touch? I'm always open to new opportunities and collaborations. Let's turn your vision into something meaningful.
            </p>
          </div>

          {/* Interactive Direct Email Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="mailto:arjunchougale1541@gmail.com"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 py-3 sm:py-3.5 rounded-full bg-[#1c194c] hover:bg-[#252163] border border-indigo-500/40 hover:border-indigo-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-indigo-950 transition-all duration-200 cursor-pointer active:scale-95 group"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Let’s Talk</span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onCollaborate}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer active:scale-95 shadow-sm hover:shadow-indigo-500/20"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Send Inquiry</span>
            </button>
          </div>

          {/* Bottom Social Media Pills Grid */}
          <div className="pt-4 sm:pt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 sm:py-3 px-2 sm:px-4 rounded-full border border-white/20 hover:border-[#4757fe] bg-white/[0.02] hover:bg-[#4757fe]/15 text-center text-xs sm:text-sm font-bold text-gray-200 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 truncate"
              >
                {soc.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
