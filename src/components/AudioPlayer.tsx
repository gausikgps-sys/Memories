import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Heart,
  Music,
  Minimize2,
  Sliders,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBubbleMode, setIsBubbleMode] = useState(false); // Ultra-compact floating mini bubble

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dedicated single romantic soundtrack: Piano & Cello
  const track = {
    name: 'Serenade of Peace',
    subtitle: 'Piano & Cello',
    src: '/audio/romantic-bgm.mp3',
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.log('Autoplay waiting for user gesture:', e);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Playback error:', err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
        loop
        preload="auto"
      />

      {/* Floating Audio Controller */}
      <div className="fixed bottom-4 right-4 z-40 select-none">
        {/* Mode A: Ultra-Compact Tiny Floating Bubble */}
        {isBubbleMode ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBubbleMode(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#660E2C] via-[#8B1E48] to-[#C87997] text-white flex items-center justify-center shadow-2xl border-2 border-white/80 cursor-pointer relative group"
            title="Click to open music controls"
          >
            <button
              onClick={togglePlay}
              className="w-full h-full flex items-center justify-center cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Glowing animated halo when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border border-[#D9BC91] animate-ping opacity-40 pointer-events-none" />
            )}
          </motion.div>
        ) : (
          /* Mode B: Small, Sleek & Adjustable Pill */
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel-gold rounded-full sm:rounded-2xl shadow-xl p-2 sm:p-2.5 border-2 border-[#D9BC91] w-72 sm:w-80 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2.5">
              {/* Compact Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#660E2C] via-[#8B1E48] to-[#C87997] text-white flex items-center justify-center shadow-md hover:scale-106 active:scale-95 transition-transform cursor-pointer border border-white/80 shrink-0"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              {/* Track Info (Title + Cello subtext + Mini Time) */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center gap-1.5">
                  <Music
                    className={`w-3 h-3 text-[#660E2C] shrink-0 ${
                      isPlaying ? 'animate-bounce' : ''
                    }`}
                  />
                  <p className="text-xs font-extrabold text-[#110D0F] truncate">
                    {track.name}{' '}
                    <span className="text-[10px] text-[#660E2C] font-bold">
                      ({track.subtitle})
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-[#1A1215] font-bold">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>

                  {/* Equalizer animation */}
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-2.5 pr-1">
                      <span className="w-0.5 h-2 bg-[#660E2C] rounded-full animate-pulse" />
                      <span className="w-0.5 h-2.5 bg-[#B45309] rounded-full animate-pulse delay-75" />
                      <span className="w-0.5 h-1.5 bg-[#C87997] rounded-full animate-pulse delay-150" />
                    </div>
                  )}
                </div>
              </div>

              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 text-[#110D0F] hover:text-[#660E2C] transition-colors rounded-lg hover:bg-white/60 cursor-pointer shrink-0"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#660E2C]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Expand / Collapse Slider Drawer */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-[#110D0F] hover:text-[#660E2C] transition-colors cursor-pointer shrink-0"
                aria-label="Adjust volume and position"
                title="Adjust volume and position"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <Sliders className="w-3.5 h-3.5 text-[#B45309]" />
                )}
              </button>

              {/* Minimize to tiny bubble button */}
              <button
                onClick={() => setIsBubbleMode(true)}
                className="p-1 text-[#110D0F] hover:text-[#660E2C] transition-colors cursor-pointer shrink-0"
                aria-label="Minimize to tiny bubble"
                title="Minimize player"
              >
                <Minimize2 className="w-3.5 h-3.5 text-[#660E2C]" />
              </button>
            </div>

            {/* Expanded Drawer: Adjustable Volume & Track Scrubbing */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pt-2.5 mt-2 border-t border-[#D9BC91]/50 space-y-2.5"
                >
                  {/* Adjustable Track Position Slider */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-[#110D0F] font-bold">
                      <span>Seek Position</span>
                      <span>{formatTime(currentTime)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-[#F7DCE5] rounded-lg appearance-none cursor-pointer accent-[#660E2C]"
                    />
                  </div>

                  {/* Adjustable Volume Slider */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-[#110D0F] font-bold">
                      <span>Volume</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[#F7DCE5] rounded-lg appearance-none cursor-pointer accent-[#660E2C]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
};
