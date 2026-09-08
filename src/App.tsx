/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SeriesSection } from './components/SeriesSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CollaborateModal } from './components/CollaborateModal';
import { WorksPage } from './components/WorksPage';
import { WebsiteLoader } from './components/WebsiteLoader';
import { ProjectItem } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'works'>(() => {
    return window.location.hash === '#works' ? 'works' : 'home';
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCollaborateOpen, setIsCollaborateOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#works') {
        setCurrentView('works');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToWorks = () => {
    window.location.hash = 'works';
    setCurrentView('works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-[#4757fe] selection:text-white">
      {/* Premium Full-Screen Website Loader (Plays only on initial load) */}
      {isLoading && (
        <WebsiteLoader onComplete={() => setIsLoading(false)} />
      )}

      {currentView === 'works' ? (
        <WorksPage
          onBackToHome={navigateToHome}
          onSelectProject={(project) => setSelectedProject(project)}
          onCollaborate={() => setIsCollaborateOpen(true)}
        />
      ) : (
        <>
          {/* Top Header Navigation */}
          <Navbar onCollaborate={() => setIsCollaborateOpen(true)} />

          {/* Main Content Sections */}
          <main className="flex-grow">
            {/* 1. Hero Section (Includes Bottom Diagonal Marquee Ribbon) */}
            <Hero onCollaborate={() => setIsCollaborateOpen(true)} />

            {/* 2. About Me & Statement Section */}
            <AboutSection />

            {/* 4. The Series Section (Featured Case Studies 01, 02, 03) */}
            <SeriesSection
              onSelectProject={(project) => setSelectedProject(project)}
              onExploreWork={navigateToWorks}
            />

            {/* 5. Services Showcase & Tool Capabilities */}
            <ServicesSection />

            {/* 6. Testimonials Section (Coverflow Drag Carousel) */}
            <TestimonialsSection />

            {/* 7. Contact & Social Outreach Section */}
            <ContactSection onCollaborate={() => setIsCollaborateOpen(true)} />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Detailed Project Case Study Lightbox / Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Collaboration / Inquiry Modal */}
      <CollaborateModal
        isOpen={isCollaborateOpen}
        onClose={() => setIsCollaborateOpen(false)}
      />
    </div>
  );
}


