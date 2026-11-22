import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const FinalMemory: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel-gold rounded-3xl p-8 sm:p-12 border-2 border-[#D9BC91] shadow-2xl relative overflow-hidden"
      >
        <span className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold block mb-2">
          From Here, Forward
        </span>
        <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[#110D0F] font-extrabold mb-4">
          Actions That Speak Louder Than Words
        </h3>
        <p className="font-editorial text-lg sm:text-xl md:text-2xl text-[#1A1215] italic font-bold leading-relaxed max-w-2xl mx-auto mb-6">
          "I know an apology is not an ending—it is a beginning of listening better, loving gentler, and showing up with consistency. Whatever time you need, I am here with patience and respect."
        </p>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#660E2C]">
          <Sparkles className="w-4 h-4 text-[#B45309]" />
          <span>With Eternal Care & Patience</span>
          <Heart className="w-4 h-4 text-[#660E2C] fill-current" />
        </div>
      </motion.div>
    </section>
  );
};
