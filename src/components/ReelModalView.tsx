import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Clapperboard,
  Sliders,
  Wrench,
  Info,
  Target,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ReelModalViewProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ReelModalView: React.FC<ReelModalViewProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start muted to guarantee autoplay compatibility
  const [volume, setVolume] = useState<number>(0.85);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  // Extract reel data with robust fallbacks
  const reel = project.reelData;
  const videoSrc = project.videoUrl || reel?.videoUrl || '/videos/reels/velocity_automotive_reel.mp4';
  const reelTitle = reel?.title || project.title;
  const clientName = reel?.client || project.client || 'Client Commission';
  const overviewDesc =
    reel?.overview.description ||
    project.details?.overview ||
    project.description ||
    'High-impact vertical video production engineered for maximum social media retention and viral reach.';
  const objectiveText =
    reel?.overview.objective ||
    project.details?.objective ||
    'Maximize organic retention within the first 1.5 seconds and drive viral engagement across short-form vertical platforms.';
  const creativeDirectionText =
    reel?.creativeDirection ||
    project.details?.creativeDirection ||
    'A high-contrast cinematic atmosphere blending dramatic lighting, dynamic camera motion, and vivid color accents.';
  const editingProcessDesc =
    reel?.editingProcess.description ||
    project.details?.editingProcess ||
    'Precision beat-synced editing with custom speed ramping, dynamic match cuts, and multi-layered sound design.';
  const techniquesList = reel?.editingProcess.techniques || [
    'Cinematic Cuts',
    'Speed Ramping',
    'Beat Synchronization',
    'Sound Design',
    'Color Grading',
    'Motion Graphics',
    'Visual Effects',
  ];
  const toolsList = reel?.toolsUsed ||
    project.details?.tools || [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'DaVinci Resolve',
      'Adobe Audition',
    ];
  const roleName = reel?.details.role || project.details?.role || 'Lead Video Editor & Motion Designer';
  const categoryLabel = reel?.details.category || project.category || 'Reels';
  const yearValue = reel?.details.year || project.year || '2024';
  const formatValue = reel?.details.format || 'Vertical Video (9:16)';
  const resolutionValue = reel?.details.aspectRatio || '1080 x 1920 (60 FPS)';

  // Autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = volume;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented by browser policy, keep paused until user click
          setIsPlaying(false);
        });
    }

    return () => {
      video.pause();
    };
  }, [videoSrc]);

  // Video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeeking) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }

    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 600);
  }, []);

  // Mute / Unmute toggle
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.85);
        video.volume = 0.85;
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [volume]);

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else if (newVol === 0 && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Timeline scrubber click / drag
  const seekToPosition = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    seekToPosition(e);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent);
    };

    const handleMouseUp = () => {
      setIsSeeking(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Replay
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Keyboard shortcut listener (Space = play/pause, M = mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleMute]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={reelTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-200 select-none overflow-y-auto"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="fixed inset-0 -z-10 cursor-pointer bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Split-Screen Modal Card */}
      <div
        className="relative w-full max-w-6xl xl:max-w-7xl max-h-[94vh] bg-[#07070d] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(147,51,234,0.18)] flex flex-col overflow-hidden text-gray-100 my-auto"
        style={{
          boxShadow: '0 25px 80px -15px rgba(0,0,0,0.9), 0 0 40px -10px rgba(79, 70, 229, 0.25)',
        }}
      >
        {/* Ambient Top Glow Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-40 opacity-90" />

        {/* Modal Top Header (Sticky) */}
        <header className="sticky top-0 z-30 w-full bg-[#090812]/95 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-3 shadow-md">
          {/* Left Meta Tag */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
              <Clapperboard className="w-3 h-3 text-cyan-400" />
              <span>REEL CASE STUDY</span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-gray-400 hidden xs:inline">
              {clientName}
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-xs font-mono text-purple-300 hidden sm:inline">
              9:16 VERTICAL CINEMATIC
            </span>
          </div>

          {/* Right: Close (X) Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer border border-white/10 hover:border-pink-500/40 active:scale-95 group"
            aria-label="Close Reel Modal"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </header>

        {/* SPLIT SCREEN BODY: Left = 50% Video Player, Right = 50% Case Study Information */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-h-0">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: REEL VIDEO PLAYER (50% desktop, top mobile) */}
          {/* ======================================================== */}
          <div
            ref={containerRef}
            className="w-full lg:w-1/2 bg-[#040407] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden group select-none min-h-[480px] sm:min-h-[560px] lg:min-h-0"
          >
            {/* Subtle Ambient Radial Lighting Behind Player */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[480px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/20 to-pink-600/15 blur-[100px] rounded-full" />
            </div>

            {/* Strict 9:16 Aspect Ratio Video Wrapper Container */}
            <div className="relative w-auto h-full max-h-[58vh] sm:max-h-[68vh] lg:max-h-[76vh] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex items-center justify-center ring-1 ring-white/5">
              
              {/* Actual HTML5 Video Element */}
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                loop
                preload="metadata"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain cursor-pointer block select-none bg-black"
                aria-label={`${reelTitle} video playback`}
              />

              {/* Big Centered Play/Pause Overlay Animation Trigger */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
                className={`absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
                  !isPlaying
                    ? 'opacity-100 scale-100 hover:scale-110 hover:bg-purple-600/70 hover:border-purple-400'
                    : showCenterIcon
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90 pointer-events-none group-hover:opacity-40 group-hover:pointer-events-auto'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white translate-x-0.5" />
                )}
              </button>

              {/* Autoplay Muted Notice Tag (Visible when muted and playing to guide user to tap sound) */}
              {isMuted && isPlaying && (
                <button
                  onClick={toggleMute}
                  className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-purple-500/40 text-purple-200 text-xs font-medium shadow-lg hover:bg-purple-900/60 transition-all cursor-pointer animate-pulse"
                >
                  <VolumeX className="w-3.5 h-3.5 text-purple-400" />
                  <span>Tap to Unmute</span>
                </button>
              )}

              {/* Resolution & Format Badge on Top-Right of Video */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-wider text-gray-300 uppercase">
                9:16 • 60FPS
              </div>

              {/* BOTTOM CUSTOM VIDEO CONTROLS BAR */}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8 pb-3 px-3 sm:px-4 flex flex-col gap-2 transition-opacity duration-300">
                
                {/* 1. Progress Bar / Scrubber Slider */}
                <div
                  ref={progressBarRef}
                  onClick={seekToPosition}
                  onMouseDown={handleProgressMouseDown}
                  className="group/progress relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all flex items-center"
                  role="slider"
                  aria-label="Reel progress bar"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={duration}
                >
                  {/* Filled Track with Gradient */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative transition-all"
                    style={{ width: `${progressPercent}%` }}
                  >
                    {/* Scrubber Thumb Indicator */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(236,72,153,0.9)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* 2. Control Buttons & Timestamps */}
                <div className="flex items-center justify-between text-white text-xs pt-1">
                  
                  {/* Left: Play/Pause, Replay, Time Display */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                    </button>

                    <button
                      onClick={handleReplay}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                      title="Replay from start"
                      aria-label="Replay"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Time Counter */}
                    <span className="font-mono text-[11px] text-gray-300 select-none">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right: Volume & Fullscreen Controls */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    
                    {/* Volume Popover Wrapper */}
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-pink-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-cyan-400" />
                        )}
                      </button>

                      {/* Interactive Volume Range Slider */}
                      {showVolumeSlider && (
                        <div className="absolute right-8 bottom-0 bg-black/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 shadow-xl flex items-center animate-in fade-in duration-150">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 accent-purple-500 cursor-pointer"
                            aria-label="Volume slider"
                          />
                        </div>
                      )}
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:inline-flex"
                      aria-label="Toggle Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Reel Prompt Hint */}
            <p className="mt-3 text-[11px] text-gray-400 font-mono tracking-wider text-center select-none hidden sm:block">
              {isPlaying ? 'Click video or press Space to pause' : 'Click video or press Space to play'} • Press M to mute/unmute
            </p>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PROJECT INFORMATION (50% desktop, bottom)  */}
          {/* ======================================================== */}
          <div className="w-full lg:w-1/2 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-9 lg:p-10 space-y-7 sm:space-y-8 bg-[#07070d]/60 custom-reel-scrollbar">
            
            {/* 1. PROJECT TITLE & IDENTITY */}
            <div className="space-y-3 pb-5 border-b border-white/5">
              
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 border border-purple-500/30">
                  {categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30">
                  {yearValue}
                </span>
                {project.badge && (
                  <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-pink-300 bg-pink-950/50 border border-pink-500/30">
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Big Punchy Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 tracking-tight leading-tight">
                {reelTitle}
              </h2>

              {/* Client Tagline */}
              <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Client:</span>
                <span className="text-indigo-200 font-semibold">{clientName}</span>
              </p>
            </div>

            {/* 2. PROJECT OVERVIEW */}
            <section className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>01. PROJECT OVERVIEW</span>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {overviewDesc}
              </p>

              {/* Main Objective Highlight Box */}
              <div className="p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-950/30 via-indigo-950/20 to-purple-950/30 border border-cyan-800/30 shadow-lg relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 mb-1">
                      Main Objective
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {objectiveText}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. CREATIVE DIRECTION */}
            <section className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>02. CREATIVE DIRECTION</span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0e0d1c] border border-purple-900/30 space-y-2">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                  {creativeDirectionText}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-purple-300/80">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>Visual Concept • Atmospheric Lighting • Motion Rhythm</span>
                </div>
              </div>
            </section>

            {/* 4. EDITING PROCESS & TECHNIQUES */}
            <section className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-pink-400 uppercase">
                <Sliders className="w-3.5 h-3.5 text-pink-400" />
                <span>03. EDITING PROCESS</span>
              </div>

              {/* Techniques Pills Grid */}
              <div className="flex flex-wrap gap-2">
                {techniquesList.map((technique) => (
                  <span
                    key={technique}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-950/50 to-purple-950/50 text-pink-200 border border-pink-500/30 shadow-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-pink-400 flex-shrink-0" />
                    <span>{technique}</span>
                  </span>
                ))}
              </div>

              {/* Narrative description */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {editingProcessDesc}
              </p>
            </section>

            {/* 5. TOOLS USED */}
            <section className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                <span>04. TOOLS USED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {toolsList.map((tool) => (
                  <div
                    key={tool}
                    className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 transition-all flex items-center gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700/40 flex items-center justify-center text-[10px] font-mono font-black text-indigo-300 group-hover:scale-105 transition-transform">
                      {tool.includes('Premiere')
                        ? 'Pr'
                        : tool.includes('After Effects')
                        ? 'Ae'
                        : tool.includes('DaVinci')
                        ? 'Dv'
                        : tool.includes('Audition')
                        ? 'Au'
                        : tool.includes('Photoshop')
                        ? 'Ps'
                        : 'Fx'}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 truncate">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. PROJECT DETAILS TABLE */}
            <section className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span>05. PROJECT DETAILS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 rounded-2xl bg-[#090814] border border-white/10 text-xs font-sans">
                
                {/* Category */}
                <div className="space-y-1 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-white/5 pr-2">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Category</span>
                  <span className="font-semibold text-white text-sm">{categoryLabel}</span>
                </div>

                {/* Year */}
                <div className="space-y-1 pb-3 sm:pb-0 border-b sm:border-b-0 pl-0 sm:pl-3">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Year</span>
                  <span className="font-semibold text-white text-sm">{yearValue}</span>
                </div>

                {/* My Role */}
                <div className="space-y-1 pt-3 sm:border-r border-white/5 pr-2">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">My Role</span>
                  <span className="font-semibold text-cyan-300 text-sm">{roleName}</span>
                </div>

                {/* Specs */}
                <div className="space-y-1 pt-3 pl-0 sm:pl-3">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Specs</span>
                  <span className="font-semibold text-purple-300 text-sm">{resolutionValue}</span>
                </div>

              </div>
            </section>

            {/* Bottom Close Button in Right Panel */}
            <div className="pt-4 pb-2 flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)] cursor-pointer active:scale-95"
              >
                Close Case Study
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
