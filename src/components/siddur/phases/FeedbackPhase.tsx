'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Prayer, CoachingFeedback } from '@/types';

interface FeedbackPhaseProps {
  prayer: Prayer;
  onComplete: (feedback: CoachingFeedback) => void;
}

type PaceRating = CoachingFeedback['paceRating'];
type ListenRating = CoachingFeedback['listenCountRating'];
type HelpfulAspect = 'hearing' | 'transliteration' | 'translation' | 'all';

export function FeedbackPhase({ prayer, onComplete }: FeedbackPhaseProps) {
  const [pace, setPace] = useState<PaceRating | null>(null);
  const [listens, setListens] = useState<ListenRating | null>(null);
  const [helpful, setHelpful] = useState<HelpfulAspect[]>([]);

  const toggleHelpful = (aspect: HelpfulAspect) => {
    if (aspect === 'all') {
      setHelpful(helpful.includes('all') ? [] : ['all']);
      return;
    }
    const without = helpful.filter((h) => h !== 'all');
    if (without.includes(aspect)) {
      setHelpful(without.filter((h) => h !== aspect));
    } else {
      setHelpful([...without, aspect]);
    }
  };

  const canSubmit = pace !== null && listens !== null;

  const handleSubmit = () => {
    if (!pace || !listens) return;
    onComplete({
      paceRating: pace,
      listenCountRating: listens,
      helpfulAspects: helpful.length > 0 ? helpful : ['all'],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Celebration header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-4xl mb-2"
        >
          &#x1F389;
        </motion.div>
        <h2 className="text-xl font-bold text-[#2D3142]">
          You just learned {prayer.nameEnglish}!
        </h2>
        <p
          dir="rtl"
          className="font-[var(--font-hebrew-serif)] text-2xl text-[#1B4965] mt-1"
        >
          {prayer.nameHebrew}
        </p>
      </div>

      <div className="h-px bg-[#C6973F]/20" />

      {/* Question 1: Pace */}
      <div>
        <p className="text-sm font-medium text-[#2D3142] mb-2">
          How was the pace?
        </p>
        <div className="flex gap-2">
          {([
            { value: 'too_slow' as const, label: 'Too slow' },
            { value: 'just_right' as const, label: 'Just right' },
            { value: 'too_fast' as const, label: 'Too fast' },
          ]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPace(opt.value)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                pace === opt.value
                  ? 'border-[#1B4965] text-[#1B4965] bg-[#1B4965]/5'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: Listen count */}
      <div>
        <p className="text-sm font-medium text-[#2D3142] mb-2">
          Number of listens?
        </p>
        <div className="flex gap-2">
          {([
            { value: 'fewer' as const, label: 'Fewer' },
            { value: 'perfect' as const, label: 'Perfect' },
            { value: 'more' as const, label: 'More' },
          ]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setListens(opt.value)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                listens === opt.value
                  ? 'border-[#1B4965] text-[#1B4965] bg-[#1B4965]/5'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 3: What helped */}
      <div>
        <p className="text-sm font-medium text-[#2D3142] mb-2">
          What helped most?
        </p>
        <div className="flex flex-wrap gap-2">
          {([
            { value: 'hearing' as const, label: 'Hearing it' },
            { value: 'transliteration' as const, label: 'Transliteration' },
            { value: 'translation' as const, label: 'Translation' },
            { value: 'all' as const, label: 'All of it' },
          ]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleHelpful(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                helpful.includes(opt.value)
                  ? 'border-[#C6973F] text-[#C6973F] bg-[#C6973F]/5'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-xl text-base font-medium transition-all ${
          canSubmit
            ? 'bg-[#C6973F] text-white hover:bg-[#b8892f] active:scale-[0.98]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Done
      </button>

      {/* Skip feedback */}
      <button
        onClick={() =>
          onComplete({
            paceRating: 'just_right',
            listenCountRating: 'perfect',
            helpfulAspects: ['all'],
          })
        }
        className="w-full text-center text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 py-1"
      >
        Skip feedback
      </button>
    </motion.div>
  );
}
