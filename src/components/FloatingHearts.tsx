import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartSparkle[]>([]);

  useEffect(() => {
    // Generate gentle periodic hearts
    const interval = setInterval(() => {
      const colors = ['#E9A9BD', '#C87997', '#D6A2B5', '#D9BC91'];
      const newHeart: HeartSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 85 + 7, // 7% to 92% screen width
        y: 105, // start slightly below screen
        size: Math.random() * 12 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setHearts((prev) => [...prev.slice(-14), newHeart]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, scale: 0.4, y: '100vh', x: `${h.x}vw` }}
            animate={{
              opacity: [0, 0.75, 0.7, 0],
              scale: [0.4, 1, 0.95, 0.6],
              y: '-10vh',
              x: [`${h.x}vw`, `${h.x + (Math.sin(h.id) * 4)}vw`],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 4,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => {
              setHearts((prev) => prev.filter((item) => item.id !== h.id));
            }}
            className="absolute"
            style={{ width: h.size, height: h.size }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={h.color}
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(200,121,151,0.3)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

