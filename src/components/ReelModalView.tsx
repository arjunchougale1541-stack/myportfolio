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
  Wrench,
  Info,
  Target,
  Layers,
  Flame,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ToolItem {
  name: string;
  icon: React.ReactNode;
}

const REEL_TOOLS: ToolItem[] = [
  {
    name: 'Adobe Premiere Pro',
    icon: (
      <svg viewBox="0 0 240 234" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="234" rx="42" fill="#00005B" />
        <path fill="#9999FF" d="m57 164v-103c0-0.7 0.3-1.1 1-1.1 1.7 0 3.3 0 5.6-0.1 2.4-0.1 4.9-0.1 7.6-0.2s5.6-0.1 8.7-0.2 6.1-0.1 9.1-0.1c8.2 0 15 1 20.6 3.1 5 1.7 9.6 4.5 13.4 8.2 3.2 3.2 5.7 7.1 7.3 11.4 1.5 4.2 2.3 8.5 2.3 13 0 8.6-2 15.7-6 21.3s-9.6 9.8-16.1 12.2c-6.8 2.5-14.3 3.4-22.5 3.4-2.4 0-4 0-5-0.1s-2.4-0.1-4.3-0.1v32.1c0.1 0.7-0.4 1.3-1.1 1.4h-0.4-19c-0.8 0-1.2-0.4-1.2-1.3zm21.8-84.7v33.6c1.4 0.1 2.7 0.2 3.9 0.2h5.3c3.9 0 7.8-0.6 11.5-1.8 3.2-0.9 6-2.8 8.2-5.3 2.1-2.5 3.1-5.9 3.1-10.3 0.1-3.1-0.7-6.2-2.3-8.9-1.7-2.6-4.1-4.6-7-5.7-3.7-1.5-7.7-2.1-11.8-2-2.6 0-4.9 0-6.8 0.1-2-0.1-3.4 0-4.1 0.1z"/>
        <path fill="#9999FF" d="m147 85.2h17.5c1 0 1.8 0.7 2.1 1.6 0.3 0.8 0.5 1.6 0.6 2.5 0.2 1 0.4 2.1 0.5 3.1 0.1 1.1 0.2 2.3 0.2 3.6 3-3.5 6.6-6.4 10.7-8.6 4.6-2.6 9.9-3.9 15.2-3.9 0.7-0.1 1.3 0.4 1.4 1.1v0.4 19.5c0 0.8-0.5 1.1-1.6 1.1-3.6-0.1-7.3 0.2-10.8 1-2.9 0.6-5.7 1.5-8.4 2.7-1.9 0.9-3.7 2.1-5.1 3.7v51c0 1-0.4 1.4-1.3 1.4h-19.7c-0.8 0.1-1.5-0.4-1.6-1.2v-0.4-55.4c0-2.4 0-4.9-0.1-7.5s-0.1-5.2-0.2-7.8c0-2.3-0.2-4.5-0.4-6.8-0.1-0.5 0.2-1 0.7-1.1 0-0.1 0.2-0.1 0.3 0z"/>
      </svg>
    ),
  },
  {
    name: 'Adobe After Effects',
    icon: (
      <svg viewBox="0 0 240 234" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="234" rx="42" fill="#00005B" />
        <path fill="#9999FF" d="m96.4 140h-37.2l-7.6 23.6c-0.2 0.9-1 1.5-1.9 1.4h-18.8c-1.1 0-1.4-0.6-1.1-1.8l32.2-92.3c0.3-1 0.6-1.9 1-3.1 0.4-2.1 0.6-4.3 0.6-6.5-0.1-0.5 0.3-1 0.8-1.1h0.3 25.6c0.7 0 1.2 0.3 1.3 0.8l36.5 102c0.3 1.1 0 1.6-1 1.6h-20.9c-0.7 0.1-1.4-0.4-1.6-1.1l-8.2-24zm-31.4-19.9h25.4c-0.6-2.1-1.4-4.6-2.3-7.2-0.9-2.7-1.8-5.6-2.7-8.6-1-3.1-1.9-6.1-2.9-9.2s-1.9-6-2.7-8.9c-0.8-2.8-1.5-5.4-2.2-7.8h-0.2c-0.9 4.3-2 8.6-3.4 12.9-1.5 4.8-3 9.8-4.6 14.8-1.3 5.1-2.9 9.8-4.4 14z"/>
        <path fill="#9999FF" d="m187 131h-31.7c0.4 3.1 1.4 6.2 3.1 8.9 1.8 2.7 4.3 4.8 7.3 6 4 1.7 8.4 2.6 12.8 2.5 3.5-0.1 7-0.4 10.4-1.1 3.1-0.4 6.1-1.2 8.9-2.3 0.5-0.4 0.8-0.2 0.8 0.8v15.3c0 0.4-0.1 0.8-0.2 1.2-0.2 0.3-0.4 0.5-0.7 0.7-3.2 1.4-6.5 2.4-10 3-4.7 0.9-9.4 1.3-14.2 1.2-7.6 0-14-1.2-19.2-3.5-4.9-2.1-9.2-5.4-12.6-9.5-3.2-3.9-5.5-8.3-6.9-13.1-1.4-4.7-2.1-9.6-2.1-14.6 0-5.4 0.8-10.7 2.5-15.9 1.6-5 4.1-9.6 7.5-13.7 3.3-4 7.4-7.2 12.1-9.5s10.3-3.1 16.7-3.1c5.3-0.1 10.6 0.9 15.5 3.1 4.1 1.8 7.7 4.5 10.5 8 2.6 3.4 4.7 7.2 6 11.4 1.3 4 1.9 8.1 1.9 12.2 0 2.4-0.1 4.5-0.2 6.4-0.2 1.9-0.3 3.3-0.4 4.2-0.1 0.7-0.7 1.3-1.4 1.3-0.6 0-1.7 0.1-3.3 0.2-1.6 0.2-3.5 0.3-5.8 0.3s-4.7-0.4-7.3-0.4zm-31.7-14.6h21.1c2.6 0 4.5 0 5.7-0.1 0.8-0.1 1.6-0.3 2.3-0.8v-1c0-1.3-0.2-2.5-0.6-3.7-1.8-5.6-7.1-9.4-13-9.2-5.5-0.3-10.7 2.6-13.3 7.6-1.2 2.3-1.9 4.7-2.2 7.2z"/>
      </svg>
    ),
  },
  {
    name: 'Adobe Photoshop',
    icon: (
      <svg viewBox="0 0 240 234" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="234" rx="42" fill="#001E36" />
        <path fill="#31A8FF" d="M54,164.1V61.2c0-0.7,0.3-1.1,1-1.1c1.7,0,3.3,0,5.6-0.1c2.4-0.1,4.9-0.1,7.6-0.2c2.7-0.1,5.6-0.1,8.7-0.2c3.1-0.1,6.1-0.1,9.1-0.1c8.2,0,15,1,20.6,3.1c5,1.7,9.6,4.5,13.4,8.2c3.2,3.2,5.7,7.1,7.3,11.4c1.5,4.2,2.3,8.5,2.3,13c0,8.6-2,15.7-6,21.3c-4,5.6-9.6,9.8-16.1,12.2c-6.8,2.5-14.3,3.4-22.5,3.4c-2.4,0-4,0-5-0.1c-1-0.1-2.4-0.1-4.3-0.1v32.1c0.1,0.7-0.4,1.3-1.1,1.4c-0.1,0-0.2,0-0.4,0H55.2C54.4,165.4,54,165,54,164.1z M75.8,79.4V113c1.4,0.1,2.7,0.2,3.9,0.2H85c3.9,0,7.8-0.6,11.5-1.8c3.2-0.9,6-2.8,8.2-5.3c2.1-2.5,3.1-5.9,3.1-10.3c0.1-3.1-0.7-6.2-2.3-8.9c-1.7-2.6-4.1-4.6-7-5.7c-3.7-1.5-7.7-2.1-11.8-2c-2.6,0-4.9,0-6.8,0.1C77.9,79.2,76.5,79.3,75.8,79.4L75.8,79.4z"/>
        <path fill="#31A8FF" d="M192,106.9c-3-1.6-6.2-2.7-9.6-3.4c-3.7-0.8-7.4-1.3-11.2-1.3c-2-0.1-4.1,0.2-6,0.7c-1.3,0.3-2.4,1-3.1,2c-0.5,0.8-0.8,1.8-0.8,2.7c0,0.9,0.4,1.8,1,2.6c0.9,1.1,2.1,2,3.4,2.7c2.3,1.2,4.7,2.3,7.1,3.3c5.4,1.8,10.6,4.3,15.4,7.3c3.3,2.1,6,4.9,7.9,8.3c1.6,3.2,2.4,6.7,2.3,10.3c0.1,4.7-1.3,9.4-3.9,13.3c-2.8,4-6.7,7.1-11.2,8.9c-4.9,2.1-10.9,3.2-18.1,3.2c-4.6,0-9.1-0.4-13.6-1.3c-3.5-0.6-7-1.7-10.2-3.2c-0.7-0.4-1.2-1.1-1.1-1.9v-17.4c0-0.3,0.1-0.7,0.4-0.9c0.3-0.2,0.6-0.1,0.9,0.1c3.9,2.3,8,3.9,12.4,4.9c3.8,1,7.8,1.5,11.8,1.5c3.8,0,6.5-0.5,8.3-1.4c1.6-0.7,2.7-2.4,2.7-4.2c0-1.4-0.8-2.7-2.4-4c-1.6-1.3-4.9-2.8-9.8-4.7c-5.1-1.8-9.8-4.2-14.2-7.2c-3.1-2.2-5.7-5.1-7.6-8.5c-1.6-3.2-2.4-6.7-2.3-10.2c0-4.3,1.2-8.4,3.4-12.1c2.5-4,6.2-7.2,10.5-9.2c4.7-2.4,10.6-3.5,17.7-3.5c4.1,0,8.3,0.3,12.4,0.9c3,0.4,5.9,1.2,8.6,2.3c0.4,0.1,0.8,0.5,1,0.9c0.1,0.4,0.2,0.8,0.2,1.2v16.3c0,0.4-0.2,0.8-0.5,1C192.9,107.1,192.4,107.1,192,106.9z"/>
      </svg>
    ),
  },
  {
    name: 'Claude',
    icon: (
      <svg viewBox="-3 -3 30 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="-3" y="-3" width="30" height="30" rx="5.5" fill="#241915" />
        <path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    ),
  },
];

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
  const roleName = reel?.details.role || project.details?.role || 'Lead Video Editor & Motion Designer';
  const categoryLabel = reel?.details.category || project.category || 'Reels';
  const yearValue = reel?.details.year || project.year || '2026';
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

            {/* 3. TOOLS USED */}
            <section className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                <span>03. TOOLS USED</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {REEL_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 transition-all flex items-center gap-2.5 sm:gap-3 group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md">
                      {tool.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. PROJECT DETAILS TABLE */}
            <section className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span>04. PROJECT DETAILS</span>
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
