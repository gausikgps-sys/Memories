import React, { useEffect, useState } from 'react';

export const ProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / (windowHeight || 1);
      setScrollProgress(Math.min(100, Math.max(0, scroll * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#D9BC91] via-[#E9A9BD] to-[#C87997] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(200,121,151,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

