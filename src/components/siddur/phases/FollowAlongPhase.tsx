'use client';

import { motion } from 'framer-motion';
import type { PrayerSection } from '@/types';

interface FollowAlongPhaseProps {
  section: PrayerSection;
  targetCount: number;
  currentRep: number;
  isPlaying: boolean;
  highlightedWordIndex: number;
  onSkip: () => void;
}

export function FollowAlongPhase({
  section,
  targetCount,
  currentRep,
  isPlaying,
  highlightedWordIndex,
  onSkip,
}: FollowAlongPhaseProps) {
  const hebrewWords = section.hebrewText.split(' ');
  const translitWords = section.transliteration.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      {/* Instruction */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Read along silently. Follow the highlighted words.
        </p>
      </div>

      {/* Rep counter */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentRep
                ? 'bg-[#4A7C59]'
                : i === currentRep
                ? 'bg-[#1B4965] animate-pulse'
                : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-xs text-gray-400 ml-2">
          Follow along {Math.min(currentRep + 1, targetCount)} of {targetCount}
        </span>
      </div>

      {/* Text display with highlighting */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        {/* Hebrew words with highlight */}
        <div dir="rtl" className="text-center">
          <div className="flex flex-wrap justify-center gap-2 leading-[2.5]">
            {hebrewWords.map((word, i) => (
              <span
                key={i}
                className={`
                  font-[var(--font-hebrew-serif)] text-3xl px-1 py-0.5 rounded transition-all duration-300
                  ${
                    highlightedWordIndex === i && isPlaying
                      ? 'bg-[#5FA8D3]/25 text-[#1B4965] scale-105'
                      : 'text-[#1A1A2E]'
                  }
                `}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Transliteration words with matching highlight */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-1">How to say it</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {translitWords.map((word, i) => (
              <span
                key={i}
                className={`
                  text-base italic transition-all duration-300
                  ${
                    highlightedWordIndex === i && isPlaying
                      ? 'font-semibold text-[#1B4965]'
                      : 'text-gray-400'
                  }
                `}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Translation */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-0.5">What it means</p>
          <p className="text-sm text-gray-400">
            {section.translation}
          </p>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={onSkip}
        className="w-full text-center text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4 py-2"
      >
        I&apos;ve got it, move on
      </button>
    </motion.div>
  );
}
