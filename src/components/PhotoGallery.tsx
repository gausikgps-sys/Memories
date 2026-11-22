import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoItem, photosData } from '../data/photos';
import { PhotoLightbox } from './PhotoLightbox';
import { Heart, Eye } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tags = ['All', 'Cherished', 'Smile', 'Together', 'Warmth', 'Glow'];

  const filteredPhotos =
    selectedTag === 'All'
      ? photosData
      : photosData.filter((p) => p.tag?.toLowerCase() === selectedTag.toLowerCase());

  const handleOpenLightbox = (photoId: string) => {
    const idx = photosData.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="font-script text-3xl sm:text-4xl text-[#7E163B] font-bold block mb-1">
          Moments in Stillness
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl text-[#1A1215] font-extrabold">
          Our Cherished Photographs
        </h3>
        <p className="font-editorial text-lg sm:text-xl text-[#24161C] italic font-semibold mt-2 max-w-xl mx-auto">
          Every snapshot holds an unrepeatable feeling. Click any photo to see it in full detail.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-[#7E163B] to-[#C87997] text-white shadow-md'
                : 'bg-white text-[#1A1215] hover:bg-[#FFFDF9] hover:text-[#7E163B] border border-[#D9BC91]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Responsive Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group cursor-pointer"
            onClick={() => handleOpenLightbox(photo.id)}
          >
            <div className="polaroid-card rounded-2xl relative overflow-hidden">
              {/* Photo Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F7DCE5]/30">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    if (photo.fallbackSrc && e.currentTarget.src !== photo.fallbackSrc) {
                      e.currentTarget.src = photo.fallbackSrc;
                    }
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white flex items-center gap-1.5 text-xs font-bold">
                    <Eye className="w-4 h-4" /> View Fullscreen
                  </div>
                </div>

                {/* Tag Badge */}
                {photo.tag && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-[#7E163B] backdrop-blur-xs shadow-md border border-[#D9BC91]/50">
                    {photo.tag}
                  </span>
                )}
              </div>

              {/* Polaroid Bottom Caption - Bold High Contrast */}
              <div className="pt-3 px-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-display font-bold text-base text-[#1A1215] truncate">
                    {photo.title}
                  </h4>
                  <Heart className="w-4 h-4 text-[#7E163B] fill-current" />
                </div>
                <p className="font-editorial text-sm text-[#24161C] italic font-semibold mt-1 line-clamp-2">
                  "{photo.caption}"
                </p>
                {photo.date && (
                  <p className="text-[11px] text-[#7E163B] font-bold font-sans tracking-wider uppercase mt-2">
                    {photo.date}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={photosData}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % photosData.length);
          }
        }}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + photosData.length) % photosData.length);
          }
        }}
      />
    </section>
  );
};
