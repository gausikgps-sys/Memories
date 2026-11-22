import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Calendar, Tag, Heart } from 'lucide-react';
import { PhotoItem } from '../data/photos';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const activePhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  // Reset zoom & error on photo change
  useEffect(() => {
    setIsZoomed(false);
    setImgError(false);
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, onNext, onPrev]);

  if (selectedIndex === null || !activePhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
            <span className="font-semibold text-white">
              {selectedIndex + 1} / {photos.length}
            </span>
            {activePhoto.tag && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[#FFF9F3] text-xs">
                {activePhoto.tag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              aria-label="Toggle zoom"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-transform active:scale-95 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-transform active:scale-95 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Media Card */}
        <div
          className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.25 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden rounded-2xl shadow-2xl bg-black/40 flex items-center justify-center cursor-pointer transition-transform ${
              isZoomed ? 'overflow-auto max-h-[80vh]' : ''
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={imgError && activePhoto.fallbackSrc ? activePhoto.fallbackSrc : activePhoto.src}
              alt={activePhoto.title}
              onError={() => {
                if (!imgError && activePhoto.fallbackSrc) {
                  setImgError(true);
                }
              }}
              className="max-h-[68vh] sm:max-h-[72vh] w-auto object-contain rounded-xl select-none"
              loading="lazy"
            />
          </motion.div>

          {/* Photo Caption & Date */}
          <div className="w-full text-center mt-4 px-4">
            <h4 className="font-serif-display text-lg sm:text-xl text-white font-medium">
              {activePhoto.title}
            </h4>
            <p className="font-editorial text-sm sm:text-base text-[#E9A9BD] italic mt-1 max-w-lg mx-auto">
              "{activePhoto.caption}"
            </p>
            {activePhoto.date && (
              <p className="text-xs text-white/60 mt-1 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" /> {activePhoto.date}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

