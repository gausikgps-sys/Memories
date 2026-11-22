import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { Film, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CinematicMontageProps {
  montageSrc?: string;
  posterSrc?: string;
}

export const CinematicMontage: React.FC<CinematicMontageProps> = ({
  montageSrc = '/media/our-story-montage.mp4',
  posterSrc = '/images/memories/photo_01.jpg',
}) => {
  return (
    <section id="cinematic-film" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 border-2 border-[#D9BC91] text-[#660E2C] text-xs font-extrabold tracking-wider uppercase mb-3 shadow-md">
          <Film className="w-3.5 h-3.5 text-[#660E2C]" />
          <span>Cinematic Short Film</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
        </div>
        <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#110D0F] font-extrabold leading-tight">
          A Journey From My Heart
        </h3>
        <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold mt-2.5 max-w-xl mx-auto">
          An actual edited montage of our real moments, soft smiles, and laughter, accompanied by gentle piano music.
        </p>
      </motion.div>

      {/* Cinematic Theater Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#2D1E26] via-[#20141A] to-[#160D12] shadow-2xl border-2 border-[#D9BC91]"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <VideoPlayer
            src={montageSrc}
            poster={posterSrc}
            title="Our Story • Cinematic Montage"
            description="Our genuine memories woven together into one continuous film."
            aspectRatio="landscape"
          />
        </div>

        {/* Film metadata bar */}
        <div className="pt-4 pb-2 px-3 flex flex-col sm:flex-row items-center justify-between text-white/90 text-xs sm:text-sm font-bold gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9A9BD] animate-ping" />
            <span className="font-mono text-white">HD 720p • H.264 • Real Studio Acoustic Piano</span>
          </div>
          <div className="font-editorial italic text-base text-[#FDE68A] flex items-center gap-1.5 font-bold">
            <Heart className="w-4 h-4 text-[#E9A9BD] fill-current" />
            Made with all my sincerity for you
          </div>
        </div>
      </motion.div>
    </section>
  );
};
