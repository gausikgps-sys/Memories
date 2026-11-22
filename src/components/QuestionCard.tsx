import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QAQuestion } from '../data/questions';
import { Heart, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: QAQuestion;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  onCompleteAll: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
  canGoBack,
  onCompleteAll,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
  };

  const handleContinue = () => {
    if (currentIndex === totalQuestions - 1) {
      onCompleteAll();
    } else {
      setSelectedOptionIndex(null);
      onNext();
    }
  };

  const selectedOption = selectedOptionIndex !== null ? question.options[selectedOptionIndex] : null;

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-panel-gold rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#D9BC91] shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative heart watermark */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 text-[#F7DCE5]/60 pointer-events-none">
          <Heart className="w-full h-full fill-current" />
        </div>

        {/* Top Status & Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#7E163B] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-[#24161C]">
              Step {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          {canGoBack && (
            <button
              onClick={() => {
                setSelectedOptionIndex(null);
                onPrev();
              }}
              className="text-xs font-bold text-[#7E163B] hover:text-[#1A1215] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>
          )}
        </div>

        {/* Question Heading - High Contrast */}
        <div className="text-center mb-8">
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1A1215] font-bold leading-snug">
            {question.question}
          </h3>
          {question.subtext && (
            <p className="font-editorial text-base sm:text-lg text-[#24161C] mt-2 italic font-semibold">
              {question.subtext}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOptionIndex === idx;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-200 flex items-center justify-between cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#7E163B] to-[#C87997] text-white border-[#7E163B] shadow-lg'
                    : 'bg-white hover:bg-[#FFFDF9] text-[#1A1215] border-[#D9BC91] hover:border-[#7E163B] shadow-sm'
                }`}
              >
                <span className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[#7E163B]'
                    }`}
                  />
                  {opt.text}
                </span>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Heartfelt Response Box */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-6 pt-5 border-t-2 border-[#D9BC91]/40"
            >
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D9BC91] shadow-xs mb-5">
                <p className="font-editorial italic font-bold text-base sm:text-lg text-[#1A1215] leading-relaxed text-center">
                  "{selectedOption.responseMessage}"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#7E163B] via-[#9F2B55] to-[#C87997] text-white font-bold text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-shadow"
              >
                <span>
                  {currentIndex === totalQuestions - 1 ? 'Enter Our Memory Journey' : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
