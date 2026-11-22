import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope } from '../components/Envelope';
import { welcomeContent } from '../data/messages';
import { Heart, Sparkles, Clock, ArrowDown } from 'lucide-react';

interface WelcomeProps {
  onStartJourney: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStartJourney }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showLaterModal, setShowLaterModal] = useState(false);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
  };

  return (
    <section
      id="welcome"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center pt-12 pb-10 px-4 sm:px-6 text-center z-10"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
        {/* Top Romantic & Friendship Badge - High Contrast Burgundy & Gold */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 border-2 border-[#D9BC91] text-[#660E2C] text-xs font-extrabold tracking-wider uppercase mb-3 shadow-md backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
          <span>Best Friends First • Always in My Heart</span>
          <Heart className="w-3.5 h-3.5 text-[#660E2C] fill-current" />
        </motion.div>

        {/* Main Heading - Deep Obsidian Black */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#110D0F] font-extrabold tracking-tight leading-[1.18]"
        >
          {welcomeContent.heading}
        </motion.h1>

        {/* Subheading - High Contrast Velvet Espresso Charcoal */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="font-editorial text-lg sm:text-xl md:text-2xl text-[#1A1215] font-bold italic mt-3 max-w-xl leading-relaxed"
        >
          {welcomeContent.subheading}
        </motion.p>

        {/* Interactive Envelope with Sealed and Unfolded states */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full my-4"
        >
          <Envelope
            isOpen={isLetterOpen}
            onOpenLetter={handleOpenLetter}
            onCloseLetter={handleCloseLetter}
          />
        </motion.div>

        {/* 
          CRITICAL USER REQUIREMENT:
          Only when she presses the letter does the "Open My Little Surprise" button appear!
          When unopened, these buttons are 100% hidden.
        */}
        <AnimatePresence>
          {isLetterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onStartJourney}
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#660E2C] via-[#8B1E48] to-[#C87997] text-white font-extrabold text-base shadow-2xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer transition-all border-2 border-white/70 animate-pulse-glow"
              >
                <span>{welcomeContent.primaryButtonText}</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLaterModal(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#FFFDF9] text-[#110D0F] hover:text-[#660E2C] border-2 border-[#D9BC91] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                {welcomeContent.secondaryButtonText}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Respectful "Maybe Later" Modal */}
      <AnimatePresence>
        {showLaterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowLaterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-gold rounded-3xl p-7 sm:p-9 max-w-md w-full text-center shadow-2xl border-2 border-[#D9BC91]"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFF9F3] border-2 border-[#D9BC91] flex items-center justify-center mx-auto mb-4 text-[#660E2C] shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#110D0F] font-bold mb-2">
                Take All The Time You Need
              </h3>
              <p className="font-editorial text-lg text-[#1A1215] font-semibold italic leading-relaxed mb-6">
                "{welcomeContent.politeLaterMessage}"
              </p>
              <button
                onClick={() => setShowLaterModal(false)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#660E2C] to-[#C87997] text-white font-bold text-sm shadow-md hover:shadow-lg cursor-pointer transition-shadow"
              >
                I Understand Completely ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
