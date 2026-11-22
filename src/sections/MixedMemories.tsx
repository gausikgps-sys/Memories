import React from 'react';
import { motion } from 'framer-motion';
import { memoriesStory, MemoryStoryItem } from '../data/memories';
import { VideoPlayer } from '../components/VideoPlayer';
import { Heart, Sparkles, Calendar, Quote, Film, ArrowRight, Smile, Star, Users } from 'lucide-react';

export const MixedMemories: React.FC = () => {
  const renderMemoryItem = (item: MemoryStoryItem, index: number) => {
    switch (item.layoutType) {
      // 1. Full-width featured photograph
      case 'full-width-featured':
        return (
          <div key={item.id} className="relative rounded-3xl overflow-hidden shadow-2xl my-14 border-2 border-[#D9BC91]">
            <div className="washi-tape-gold -top-2 left-8 z-30" />
            <div className="washi-tape -top-2 right-8 z-30" />

            <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[340px] overflow-hidden">
              <motion.img
                src={item.imageSrc}
                alt={item.title}
                whileHover={{ scale: 1.035 }}
                transition={{ duration: 0.9 }}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#FDE68A] flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" /> {item.subtitle || 'Featured Memory'}
                  </span>
                  <span className="text-xs text-white font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#E9A9BD]" /> Best Friends & Soulmates
                  </span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-md">
                  {item.title}
                </h3>
                <p className="font-editorial italic text-base sm:text-lg text-white font-semibold max-w-2xl leading-relaxed drop-shadow-sm">
                  "{item.description}"
                </p>
                {item.personalMessage && (
                  <p className="text-sm text-[#FDE68A] mt-3 font-bold flex items-center gap-1.5 drop-shadow-sm">
                    <Heart className="w-4 h-4 fill-current text-[#E9A9BD]" />
                    {item.personalMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      // 2. Overlapping Polaroid cards with Friendship Stickers
      case 'polaroid-duo':
        return (
          <div key={item.id} className="my-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#D9BC91]/35 text-[#7E163B] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D9BC91]">
                <Smile className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Friendship & Laughter</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-extrabold mb-3">
                {item.title}
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#24161C] leading-relaxed italic font-semibold mb-4">
                {item.description}
              </p>
              {item.personalMessage && (
                <div className="p-4 rounded-2xl glass-panel-gold border-2 border-[#D9BC91] shadow-xs">
                  <p className="text-sm text-[#7E163B] font-bold leading-relaxed flex items-start gap-2">
                    <Heart className="w-4 h-4 text-[#7E163B] fill-current shrink-0 mt-0.5" />
                    <span>"{item.personalMessage}"</span>
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-7 order-1 md:order-2 relative flex items-center justify-center py-6">
              {/* First Polaroid */}
              <motion.div
                whileHover={{ rotate: 0, scale: 1.06, zIndex: 25 }}
                className="polaroid-card rounded-2xl w-52 sm:w-64 rotate-[-6deg] shadow-xl z-10"
              >
                <div className="washi-tape-gold -top-3 left-6" />
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F7DCE5]/20">
                  <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <p className="font-editorial italic text-sm text-[#1A1215] font-bold">
                    Unfiltered Smiles
                  </p>
                  <Star className="w-3.5 h-3.5 text-[#B45309] fill-current" />
                </div>
              </motion.div>

              {/* Second Polaroid */}
              {item.secondaryImageSrc && (
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.06, zIndex: 25 }}
                  className="polaroid-card rounded-2xl w-52 sm:w-64 rotate-[8deg] -ml-16 sm:-ml-20 shadow-2xl z-5"
                >
                  <div className="washi-tape -top-3 right-6" />
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F7DCE5]/20">
                    <img src={item.secondaryImageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <p className="font-editorial italic text-sm text-[#1A1215] font-bold">
                      Partners in Crime
                    </p>
                    <Heart className="w-3.5 h-3.5 text-[#7E163B] fill-current" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );

      // 3. Video followed by personal message
      case 'video-and-message':
        return (
          <div key={item.id} className="my-16 glass-panel-gold rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#D9BC91] shadow-2xl relative">
            <div className="washi-tape-gold -top-3 right-12" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <VideoPlayer
                  src={item.videoSrc || '/videos/video_01.mp4'}
                  poster={item.videoPoster}
                  title={item.title}
                  aspectRatio="landscape"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7E163B] uppercase tracking-wider mb-2">
                  <Film className="w-4 h-4 text-[#7E163B]" />
                  <span>Candid Video Memory</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-extrabold mb-3">
                  {item.title}
                </h3>
                <p className="font-editorial text-base sm:text-lg text-[#24161C] italic font-semibold mb-4 leading-relaxed">
                  "{item.description}"
                </p>
                {item.quote && (
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border-l-4 border-[#7E163B] mb-4 shadow-sm border border-[#D9BC91]/40">
                    <p className="font-editorial italic text-base text-[#1A1215] font-bold">
                      {item.quote}
                    </p>
                  </div>
                )}
                {item.personalMessage && (
                  <p className="text-sm text-[#7E163B] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B45309]" />
                    {item.personalMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      // 4. Side-by-side photo and heartfelt text
      case 'side-by-side-photo-text':
        return (
          <div key={item.id} className="my-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 relative">
              <div className="washi-tape-gold -top-3 left-10" />
              <div className="polaroid-card rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="font-editorial italic text-center text-sm text-[#1A1215] font-bold mt-3">
                  Step by Step • Hand in Hand
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <span className="font-script text-2xl sm:text-3xl text-[#7E163B] font-bold block mb-1">
                {item.subtitle}
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-extrabold mb-4">
                {item.title}
              </h3>
              <p className="font-editorial text-lg text-[#24161C] font-semibold leading-relaxed mb-4">
                {item.description}
              </p>
              {item.quote && (
                <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D9BC91] mb-4 shadow-xs">
                  <p className="font-editorial italic text-base text-[#1A1215] font-bold">
                    "{item.quote}"
                  </p>
                </div>
              )}
              {item.personalMessage && (
                <p className="text-sm text-[#7E163B] font-bold flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-current shrink-0" />
                  <span>{item.personalMessage}</span>
                </p>
              )}
            </div>
          </div>
        );

      // 5. Photo collage
      case 'photo-collage':
        return (
          <div key={item.id} className="my-16 glass-panel-gold rounded-3xl p-6 sm:p-10 border-2 border-[#D9BC91] shadow-2xl relative">
            <div className="washi-tape -top-3 left-12" />
            <div className="washi-tape-gold -top-3 right-12" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="font-script text-2xl sm:text-3xl text-[#7E163B] font-bold block mb-1">{item.subtitle}</span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-extrabold">
                {item.title}
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#24161C] italic font-semibold mt-2">
                {item.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="polaroid-card rounded-2xl">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <img src={item.imageSrc} alt="Mosaic 1" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="font-editorial italic text-xs sm:text-sm text-center text-[#1A1215] font-bold mt-2">
                  Quiet Glances & Endless Comfort
                </p>
              </div>
              {item.secondaryImageSrc && (
                <div className="polaroid-card rounded-2xl">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden">
                    <img src={item.secondaryImageSrc} alt="Mosaic 2" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="font-editorial italic text-xs sm:text-sm text-center text-[#1A1215] font-bold mt-2">
                    Warm Presence & Soft Laughter
                  </p>
                </div>
              )}
            </div>
            {item.personalMessage && (
              <div className="text-center mt-6">
                <p className="font-editorial italic text-base sm:text-lg text-[#7E163B] font-bold">
                  "{item.personalMessage}"
                </p>
              </div>
            )}
          </div>
        );

      // 6. Cinematic Video Spotlight
      case 'cinematic-video-spotlight':
        return (
          <div key={item.id} className="my-16 max-w-3xl mx-auto text-center">
            <span className="font-script text-2xl sm:text-3xl text-[#7E163B] font-bold block mb-1">{item.subtitle}</span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-extrabold mb-3">
              {item.title}
            </h3>
            <p className="font-editorial text-base sm:text-lg text-[#24161C] italic font-semibold mb-6">
              {item.description}
            </p>
            <VideoPlayer
              src={item.videoSrc || '/videos/video_02.mp4'}
              poster={item.videoPoster}
              title={item.title}
              aspectRatio="landscape"
            />
            {item.personalMessage && (
              <p className="font-editorial italic text-base text-[#7E163B] font-bold mt-4">
                "{item.personalMessage}"
              </p>
            )}
          </div>
        );

      // 7. Promise Pairing beside photo
      case 'promise-pairing':
        return (
          <div key={item.id} className="my-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-[#D9BC91] shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#7E163B] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>A Promise Born from a Memory</span>
                </div>
                <h3 className="font-serif-display text-2xl text-[#1A1215] font-extrabold mb-3">
                  {item.title}
                </h3>
                <p className="font-editorial text-base text-[#24161C] italic font-semibold mb-4 leading-relaxed">
                  {item.description}
                </p>
                {item.personalMessage && (
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D9BC91] shadow-xs">
                    <p className="font-serif-display text-sm sm:text-base text-[#7E163B] font-bold">
                      "{item.personalMessage}"
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="washi-tape-gold -top-3 left-12" />
              <div className="polaroid-card rounded-3xl max-w-sm mx-auto shadow-2xl">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="font-editorial italic text-center text-sm text-[#1A1215] font-bold mt-3">
                  Growing Together Everyday
                </p>
              </div>
            </div>
          </div>
        );

      // 8. Handwritten moment
      case 'handwritten-moment':
        return (
          <div key={item.id} className="my-16 letter-paper rounded-3xl p-6 sm:p-10 border-2 border-[#D9BC91] shadow-2xl max-w-3xl mx-auto relative">
            <div className="flex items-center justify-between border-b-2 border-[#D9BC91]/40 pb-4 mb-6">
              <span className="font-script text-2xl sm:text-3xl text-[#7E163B] font-bold">{item.title}</span>
              <Heart className="w-6 h-6 text-[#7E163B] fill-current" />
            </div>
            <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold leading-relaxed mb-4">
              "{item.description}"
            </p>
            {item.personalMessage && (
              <p className="font-serif-display text-base sm:text-lg text-[#7E163B] font-bold">
                {item.personalMessage}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="mixed-memories" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Story Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="font-script text-3xl sm:text-4xl text-[#7E163B] font-bold block mb-1">
          Our Journey, Woven Together
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1A1215] font-extrabold">
          Memories That Live in My Heart
        </h2>
        <p className="font-editorial text-lg sm:text-xl text-[#24161C] font-semibold italic mt-3 max-w-xl mx-auto">
          "Some moments may seem small, but they become the memories we carry with us forever."
        </p>
      </motion.div>

      {/* Sequential Storytelling Engine */}
      <div className="space-y-8">
        {memoriesStory.map((item, index) => renderMemoryItem(item, index))}
      </div>
    </section>
  );
};
