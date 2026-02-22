'use client';

import { motion } from 'framer-motion';
import type { PrayerSection } from '@/types';

interface SayTogetherPhaseProps {
  section: PrayerSection;
  targetCount: number;
  currentRep: number;
  isPlaying: boolean;
  isLoading: boolean;
  onSkip: () => void;
}

export function SayTogetherPhase({
  section,
  targetCount,
  currentRep,
  isPlaying,
  isLoading,
  onSkip,
}: SayTogetherPhaseProps) {
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
          Say it out loud along with the audio.
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
          Together {Math.min(currentRep + 1, targetCount)} of {targetCount}
        </span>
      </div>

      {/* Text display — transliteration more prominent */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        {/* Hebrew */}
        <div dir="rtl" className="text-center">
          <p className="font-[var(--font-hebrew-serif)] text-3xl text-[#1A1A2E] leading-[2]">
            {section.hebrewText}
          </p>
        </div>

        {/* Transliteration — larger, bolder for reading along */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-0.5">How to say it</p>
          <p className="text-lg font-medium text-[#1B4965] italic">
            {section.transliteration}
          </p>
        </div>

        {/* Translation */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/40 font-semibold mb-0.5">What it means</p>
          <p className="text-sm text-gray-400">
            {section.translation}
          </p>
        </div>
      </div>

      {/* Audio indicator */}
      {(isPlaying || isLoading) && (
        <div className="flex items-center justify-center gap-1">
          {isLoading ? (
            <span className="text-sm text-gray-400">Loading audio...</span>
          ) : (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#C6973F] rounded-full"
                  animate={{ height: [8, 20, 8] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
              <span className="text-xs text-gray-400 ml-2">Say it with me...</span>
            </>
          )}
        </div>
      )}

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
