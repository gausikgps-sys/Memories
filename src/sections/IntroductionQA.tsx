import React, { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { questionsData } from '../data/questions';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Sparkles } from 'lucide-react';

interface IntroductionQAProps {
  onComplete: () => void;
}

export const IntroductionQA: React.FC<IntroductionQAProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="intro-qa" className="py-20 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="font-script text-3xl sm:text-4xl text-[#660E2C] font-extrabold block mb-1">
          A Gentle Conversation
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#110D0F] font-extrabold">
          A Few Honest Reflections
        </h2>
        <p className="font-editorial text-lg sm:text-xl text-[#1A1215] italic font-semibold mt-2.5 max-w-lg mx-auto">
          Before we step into our memories, take a moment to answer with whatever feels comfortable.
        </p>
      </motion.div>

      <QuestionCard
        question={questionsData[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={questionsData.length}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoBack={currentQuestionIndex > 0}
        onCompleteAll={onComplete}
      />
    </section>
  );
};
