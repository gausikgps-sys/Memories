import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Image, Sparkles } from 'lucide-react';
import { closingContent } from '../data/messages';
import confetti from 'canvas-confetti';

interface ClosingPageProps {
  onReplay?: () => void;
  onViewMemories?: () => void;
}

export const ClosingPage: React.FC<ClosingPageProps> = ({ onReplay, onViewMemories }) => {
  const triggerGentleCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#7E163B', '#C87997', '#D9BC91', '#FDE68A', '#FFF9F3'],
      disableForReducedMotion: true,
    });
  };

  const handleReplayClick = () => {
    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMemoriesClick = () => {
    if (onViewMemories) {
      onViewMemories();
    } else {
      const el = document.getElementById('mixed-memories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="closing"
      className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-3xl rounded-full bg-gradient-to-tr from-[#E9A9BD]/25 to-[#D9BC91]/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Animated Glowing Heart Badge */}
        <div className="mb-6 inline-flex">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#7E163B] via-[#9F2B55] to-[#C87997] flex items-center justify-center text-white shadow-xl glow-heart cursor-pointer border-2 border-white/60"
            onClick={triggerGentleCelebration}
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
          </motion.div>
        </div>

        {/* Featured Photograph with Gentle Cinematic Zoom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-8 mx-auto w-64 sm:w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden p-2.5 bg-white shadow-2xl border-2 border-[#D9BC91]"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden relative group">
            <motion.img
              src={closingContent.featuredPhoto}
              alt="Our Cherished Memory"
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="font-editorial italic font-bold text-white text-base">
                Forever held in warmth and gratitude
              </span>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <span className="font-script text-3xl sm:text-4xl text-[#7E163B] font-bold block mb-2">
          From the Deepest Corner of My Heart
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1A1215] font-extrabold leading-tight mb-6">
          {closingContent.heading}
        </h2>

        {/* Heartfelt Message Paragraphs - High Contrast Bold Typography */}
        <div className="space-y-4 font-editorial text-lg sm:text-xl text-[#24161C] font-semibold leading-relaxed max-w-2xl mx-auto italic px-4">
          {closingContent.messageParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-8 mb-10">
          <p className="font-script text-3xl sm:text-4xl text-[#7E163B] font-bold whitespace-pre-line">
            {closingContent.signoff}
          </p>
        </div>

        {/* Functional Actions: Replay Journey & View Memories */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleReplayClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#7E163B] via-[#9F2B55] to-[#C87997] text-white font-bold text-base shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer transition-all border border-white/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Journey</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleMemoriesClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#FFFDF9] text-[#1A1215] hover:text-[#7E163B] border-2 border-[#D9BC91] font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Image className="w-4 h-4 text-[#7E163B]" />
            <span>View Our Memories</span>
          </motion.button>
        </div>

        {/* Safe, Peaceful Footer Note */}
        <p className="text-xs text-[#24161C] font-bold tracking-wide mt-12 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
          A Journey From My Heart • Made with Love & Sincerity
        </p>
      </motion.div>
    </section>
  );
};
