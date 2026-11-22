import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'welcome', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'intro-qa', label: 'Our Thoughts' },
    { id: 'mixed-memories', label: 'Memories' },
    { id: 'heart-to-heart', label: 'Apology Letter' },
    { id: 'promises', label: 'Promises' },
    { id: 'cinematic-film', label: 'Our Film' },
    { id: 'closing', label: 'With Love' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel-gold border-b-2 border-[#D9BC91] py-2.5 shadow-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Title */}
        <button
          onClick={() => handleNavClick('welcome')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7E163B] to-[#C87997] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </div>
          <div>
            <span className="font-serif-display font-extrabold text-sm sm:text-base text-[#1A1215] tracking-wide block">
              A Journey From My Heart
            </span>
            <span className="font-script text-xs sm:text-sm text-[#7E163B] font-bold -mt-1 block">
              Forever Cherished
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#7E163B] text-white shadow-xs'
                  : 'text-[#1A1215] hover:text-[#7E163B] hover:bg-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#1A1215] hover:bg-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel-gold border-b-2 border-[#D9BC91] px-6 py-4 space-y-2 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#7E163B] text-white shadow-xs'
                    : 'text-[#1A1215] hover:bg-white/80'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <Sparkles className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
