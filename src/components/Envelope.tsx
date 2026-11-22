import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, MailOpen, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  isOpen: boolean;
  onOpenLetter: () => void;
  onCloseLetter?: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onOpenLetter, onCloseLetter }) => {
  const handleOpenClick = () => {
    if (!isOpen) {
      try {
        confetti({
          particleCount: 55,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#660E2C', '#7E163B', '#C87997', '#D9BC91', '#FDE68A', '#FFFFFF'],
          disableForReducedMotion: true,
        });
      } catch (e) {}

      onOpenLetter();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 w-full max-w-lg mx-auto">
      {/* 
        Case 1: Unopened Sealed Luxury Envelope 
      */}
      {!isOpen ? (
        <motion.div
          className="relative cursor-pointer group flex flex-col items-center"
          onClick={handleOpenClick}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Decorative Corner Washi Tapes */}
          <div className="washi-tape-gold -top-3 left-6 z-30" />
          <div className="washi-tape -top-3 right-6 z-30" />

          {/* Envelope Body */}
          <div className="relative w-80 sm:w-96 md:w-[420px] h-52 sm:h-56 rounded-3xl bg-gradient-to-br from-[#FFFDFB] via-[#FDF5F7] to-[#F7DCE5] p-2 shadow-2xl border-2 border-[#D9BC91] overflow-hidden">
            {/* Elegant Background Lattice Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#D9BC91_1.4px,transparent_1.4px)] [background-size:20px_20px] opacity-35" />

            {/* Envelope Top Triangle Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-[52%] bg-gradient-to-b from-[#FFF5F8] via-[#FDF0F5] to-[#F2CEDC] border-b-2 border-[#D9BC91] shadow-md flex items-center justify-center z-20"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              {/* Pulsing Glowing Crimson & Gold Wax Seal */}
              <motion.div
                className="absolute -bottom-7 w-16 h-16 rounded-full bg-gradient-to-tr from-[#660E2C] via-[#7E163B] to-[#C87997] shadow-2xl flex items-center justify-center border-2 border-[#D9BC91] cursor-pointer"
                whileHover={{ scale: 1.15 }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(102, 14, 44, 0.5), 0 0 4px rgba(217, 188, 145, 0.6)',
                    '0 0 28px rgba(102, 14, 44, 0.9), 0 0 14px rgba(217, 188, 145, 0.9)',
                    '0 0 12px rgba(102, 14, 44, 0.5), 0 0 4px rgba(217, 188, 145, 0.6)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-[#FFF9F3] fill-current" />
              </motion.div>
            </div>

            {/* Envelope Bottom Pocket with Ultra High-Contrast Text */}
            <div
              className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#F7DCE5] via-[#FFF9F3] to-[#FFFDFB] border-t border-[#D9BC91]/50 z-10 flex flex-col items-center justify-end pb-5 px-6 text-center"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 48%, 0 0)' }}
            >
              <p className="font-serif-display text-base sm:text-lg text-[#110D0F] font-extrabold tracking-wide">
                To My Best Friend & Favorite Person
              </p>
              <p className="text-xs text-[#660E2C] font-extrabold tracking-widest uppercase mt-1 flex items-center gap-1.5 justify-center">
                <Star className="w-3.5 h-3.5 text-[#B45309] fill-current" />
                <span>With All My Love, Care & Sincerity</span>
                <Star className="w-3.5 h-3.5 text-[#B45309] fill-current" />
              </p>
            </div>
          </div>

          {/* Pulse instruction prompt - Rich Burgundy */}
          <motion.div
            className="mt-4 text-center text-xs sm:text-sm tracking-wider uppercase text-[#660E2C] font-extrabold flex items-center justify-center gap-2 bg-white/95 px-5 py-2 rounded-full border-2 border-[#D9BC91] shadow-md"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>Tap the wax seal to open my letter</span>
            <Sparkles className="w-4 h-4 text-[#B45309]" />
          </motion.div>
        </motion.div>
      ) : (
        /* 
          Case 2: Fully Opened & Unfolded Love Letter Card
          100% Unclipped, Ultra High-Contrast, Crystal-Clear Readability!
        */
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative w-full max-w-lg mx-auto"
        >
          {/* Decorative Washi Tapes on Top */}
          <div className="washi-tape-gold -top-3 left-8 z-30" />
          <div className="washi-tape -top-3 right-8 z-30" />

          <div className="letter-paper rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-[#D9BC91] bg-[#FFFDFB] relative">
            {/* Header: Title and Icons - Crystal Clear Burgundy Script */}
            <div className="flex items-center justify-between border-b-2 border-[#D9BC91]/60 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <MailOpen className="w-6 h-6 text-[#660E2C]" />
                <h3 className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold tracking-wide">
                  From My Heart to Yours
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B45309] fill-current" />
                <Heart className="w-5 h-5 text-[#660E2C] fill-current" />
              </div>
            </div>

            {/* The Main Heartfelt Message - Deep Obsidian Black, Bold & Legible */}
            <p className="font-serif-display text-xl sm:text-2xl text-[#110D0F] font-bold italic leading-relaxed text-center px-2 py-3">
              "Some bonds are too precious to ever take for granted. You are my greatest comfort, my best friend, and my whole heart."
            </p>

            {/* Bottom Sincerity Tag & Fold Back Option */}
            <div className="mt-5 pt-4 border-t-2 border-[#D9BC91]/60 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
              <div>
                <p className="font-serif-display text-sm sm:text-base text-[#110D0F] font-bold">
                  To My Best Friend & Favorite Person
                </p>
                <p className="text-xs text-[#660E2C] font-extrabold tracking-wider uppercase flex items-center gap-1 justify-center sm:justify-start mt-0.5">
                  <Star className="w-3 h-3 text-[#B45309] fill-current" />
                  <span>Unfolded with all my love for you</span>
                </p>
              </div>

              {onCloseLetter && (
                <button
                  onClick={onCloseLetter}
                  className="text-xs text-[#660E2C] hover:text-[#110D0F] font-bold tracking-wider uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF5F8] border border-[#D9BC91] hover:border-[#660E2C] transition-all cursor-pointer shadow-xs"
                  title="Fold letter back"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Fold letter</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
