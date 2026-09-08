import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, Check, Copy, ExternalLink, Sparkles, Layers, Palette, Type, Calendar, User, Briefcase } from 'lucide-react';
import { AxialMockup } from './mockups/AxialMockup';
import { CandyCloudMockup } from './mockups/CandyCloudMockup';
import { DevsthanMockup } from './mockups/DevsthanMockup';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!project) return null;

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const renderMockup = () => {
    switch (project.id) {
      case 'personal-branding':
        return <AxialMockup />;
      case 'candy-cloud':
        return <CandyCloudMockup />;
      case 'devsthan-samiti':
        return <DevsthanMockup />;
      default:
        return <AxialMockup />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c14] border border-indigo-900/50 rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto flex flex-col my-auto text-gray-100">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#0c0c14]/95 backdrop-blur border-b border-indigo-950/80">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800/50">
              PROJECT // {project.number}
            </span>
            <span className="text-xs font-semibold text-gray-400 hidden sm:inline">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Main Title & Meta */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <span className="text-xs sm:text-sm font-mono text-indigo-300 bg-indigo-900/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-indigo-700/50">
                {project.year}
              </span>
            </div>
            {project.subtitle && (
              <p className="text-sm sm:text-lg font-medium text-indigo-400">
                {project.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Large Visual Showcase Mockup */}
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-indigo-900/40">
            {renderMockup()}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-indigo-950">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Project Overview
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {project.details.overview}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Key Deliverables
                </h3>
                <ul className="space-y-2">
                  {project.details.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <span className="w-4 h-4 rounded-full bg-indigo-900/80 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  Brand Color System (Click to Copy)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.details.colors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => handleCopyColor(c.hex)}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group cursor-pointer"
                    >
                      <div
                        className="w-full h-8 rounded-md mb-2 shadow-inner border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                      <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between mt-1">
                        <span>{c.hex}</span>
                        {copiedHex === c.hex ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Meta */}
            <div className="space-y-5 bg-[#121220] p-5 rounded-xl border border-indigo-900/40">
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  Role & Scope
                </div>
                <div className="text-xs sm:text-sm font-medium text-white">{project.details.role}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  Client / Context
                </div>
                <div className="text-xs sm:text-sm font-medium text-white">{project.client}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Timeline
                </div>
                <div className="text-xs sm:text-sm font-medium text-white">{project.details.timeline}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Software & Tools
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.details.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-200 border border-indigo-800/40 text-[10px] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Type className="w-3.5 h-3.5 text-indigo-400" />
                  Typography Hierarchy
                </div>
                <div className="space-y-1.5">
                  {project.details.typography.map((type, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-semibold text-gray-200">{type.name}</span>
                      <span className="text-gray-400 block text-[10px]">{type.usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#0c0c14]/95 border-t border-indigo-950/80 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-gray-400 truncate max-w-[200px] sm:max-w-none">
            Arjun Chougale Portfolio Case Study
          </span>
          <button
            onClick={onClose}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
