import React, { useState, useEffect } from 'react';
import profileImg from '../assets/images/arjun_profile.jpg';

interface NavbarProps {
  onCollaborate?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navItems: NavItem[] = [
    { id: 'hero', label: 'HOME', href: '#hero' },
    { id: 'about', label: 'ABOUT ME', href: '#about' },
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'services', label: 'SERVICE', href: '#services' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Header backdrop blur on scroll
      setIsScrolled(window.scrollY > 20);

      // 2. Bottom of the page detection -> activate Contact
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 3. Top of the page -> activate Hero (Home)
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      // 4. Check bounding rectangles of each target section
      const headerOffset = 160;
      const sectionIds = ['contact', 'testimonials', 'services', 'projects', 'about', 'hero'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            // Testimonials section maps to the SERVICE nav item
            setActiveSection(id === 'testimonials' ? 'services' : id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      setActiveSection(targetId);
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-3 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Brand Identity / Profile */}
        <a href="#hero" className="flex items-center gap-2 sm:gap-3.5 group flex-shrink-0">
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-indigo-500/50 shadow-md group-hover:ring-indigo-400 transition-all flex-shrink-0">
            <img
              src={profileImg}
              alt="Arjun Chougale Profile"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-[11px] sm:text-base tracking-tight text-white font-sans uppercase group-hover:text-indigo-300 transition-colors whitespace-nowrap">
              ARJUN <span className="hidden sm:inline">CHOUGALE</span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-gray-400 uppercase truncate max-w-[170px] sm:max-w-none hidden md:block">
              GRAPHIC DESIGNER &amp; VIDEO EDITOR
            </span>
          </div>
        </a>

        {/* Right: Clean Horizontal Navigation: HOME | ABOUT ME | PROJECTS | SERVICE | CONTACT */}
        <nav
          className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4.5 overflow-x-auto no-scrollbar py-1 flex-shrink-0"
          aria-label="Main Navigation"
        >
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <React.Fragment key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-1 px-0.5 sm:px-1.5 flex flex-col items-center group transition-transform duration-350 ease-in-out cursor-pointer select-none ${
                    isActive ? 'scale-105 sm:scale-110 -translate-y-0.5' : 'scale-100 hover:scale-105'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`font-extrabold tracking-wider uppercase whitespace-nowrap transition-colors duration-350 ease-in-out text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-sm ${
                      isActive
                        ? 'text-[#4757fe] drop-shadow-[0_0_12px_rgba(71,87,254,0.6)] font-black'
                        : 'text-gray-300 group-hover:text-white font-bold'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Subtle active underline glow */}
                  <span
                    className={`absolute -bottom-0.5 left-1 right-1 h-[2px] rounded-full bg-[#4757fe] shadow-[0_0_8px_#4757fe] transition-all duration-350 ease-in-out ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </a>

                {/* Pipe Divider */}
                {idx < navItems.length - 1 && (
                  <span
                    className="text-white/20 select-none text-[10px] sm:text-xs font-mono font-light pointer-events-none px-0.5"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
