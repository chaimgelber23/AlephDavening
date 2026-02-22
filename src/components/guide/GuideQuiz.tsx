'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GuideQuizQuestion } from '@/types';

interface GuideQuizProps {
  questions: GuideQuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

export function GuideQuiz({ questions, onComplete, onClose }: GuideQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      const finalScore = score;
      setFinished(true);
      onComplete(finalScore, questions.length);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="w-20 h-20 rounded-full bg-[#4A7C59]/10 flex items-center justify-center">
          <span className="text-3xl font-bold text-[#4A7C59]">{percent}%</span>
        </div>
        <h3 className="text-lg font-bold text-[#2D3142]">
          {score}/{questions.length} Correct
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          {percent >= 80
            ? 'Excellent! You really know this material.'
            : percent >= 50
            ? 'Good effort! Review the guide to strengthen your knowledge.'
            : 'Keep learning! Read through the guide again and try once more.'}
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2.5 bg-[#1B4965] text-white text-sm font-semibold rounded-xl hover:bg-[#163d55] transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B5CF6] rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[11px] text-gray-400 font-medium shrink-0">
          {current + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Question */}
          <h3 className="text-[15px] font-semibold text-[#2D3142] mb-4 leading-relaxed">
            {q.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              let borderColor = 'border-gray-200';
              let bgColor = 'bg-white';
              let textColor = 'text-[#2D3142]';

              if (revealed) {
                if (idx === q.correctIndex) {
                  borderColor = 'border-[#4A7C59]';
                  bgColor = 'bg-[#4A7C59]/5';
                  textColor = 'text-[#4A7C59]';
                } else if (idx === selected && idx !== q.correctIndex) {
                  borderColor = 'border-red-400';
                  bgColor = 'bg-red-50';
                  textColor = 'text-red-600';
                }
              } else if (idx === selected) {
                borderColor = 'border-[#1B4965]';
                bgColor = 'bg-[#1B4965]/5';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={revealed}
                  className={`w-full text-left p-3.5 rounded-xl border-2 ${borderColor} ${bgColor} transition-all ${
                    !revealed ? 'hover:border-[#1B4965]/30 active:scale-[0.99]' : ''
                  }`}
                >
                  <span className={`text-[14px] font-medium ${textColor}`}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation (shown after answer) */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-[#FEFDFB] border border-[#C6973F]/15 rounded-xl p-3.5"
            >
              <p className="text-[13px] text-[#2D3142] leading-relaxed">{q.explanation}</p>
              {q.source && (
                <p className="text-[11px] text-gray-400 mt-1.5 italic">Source: {q.source}</p>
              )}
            </motion.div>
          )}

          {/* Next button */}
          {revealed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-[#1B4965] text-white text-sm font-semibold rounded-xl hover:bg-[#163d55] transition-colors"
              >
                {current + 1 >= questions.length ? 'See Results' : 'Next'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
