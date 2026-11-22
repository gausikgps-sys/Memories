import React from 'react';
import { motion } from 'framer-motion';
import { PromiseItem } from '../data/promises';
import {
  Heart,
  Ear,
  HeartHandshake,
  MessageCircleHeart,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface PromiseCardProps {
  promise: PromiseItem;
  index: number;
}

export const PromiseCard: React.FC<PromiseCardProps> = ({ promise, index }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Ear':
        return <Ear className="w-5 h-5 text-[#7E163B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#7E163B]" />;
      case 'MessageCircleHeart':
        return <MessageCircleHeart className="w-5 h-5 text-[#7E163B]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#7E163B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#7E163B]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#7E163B]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-[#D9BC91] shadow-2xl relative overflow-hidden flex flex-col justify-between group"
    >
      <div className="washi-tape-gold -top-3 right-8" />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#FFFDF9] border-2 border-[#D9BC91] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
            {getIcon(promise.iconName)}
          </div>
          <span className="text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-[#E9A9BD]/35 text-[#7E163B] border border-[#7E163B]/30">
            {promise.tag}
          </span>
        </div>

        <h4 className="font-script text-3xl text-[#7E163B] font-bold mb-2">
          {promise.title}
        </h4>

        {/* Crisp Dark Statement */}
        <p className="font-serif-display font-extrabold text-lg sm:text-xl text-[#1A1215] leading-snug mb-3">
          "{promise.statement}"
        </p>

        {/* High-Contrast Explanation */}
        <p className="font-editorial text-base sm:text-lg text-[#24161C] italic font-semibold leading-relaxed">
          {promise.explanation}
        </p>
      </div>

      {/* Bottom Photo Preview if associated */}
      {promise.associatedPhoto && (
        <div className="mt-5 pt-4 border-t-2 border-[#D9BC91]/40 flex items-center gap-3">
          <div className="w-13 h-13 rounded-xl overflow-hidden border-2 border-[#D9BC91] shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={promise.associatedPhoto}
              alt={promise.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-editorial italic font-bold text-[#1A1215]">
              Remembering why this matters so deeply
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#7E163B] font-bold uppercase tracking-wider mt-0.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Dedicated To You</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
