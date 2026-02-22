'use client';

import { motion } from 'framer-motion';
import type { PrayerSection } from '@/types';

interface TryYourselfPhaseProps {
  section: PrayerSection;
  showTranslation: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  onPlayCheck: () => void;
  onComplete: () => void;
}

export function TryYourselfPhase({
  section,
  showTranslation,
  isPlaying,
  isLoading,
  onPlayCheck,
  onComplete,
}: TryYourselfPhaseProps) {
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
          Now say it on your own. Take your time.
        </p>
      </div>

      {/* Text display */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        {/* Hebrew */}
        <div dir="rtl" className="text-center">
          <p className="font-[var(--font-hebrew-serif)] text-3xl text-[#1A1A2E] leading-[2]">
            {section.hebrewText}
          </p>
        </div>

        {/* Transliteration — always visible */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-0.5">How to say it</p>
          <p className="text-lg font-medium text-[#1B4965] italic">
            {section.transliteration}
          </p>
        </div>

        {/* Translation — faded if preference says so */}
        {showTranslation && (
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-0.5">What it means</p>
            <p className="text-sm text-gray-300">
              {section.translation}
            </p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPlayCheck}
          disabled={isPlaying || isLoading}
          className={`flex-1 py-3.5 rounded-xl text-sm font-medium border-2 transition-all ${
            isPlaying
              ? 'border-[#1B4965] text-[#1B4965] bg-[#1B4965]/5'
              : 'border-gray-200 text-gray-500 hover:border-[#1B4965] hover:text-[#1B4965]'
          }`}
        >
          {isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Play to check'}
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium bg-[#4A7C59] text-white hover:bg-[#3d6a4a] active:scale-[0.98] transition-all"
        >
          I said it!
        </button>
      </div>
    </motion.div>
  );
}
