import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isHeart: boolean;
}

export const MagicSparkleTrail: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const colors = ['#E9A9BD', '#C87997', '#D9BC91', '#FDE68A', '#F7DCE5'];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 65) return; // limit frequency for 60fps
      lastTime = now;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const newSparkle: Sparkle = {
        id: now + Math.random(),
        x: clientX + (Math.random() - 0.5) * 16,
        y: clientY + (Math.random() - 0.5) * 16,
        size: Math.random() * 8 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.45,
      };

      setSparkles((prev) => [...prev.slice(-18), newSparkle]);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0.3, x: s.x, y: s.y }}
            animate={{
              opacity: 0,
              scale: 1.15,
              y: s.y - 28,
              x: s.x + (Math.sin(s.id) * 14),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setSparkles((prev) => prev.filter((item) => item.id !== s.id));
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ width: s.size, height: s.size }}
          >
            {s.isHeart ? (
              <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full drop-shadow-[0_0_6px_rgba(233,169,189,0.7)]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill={s.color} className="w-full h-full drop-shadow-[0_0_6px_rgba(253,230,138,0.8)]">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

