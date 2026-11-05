import React, { forwardRef, useMemo } from 'react';
import {
  Lock,
  Eye,
  Mic,
  Scissors,
  MousePointer,
  Type,
  PenTool,
  Hand,
  Volume2,
  Film,
  Sparkles,
} from 'lucide-react';

export interface PremiereTimelineProps {
  playheadRef?: React.RefObject<HTMLDivElement | null>;
  timecodeRef?: React.RefObject<HTMLSpanElement | null>;
}

// Generate realistic mirrored audio waveform SVG paths
function generateWaveformPath(
  width: number,
  height: number,
  type: 'music' | 'sfx' | 'voice',
  seed: number = 42
): string {
  const points: { x: number; top: number; bottom: number }[] = [];
  const step = 2.5;
  const centerY = height / 2;
  const maxAmp = centerY - 2;

  for (let x = 0; x <= width; x += step) {
    const t = x / width;
    let amp = 0.1;

    if (type === 'music') {
      const beat = Math.pow(Math.sin(t * Math.PI * 24), 6) * 0.45;
      const sub = Math.sin(t * Math.PI * 4) * 0.2 + 0.35;
      const noise = Math.abs((Math.sin(x * 12.9898 + seed) * 43758.5453) % 1) * 0.35;
      amp = sub + beat + noise;
    } else if (type === 'sfx') {
      const burst1 = Math.exp(-Math.pow((t - 0.25) * 20, 2)) * 0.9;
      const burst2 = Math.exp(-Math.pow((t - 0.55) * 16, 2)) * 0.85;
      const burst3 = Math.exp(-Math.pow((t - 0.85) * 18, 2)) * 0.95;
      const noise = Math.abs((Math.sin(x * 9.123 + seed) * 23421.12) % 1) * 0.2;
      amp = burst1 + burst2 + burst3 + noise;
    } else {
      const phrase = Math.pow(Math.sin(t * Math.PI * 12), 2);
      const pauses = Math.sin(t * Math.PI * 3) > 0 ? 1 : 0.15;
      const noise = Math.abs((Math.sin(x * 7.54 + seed) * 12345.67) % 1) * 0.3;
      amp = phrase * pauses * 0.75 + noise * 0.2;
    }

    amp = Math.max(0.04, Math.min(0.96, amp));
    points.push({
      x,
      top: centerY - amp * maxAmp,
      bottom: centerY + amp * maxAmp,
    });
  }

  let topPath = `M ${points[0].x} ${points[0].top}`;
  for (let i = 1; i < points.length; i++) {
    topPath += ` L ${points[i].x} ${points[i].top}`;
  }

  let bottomPath = '';
  for (let i = points.length - 1; i >= 0; i--) {
    bottomPath += ` L ${points[i].x} ${points[i].bottom}`;
  }

  return `${topPath}${bottomPath} Z`;
}

export const PremiereTimeline = forwardRef<HTMLDivElement, PremiereTimelineProps>(
  ({ playheadRef, timecodeRef }, ref) => {
    // Pre-calculated audio waveforms (scaled up for taller, richer track immersion)
    const musicWaveformA1 = useMemo(() => generateWaveformPath(1100, 44, 'music', 101), []);
    const musicWaveformA1b = useMemo(() => generateWaveformPath(450, 44, 'music', 202), []);
    const sfxWaveformA2_1 = useMemo(() => generateWaveformPath(240, 34, 'sfx', 303), []);
    const sfxWaveformA2_2 = useMemo(() => generateWaveformPath(300, 34, 'sfx', 404), []);
    const sfxWaveformA2_3 = useMemo(() => generateWaveformPath(220, 34, 'sfx', 505), []);
    const voiceWaveformA3_1 = useMemo(() => generateWaveformPath(480, 32, 'voice', 606), []);
    const voiceWaveformA3_2 = useMemo(() => generateWaveformPath(400, 32, 'voice', 707), []);

    // Timeline Ruler Markers: 00:00 through 00:32
    const rulerTimeMarkers = [
      '00:00',
      '00:04',
      '00:08',
      '00:12',
      '00:16',
      '00:20',
      '00:24',
      '00:28',
      '00:32',
    ];

    return (
      <div
        ref={ref}
        className="w-[140vw] min-w-[1300px] max-w-[2000px] relative select-none"
      >
        {/* Main Premiere Pro Window Shell (Subtle glassmorphic dark finish) */}
        <div
          className="rounded-xl overflow-hidden bg-[#11131d]/90 backdrop-blur-md border border-[#2b3044]/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(37,99,235,0.18)] text-xs font-sans relative"
        >
          {/* 1. TOP HEADER & WINDOW CHROME */}
          <div className="h-9 bg-[#161926]/95 border-b border-[#252a3d] flex items-center justify-between px-3.5 z-30 relative">
            {/* Sequence Tabs */}
            <div className="flex items-center gap-1.5 h-full">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1e2e] text-blue-300 font-medium rounded-t border-t-2 border-t-[#3b82f6] border-x border-x-[#2b3147] h-full text-[11px]">
                <Film className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="tracking-wide text-gray-200">Arjun_Showreel_2026.prproj</span>
                <span className="text-[10px] text-gray-400 hover:text-white cursor-pointer ml-1">×</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 text-gray-400 hover:text-gray-200 cursor-pointer h-full text-[11px]">
                <span className="text-gray-400">B-Roll_Master_v2</span>
              </div>
            </div>

            {/* Quick Tool Strip */}
            <div className="hidden md:flex items-center gap-1 bg-[#12141f] px-2 py-0.5 rounded border border-[#252a3d]">
              <button
                className="p-1 rounded bg-[#2563eb] text-white shadow-sm"
                title="Selection Tool (V)"
              >
                <MousePointer className="w-3 h-3" />
              </button>
              <button
                className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                title="Track Select Forward (A)"
              >
                <span className="text-[10px] font-bold px-0.5">A</span>
              </button>
              <button
                className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                title="Razor Cut Tool (C)"
              >
                <Scissors className="w-3 h-3" />
              </button>
              <button
                className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                title="Pen Tool (P)"
              >
                <PenTool className="w-3 h-3" />
              </button>
              <button
                className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                title="Hand Tool (H)"
              >
                <Hand className="w-3 h-3" />
              </button>
              <button
                className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                title="Type Tool (T)"
              >
                <Type className="w-3 h-3" />
              </button>
            </div>

            {/* Timecode & Project Status Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#0c0e17] px-2.5 py-1 rounded border border-[#222739]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                  TIMELINE
                </span>
                <span
                  ref={timecodeRef}
                  className="font-mono text-[13px] font-bold text-[#38bdf8] tracking-widest drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                >
                  00:00:14:18
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">
                  24.00 fps
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ProRes 422 HQ
                </span>
              </div>
            </div>
          </div>

          {/* 2. TIME RULER & OVERVIEW NAVIGATOR */}
          <div className="bg-[#181b28]/95 border-b border-[#292f44] flex relative z-10">
            {/* Track Header Spacer Corner */}
            <div className="w-[185px] sm:w-[210px] shrink-0 bg-[#161925] border-r border-[#292f44] flex items-center justify-between px-3 py-1">
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Tracks
              </span>
              <span className="text-[9px] text-[#3b82f6] font-mono">1080p60</span>
            </div>

            {/* Ruler Canvas */}
            <div className="flex-1 relative h-8 overflow-hidden">
              {/* Top Zoom Navigator Strip */}
              <div className="h-1.5 w-full bg-[#11131c] flex items-center px-1">
                <div className="h-1 w-full bg-[#1e2333] rounded-sm relative flex items-center">
                  <div className="absolute left-[5%] right-[25%] h-full bg-[#3b82f6]/30 border-x border-[#3b82f6] rounded-xs" />
                </div>
              </div>

              {/* Time Ticks */}
              <div className="h-6.5 w-full flex items-end justify-between px-2 pb-1 relative text-[10px] font-mono text-gray-400">
                {rulerTimeMarkers.map((time, idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    <div className="w-[1px] h-2 bg-[#3f4762]" />
                    <span className="text-[9px] text-gray-400 pt-0.5">{time}</span>
                  </div>
                ))}

                {/* Minor Tick Marks */}
                <div className="absolute inset-x-0 bottom-0 h-1.5 flex justify-between px-4 pointer-events-none opacity-40">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="w-[1px] h-1.5 bg-[#4e587a]" />
                  ))}
                </div>
              </div>

              {/* Premiere Yellow/Green Render Bar */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] flex">
                <div className="w-[30%] bg-[#eab308]" />
                <div className="w-[45%] bg-[#22c55e]" />
                <div className="w-[25%] bg-[#eab308]" />
              </div>
            </div>
          </div>

          {/* 3. TIMELINE BODY: TRACK HEADERS (LEFT) & TRACK CLIPS (RIGHT) */}
          <div className="flex relative bg-[#10121b]/95">
            {/* LEFT: TRACK HEADERS COLUMN */}
            <div className="w-[185px] sm:w-[210px] shrink-0 bg-[#151824] border-r border-[#292f44] flex flex-col z-20">
              {/* V3 Header */}
              <div className="h-[54px] border-b border-[#252a3b] px-3 py-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[11px] text-purple-300">V3</span>
                    <span className="text-[10px] text-purple-200 truncate max-w-[95px]">Brand Film</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Lock className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Eye className="w-3.5 h-3.5 text-purple-400 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* V2 Header (Motion Graphics Track) */}
              <div className="h-[54px] border-b border-[#252a3b] px-3 py-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[11px] text-purple-300">V2</span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[95px]">Motion/FX</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Lock className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Eye className="w-3.5 h-3.5 text-purple-400 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* V1 Header (Primary Cuts Track) */}
              <div className="h-[54px] border-b-2 border-b-[#2e354a] px-3 py-1 flex flex-col justify-center bg-[#171a27]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#2563eb] text-white font-bold text-[10px] shadow-sm">
                      V1
                    </span>
                    <span className="text-[10px] text-gray-300 font-medium">Main Cut</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Lock className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Eye className="w-3.5 h-3.5 text-blue-400 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Video / Audio Center Split Label */}
              <div className="h-6 bg-[#12141f] border-b border-[#222739] px-3 flex items-center justify-between">
                <span className="text-[9px] tracking-wider uppercase text-gray-400 font-mono">
                  Audio Tracks
                </span>
                <Volume2 className="w-3.5 h-3.5 text-teal-400" />
              </div>

              {/* A1 Header (Master Soundtrack Track) */}
              <div className="h-[66px] border-b border-[#252a3b] px-3 py-2 flex flex-col justify-between bg-[#151a26]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#0891b2] text-white font-bold text-[10px] shadow-sm">
                      A1
                    </span>
                    <span className="font-semibold text-[10px] text-teal-300">Soundtrack</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold">
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded hover:bg-white/10 cursor-pointer">
                      M
                    </span>
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded hover:bg-white/10 cursor-pointer">
                      S
                    </span>
                    <Mic className="w-3 h-3 text-gray-400 hover:text-red-400 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-24 bg-[#0a0c12] rounded-full overflow-hidden flex">
                    <div className="w-[70%] bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">-6.0 dB</span>
                </div>
              </div>

              {/* A2 Header (SFX Track) */}
              <div className="h-[56px] border-b border-[#252a3b] px-3 py-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[11px] text-teal-400">A2</span>
                    <span className="text-[10px] text-gray-400">SFX / Whoosh</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold">
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded">M</span>
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded">S</span>
                  </div>
                </div>
              </div>

              {/* A3 Header (Dialogue/Voice Track) */}
              <div className="h-[54px] px-3 py-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[11px] text-teal-400">A3</span>
                    <span className="text-[10px] text-gray-400">Dialogue/Voice</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold">
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded">M</span>
                    <span className="px-1 py-0.5 bg-white/5 text-gray-400 rounded">S</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: TRACK CANVAS & CLIPS */}
            <div className="flex-1 relative overflow-hidden bg-[#0d0f17]">
              {/* Background Grid Lines (1-second intervals) */}
              <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20 z-0">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-[#2a3045]" />
                ))}
              </div>

              {/* TRACK V3 (Brand_Film_01.mp4 [VO] - Consistent with other purple layers) */}
              <div className="h-[54px] border-b border-[#252a3b] relative flex items-center px-2 gap-2 z-10">
                {/* Main Clip: Brand_Film_01.mp4 [VO] */}
                <div className="h-[42px] w-[76%] rounded bg-[#623da8] border border-[#8957ee] shadow-sm px-2.5 flex items-center justify-between text-[10px] text-purple-100 relative overflow-hidden group cursor-pointer hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="px-1 bg-amber-400 text-black font-extrabold text-[8px] rounded-xs">
                      fx
                    </span>
                    <span className="truncate font-medium">Brand_Film_01.mp4 [VO]</span>
                  </div>

                  {/* Volume / opacity line with keyframe diamonds matching V2 */}
                  <div className="absolute inset-x-0 bottom-2.5 h-[1px] bg-white/40 flex items-center justify-between px-16 pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-amber-300 rotate-45 border border-black/40 shadow-sm" />
                    <div className="w-1.5 h-1.5 bg-amber-300 rotate-45 border border-black/40 shadow-sm" />
                  </div>

                  <span className="text-[9px] font-mono text-purple-200">00:00:26:00</span>
                </div>

                {/* Second Clip on V3: Outro_Sting.mov */}
                <div className="h-[42px] flex-1 rounded bg-[#5f33a8] border border-[#8553da] shadow-sm px-2 flex items-center justify-between text-[10px] text-purple-100">
                  <span className="truncate">Outro_3D_Sting.mov</span>
                  <span className="px-1 bg-amber-400 text-black text-[8px] font-bold rounded-xs">fx</span>
                </div>
              </div>

              {/* TRACK V2 (Motion Graphics & Typography Clips) */}
              <div className="h-[54px] border-b border-[#252a3b] relative flex items-center px-2 gap-2 z-10">
                <div className="h-[42px] w-[35%] rounded bg-[#6c40b8] border border-[#915bf5] shadow-sm px-2.5 flex items-center justify-between text-[10px] text-purple-100 relative overflow-hidden">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="px-1 bg-amber-400 text-black text-[8px] font-bold rounded-xs">fx</span>
                    <span className="truncate">Motion_Graphics.mp4</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-2.5 h-[1px] bg-white/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-amber-300 rotate-45 border border-black/40 shadow-sm" />
                  </div>
                </div>

                <div className="h-[42px] w-[38%] rounded bg-[#7a49cf] border border-[#9d6cfc] shadow-sm px-2.5 flex items-center justify-between text-[10px] text-purple-100 relative overflow-hidden">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="px-1 bg-amber-400 text-black text-[8px] font-bold rounded-xs">fx</span>
                    <span className="truncate">Typography_Animation</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-2.5 h-[1px] bg-white/40 flex items-center justify-around px-8">
                    <div className="w-1.5 h-1.5 bg-amber-300 rotate-45 border border-black/40" />
                    <div className="w-1.5 h-1.5 bg-amber-300 rotate-45 border border-black/40" />
                  </div>
                </div>

                <div className="h-[42px] flex-1 rounded bg-[#5f33a8] border border-[#8553da] shadow-sm px-2 flex items-center justify-between text-[10px] text-purple-100">
                  <span className="truncate">LowerThird.mogrt</span>
                </div>
              </div>

              {/* TRACK V1 (Primary Narrative Sequence) */}
              <div className="h-[54px] border-b-2 border-b-[#2e354a] relative flex items-center px-2 gap-1.5 z-10 bg-[#12141f]">
                <div className="h-[42px] w-[22%] rounded bg-[#554794] border border-[#7867be] shadow-sm px-2 flex items-center text-[10px] text-purple-100 truncate">
                  Scene_01_Intro.mp4
                </div>
                <div className="h-[42px] w-[28%] rounded bg-[#554794] border border-[#7867be] shadow-sm px-2 flex items-center text-[10px] text-purple-100 truncate">
                  Scene_02_BrandIdentity.mp4
                </div>
                <div className="h-[42px] w-[30%] rounded bg-[#554794] border border-[#7867be] shadow-sm px-2 flex items-center text-[10px] text-purple-100 truncate">
                  Scene_03_VisualImpact.mp4
                </div>
                <div className="h-[42px] flex-1 rounded bg-[#554794] border border-[#7867be] shadow-sm px-2 flex items-center text-[10px] text-purple-100 truncate">
                  Scene_04_Outro.mp4
                </div>
              </div>

              {/* Baseline Divider */}
              <div className="h-6 bg-[#0f111a] border-b border-[#222739] px-3 flex items-center justify-between text-[9px] text-gray-400 font-mono">
                <span>0 dB AUDIO BASELINE</span>
                <span>48,000 Hz • 24-BIT STEREO</span>
              </div>

              {/* TRACK A1 (Master Soundtrack with Realistic SVG Audio Waveform) */}
              <div className="h-[66px] border-b border-[#252a3b] relative flex items-center px-2 z-10">
                <div className="h-[56px] w-[72%] rounded bg-[#0b6477] border border-[#0d9488] shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="h-4 bg-[#074b5a] px-2 flex items-center justify-between text-[9px] text-teal-100 z-10">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="px-1 bg-amber-400 text-black text-[7px] font-bold rounded-xs">fx</span>
                      <span className="truncate font-medium">Soundtrack.wav [A1]</span>
                    </div>
                    <span className="font-mono text-[8px] text-teal-300">Cinematic Master</span>
                  </div>

                  <div className="flex-1 relative w-full flex items-center">
                    <svg
                      className="w-full h-full text-teal-300/90"
                      viewBox="0 0 1100 44"
                      preserveAspectRatio="none"
                    >
                      <path d={musicWaveformA1} fill="currentColor" />
                      <line
                        x1="0"
                        y1="22"
                        x2="1100"
                        y2="22"
                        stroke="#ffffff"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="h-[56px] ml-2 flex-1 rounded bg-[#0b6477] border border-[#0d9488] shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="h-4 bg-[#074b5a] px-2 flex items-center text-[9px] text-teal-100 z-10 truncate">
                    Soundtrack_Outro_Fade.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg
                      className="w-full h-full text-teal-300/90"
                      viewBox="0 0 450 44"
                      preserveAspectRatio="none"
                    >
                      <path d={musicWaveformA1b} fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* TRACK A2 (SFX / Whoosh Clips with Transient Burst Waveforms) */}
              <div className="h-[56px] border-b border-[#252a3b] relative flex items-center px-2 gap-3 z-10">
                <div className="h-[46px] w-[26%] rounded bg-[#097b8a] border border-[#14b8a6] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="h-3.5 bg-[#06535e] px-1.5 flex items-center text-[8px] text-teal-100 truncate">
                    Transition_SFX.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg className="w-full h-full text-cyan-200" viewBox="0 0 240 34" preserveAspectRatio="none">
                      <path d={sfxWaveformA2_1} fill="currentColor" />
                    </svg>
                  </div>
                </div>

                <div className="h-[46px] w-[32%] rounded bg-[#097b8a] border border-[#14b8a6] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="h-3.5 bg-[#06535e] px-1.5 flex items-center text-[8px] text-teal-100 truncate">
                    Bass_Drop_Impact.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg className="w-full h-full text-cyan-200" viewBox="0 0 300 34" preserveAspectRatio="none">
                      <path d={sfxWaveformA2_2} fill="currentColor" />
                    </svg>
                  </div>
                </div>

                <div className="h-[46px] flex-1 rounded bg-[#097b8a] border border-[#14b8a6] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="h-3.5 bg-[#06535e] px-1.5 flex items-center text-[8px] text-teal-100 truncate">
                    Whoosh_Camera_Pan.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg className="w-full h-full text-cyan-200" viewBox="0 0 220 34" preserveAspectRatio="none">
                      <path d={sfxWaveformA2_3} fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* TRACK A3 (Voiceover & Foley Track) */}
              <div className="h-[54px] relative flex items-center px-2 gap-3 z-10">
                <div className="h-[44px] w-[46%] rounded bg-[#0a6c7a] border border-[#0ea5e9] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="h-3.5 bg-[#064852] px-1.5 flex items-center text-[8px] text-teal-100 truncate">
                    Voiceover_DirectorCut.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg className="w-full h-full text-sky-200" viewBox="0 0 480 32" preserveAspectRatio="none">
                      <path d={voiceWaveformA3_1} fill="currentColor" />
                    </svg>
                  </div>
                </div>

                <div className="h-[44px] flex-1 rounded bg-[#0a6c7a] border border-[#0ea5e9] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="h-3.5 bg-[#064852] px-1.5 flex items-center text-[8px] text-teal-100 truncate">
                    Ambient_Texture_Stereo.wav
                  </div>
                  <div className="flex-1 relative w-full flex items-center">
                    <svg className="w-full h-full text-sky-200" viewBox="0 0 400 32" preserveAspectRatio="none">
                      <path d={voiceWaveformA3_2} fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 4. ADOBE PREMIERE PRO PLAYHEAD & NEEDLE */}
              <div
                ref={playheadRef}
                className="absolute top-0 bottom-0 pointer-events-none z-30"
                style={{ left: '16%' }}
              >
                {/* Playhead Top Marker (Premiere Blue Inverted Pentagonal Head on Ruler) */}
                <div className="absolute -top-7 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] flex items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_65%,50%_100%,0%_65%)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mb-0.5" />
                  </div>
                </div>

                {/* Vertical Glowing Playhead Line through All Tracks */}
                <div className="w-[1.5px] h-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8,0_0_16px_#2563eb]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PremiereTimeline.displayName = 'PremiereTimeline';
