import React from 'react';
import { motion } from 'framer-motion';
import { videosData } from '../data/videos';
import { VideoPlayer } from '../components/VideoPlayer';
import { CinematicMontage } from '../components/CinematicMontage';
import { Film, Sparkles, Heart } from 'lucide-react';

export const VideoMemories: React.FC = () => {
  return (
    <section id="videos" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Cinematic Montage Feature */}
      <CinematicMontage />

      {/* Video Clips Gallery */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <span className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold block mb-1">
            Moments in Motion
          </span>
          <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#110D0F] font-extrabold">
            Our Video Memories
          </h3>
          <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold mt-2.5 max-w-xl mx-auto">
            Short snippets that capture our authentic smiles, our laughter, and the simple beauty of being together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videosData.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel-gold rounded-3xl p-4 sm:p-5 border-2 border-[#D9BC91] shadow-xl flex flex-col justify-between"
            >
              <div className="rounded-2xl overflow-hidden mb-3 bg-black">
                <VideoPlayer
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  aspectRatio={video.orientation}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif-display font-extrabold text-lg text-[#110D0F] truncate">
                    {video.title}
                  </h4>
                  <Heart className="w-4 h-4 text-[#660E2C] fill-current shrink-0" />
                </div>
                <p className="font-editorial italic font-semibold text-sm sm:text-base text-[#1A1215] leading-relaxed">
                  "{video.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
