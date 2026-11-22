import React from 'react';
import { motion } from 'framer-motion';
import { promisesData } from '../data/promises';
import { PromiseCard } from '../components/PromiseCard';
import { Sparkles, Heart } from 'lucide-react';

export const MyPromises: React.FC = () => {
  return (
    <section id="promises" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold block mb-1">
          A Commitment for Tomorrow
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#110D0F] font-extrabold">
          Things I Want To Do Better
        </h2>
        <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold mt-2.5 max-w-xl mx-auto">
          Not just promises made in the moment, but commitments I will carry into how I treat you, listen to you, and respect you every day.
        </p>
      </motion.div>

      {/* Grid of Promise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {promisesData.map((promise, index) => (
          <PromiseCard key={promise.id} promise={promise} index={index} />
        ))}
      </div>

      {/* Sincere commitment quote */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-14 text-center max-w-lg mx-auto p-5 rounded-2xl bg-white/95 border-2 border-[#D9BC91] shadow-lg"
      >
        <p className="font-serif-display italic font-bold text-lg text-[#110D0F]">
          "Trust is rebuilt one patient, honest, and loving choice at a time."
        </p>
      </motion.div>
    </section>
  );
};
