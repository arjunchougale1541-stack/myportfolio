import React, { useEffect, useMemo } from 'react';
import { ProjectItem } from '../types';
import { X, Images } from 'lucide-react';
import axialImg from '../assets/images/axial_graphic_cover.jpg';
import axialDesktopImg from '../assets/images/axial_graphic_desktop_cover.png';
import axialCaseStudyImg from '../assets/images/axial_graphic_case_study_full.jpg';
import candyImg from '../assets/images/candy_cloud_cover.jpg';
import candyDesktopImg from '../assets/images/candy_cloud_desktop_cover.png';
import candyCloudUiuxImg from '../assets/images/candy_cloud_uiux_full.png';
import candyCloudCaseStudyImg from '../assets/images/candy_cloud_case_study_full.webp';
import devsthanImg from '../assets/images/devsthan_samiti_cover.jpg';
import devsthanDesktopImg from '../assets/images/devsthan_samiti_desktop_cover.png';
import devsthanCaseStudyImg from '../assets/images/devsthan_samiti_case_study_full.webp';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  // Resolve dynamic project presentation images list
  const galleryImages = useMemo<string[]>(() => {
    if (!project) return [];

    // Helper to strip out the coverImage if present
    const excludeCover = (list: string[]) => {
      if (!project.coverImage) return list;
      const filtered = list.filter((img) => img !== project.coverImage);
      return filtered.length > 0 ? filtered : list;
    };

    // 1. Separate projectImages array explicitly dedicated to presentation images in the viewer
    if (project.projectImages && project.projectImages.length > 0) {
      return excludeCover(project.projectImages);
    }

    // 2. Fallbacks for known featured showcase projects
    if (project.id === 'personal-branding') {
      return [axialCaseStudyImg];
    }
    if (project.id === 'candy-cloud') {
      return [candyCloudCaseStudyImg];
    }
    if (project.id === 'devsthan-samiti') {
      return [devsthanCaseStudyImg];
    }
    if (project.id === 'candy-cloud-ecommerce-experience') {
      return [candyCloudCaseStudyImg];
    }

    // 3. Fallback: project.images or details.galleryImages (excluding coverImage)
    if (project.images && project.images.length > 0) {
      return excludeCover(project.images);
    }
    if (project.details?.galleryImages && project.details.galleryImages.length > 0) {
      return excludeCover(project.details.galleryImages);
    }

    return [];
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="fixed inset-0 -z-10 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl max-h-[92vh] sm:max-h-[94vh] bg-[#0a0a12] border border-indigo-900/50 rounded-xl sm:rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-gray-100">
        
        {/* 1. STICKY MODAL TOP BAR (Accessible while scrolling) */}
        <header className="sticky top-0 z-30 w-full bg-[#0a0a14]/95 backdrop-blur-md border-b border-indigo-950/80 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 shadow-md">
          {/* Left: Project identity & meta */}
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-indigo-400 bg-indigo-950/90 px-2 py-0.5 rounded border border-indigo-800/60">
                PROJECT // {project.number}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-400">
                {project.category}
              </span>
              {project.client && (
                <span className="text-[11px] sm:text-xs text-indigo-300/80 hidden sm:inline">
                  • {project.client}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight truncate">
              {project.title}
            </h2>
          </div>

          {/* Right: Gallery Counter & Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {galleryImages.length > 0 && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-800/40">
                <Images className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {galleryImages.length} {galleryImages.length === 1 ? 'Design' : 'Designs'}
                </span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close case study viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 2. SCROLLABLE CASE STUDY GALLERY BODY */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10">
          {/* Optional Category & Subtitle Tags Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-indigo-950/50">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-indigo-950/80 text-indigo-200 border border-indigo-800/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.year && (
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
                {project.year}
              </span>
            )}
          </div>

          {/* Behance-Style Vertical Image Gallery */}
          <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10">
            {galleryImages.map((imgSrc, index) => (
              <div
                key={`${imgSrc}-${index}`}
                className="w-full rounded-lg sm:rounded-xl overflow-hidden bg-[#0d0c18] border border-indigo-950/70 shadow-2xl transition-all duration-300"
              >
                <img
                  src={imgSrc}
                  alt={`${project.title} - Presentation ${index + 1}`}
                  className="w-full h-auto block select-none"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Minimalist End of Case Study Footer */}
          <div className="pt-6 sm:pt-10 pb-4 sm:pb-6 flex flex-col items-center justify-center text-center gap-3 border-t border-indigo-950/60">
            <span className="text-[11px] sm:text-xs font-mono text-indigo-400 uppercase tracking-widest">
              End of Gallery • {project.title}
            </span>
            <button
              onClick={onClose}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
