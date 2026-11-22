import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, Sparkles, Feather, Pause, Play } from 'lucide-react';
import { apologyLetterContent } from '../data/messages';

interface ApologyLetterProps {
  onPlayVoiceNote?: () => void;
}

export const ApologyLetter: React.FC<ApologyLetterProps> = ({ onPlayVoiceNote }) => {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleVoicePlay = () => {
    if (!voiceAudioRef.current) return;
    if (isVoicePlaying) {
      voiceAudioRef.current.pause();
      setIsVoicePlaying(false);
    } else {
      voiceAudioRef.current.play().then(() => {
        setIsVoicePlaying(true);
      }).catch((e) => {
        console.log('Voice note play error:', e);
      });
    }

    if (onPlayVoiceNote) {
      onPlayVoiceNote();
    }
  };

  return (
    <section id="heart-to-heart" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Hidden Audio Element for Voice Message */}
      <audio
        ref={voiceAudioRef}
        src="/audio/voice-message.mp3"
        onEnded={() => setIsVoicePlaying(false)}
      />

      {/* Decorative header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold block mb-1">
          Words Spoken in Honesty
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#110D0F] font-extrabold">
          {apologyLetterContent.title}
        </h2>
        <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold mt-2.5 max-w-lg mx-auto">
          {apologyLetterContent.subtitle}
        </p>
      </motion.div>

      {/* Luxury Letter Paper Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="letter-paper rounded-3xl p-6 sm:p-10 md:p-14 relative shadow-2xl border-2 border-[#D9BC91]"
      >
        {/* Decorative corner embellishments */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#B45309] rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#B45309] rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#B45309] rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#B45309] rounded-br-lg" />

        {/* Letter Top Stamp */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#D9BC91]/50 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#660E2C] via-[#8B1E48] to-[#C87997] flex items-center justify-center text-white shadow-md">
              <Feather className="w-6 h-6" />
            </div>
            <div>
              <p className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold">
                {apologyLetterContent.recipientName}
              </p>
              <p className="text-xs text-[#110D0F] tracking-wider uppercase font-extrabold">
                An open letter written with complete sincerity
              </p>
            </div>
          </div>

          {/* Voice note trigger button */}
          <button
            onClick={handleVoicePlay}
            className={`px-5 py-2.5 rounded-full border-2 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer group ${
              isVoicePlaying
                ? 'bg-[#660E2C] text-white border-[#660E2C]'
                : 'bg-white hover:bg-[#FFFDF9] border-[#660E2C] text-[#660E2C]'
            }`}
          >
            {isVoicePlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
            <span>{isVoicePlaying ? 'Playing Voice Note...' : 'Listen to Voice Message'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
          </button>
        </div>

        {/* Letter Body Paragraphs - High Contrast Dark Ink Typography */}
        <div className="space-y-6 font-editorial text-lg sm:text-xl md:text-2xl text-[#110D0F] font-semibold leading-relaxed">
          {apologyLetterContent.letterParagraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`${
                idx === 1 || idx === apologyLetterContent.letterParagraphs.length - 1
                  ? 'font-serif-display text-xl sm:text-2xl md:text-3xl text-[#660E2C] font-extrabold py-1.5'
                  : 'text-[#110D0F]'
              }`}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Letter Footer Signature */}
        <div className="mt-12 pt-8 border-t-2 border-[#D9BC91]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-editorial text-base text-[#1A1215] italic font-bold">
              With all my love and deepest sincerity,
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold mt-1">
              Always Yours ❤️
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#660E2C] uppercase tracking-wider bg-white/95 px-4 py-2 rounded-full border border-[#D9BC91] shadow-xs">
            <Heart className="w-4 h-4 text-[#660E2C] fill-current" />
            <span>Forever Cherished</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
