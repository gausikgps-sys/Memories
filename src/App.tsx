import React, { useState } from 'react';
import { RomanticBackground } from './components/RomanticBackground';
import { FloatingHearts } from './components/FloatingHearts';
import { MagicSparkleTrail } from './components/MagicSparkleTrail';
import { Navbar } from './components/Navbar';
import { ProgressIndicator } from './components/ProgressIndicator';
import { AudioPlayer } from './components/AudioPlayer';
import { Welcome } from './sections/Welcome';
import { IntroductionQA } from './sections/IntroductionQA';
import { MixedMemories } from './sections/MixedMemories';
import { PhotoGallery } from './components/PhotoGallery';
import { HeartToHeart } from './sections/HeartToHeart';
import { MyPromises } from './sections/MyPromises';
import { VideoMemories } from './sections/VideoMemories';
import { FinalMemory } from './sections/FinalMemory';
import { ClosingPage } from './components/ClosingPage';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [audioTrigger, setAudioTrigger] = useState(false);

  const handleStartJourney = () => {
    // Start gentle romantic music on user gesture
    setAudioTrigger(true);
    // Smooth scroll to Q&A section
    const qaEl = document.getElementById('intro-qa');
    if (qaEl) {
      qaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQAComplete = () => {
    const memEl = document.getElementById('mixed-memories');
    if (memEl) {
      memEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewMemories = () => {
    const memEl = document.getElementById('mixed-memories');
    if (memEl) {
      memEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayVoiceNote = () => {
    setAudioTrigger(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F3] text-[#110D0F] selection:bg-[#E9A9BD]/30 selection:text-[#110D0F] overflow-x-hidden">
      {/* Visual Ambiance: Romantic & Friendship Golden Glow + Canvas Petals & Constellations */}
      <RomanticBackground intensity="rich" />

      {/* Floating Gentle Hearts */}
      <FloatingHearts />

      {/* Interactive Cursor / Touch Magic Sparkle Trail */}
      <MagicSparkleTrail />

      {/* Top Reading Progress Bar */}
      <ProgressIndicator />

      {/* Fixed Luxury Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Floating Persistent Audio Player */}
      <AudioPlayer autoPlayTrigger={audioTrigger} />

      {/* Main Continuous Journey */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Welcome Screen */}
        <Welcome onStartJourney={handleStartJourney} />

        {/* 2. Interactive Q&A */}
        <IntroductionQA onComplete={handleQAComplete} />

        {/* 3. Mixed Memory Storytelling Engine */}
        <MixedMemories />

        {/* 4. Complete Photography Gallery & Lightbox */}
        <PhotoGallery />

        {/* 5. Heart-to-Heart Apology & Voice Note */}
        <HeartToHeart onPlayVoiceNote={handlePlayVoiceNote} />

        {/* 6. Personal Promises */}
        <MyPromises />

        {/* 7. Video Memories & Edited Cinematic Montage */}
        <VideoMemories />

        {/* 8. Poetic Bridge */}
        <FinalMemory />

        {/* 9. Peaceful Closing Page (Final Destination) */}
        <ClosingPage onReplay={handleReplay} onViewMemories={handleViewMemories} />
      </main>
    </div>
  );
};

export default App;
