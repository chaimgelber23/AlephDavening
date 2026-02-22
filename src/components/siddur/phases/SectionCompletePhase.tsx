'use client';

import { motion } from 'framer-motion';
import type { PrayerSection } from '@/types';

interface SectionCompletePhaseProps {
  section: PrayerSection;
  sectionIndex: number;
  totalSections: number;
  isLastSection: boolean;
  onNext: () => void;
}

export function SectionCompletePhase({
  section,
  sectionIndex,
  totalSections,
  isLastSection,
  onNext,
}: SectionCompletePhaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-5"
    >
      {/* Celebration */}
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 bg-[#4A7C59]/10 rounded-full flex items-center justify-center mx-auto"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A7C59"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h3 className="text-lg font-bold text-[#2D3142] mt-4">
          Nice!
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You just learned this part:
        </p>
      </div>

      {/* What they learned */}
      <div className="bg-[#4A7C59]/5 rounded-2xl p-5 text-center">
        <p
          dir="rtl"
          className="font-[var(--font-hebrew-serif)] text-2xl text-[#2D3142] leading-relaxed"
        >
          {section.hebrewText}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#4A7C59]/40 font-semibold mt-3 mb-0.5">How to say it</p>
        <p className="text-sm text-gray-500 italic">
          {section.transliteration}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#4A7C59]/40 font-semibold mt-2 mb-0.5">What it means</p>
        <p className="text-sm text-gray-400">
          {section.translation}
        </p>
      </div>

      {/* Next action */}
      {isLastSection ? (
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl text-base font-medium bg-[#C6973F] text-white hover:bg-[#b8892f] active:scale-[0.98] transition-all"
        >
          See how you did!
        </button>
      ) : (
        <div className="space-y-2">
          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl text-base font-medium bg-[#1B4965] text-white hover:bg-[#163d55] active:scale-[0.98] transition-all"
          >
            Ready for the next part?
          </button>
          <p className="text-center text-xs text-gray-400">
            Section {sectionIndex + 2} of {totalSections}
          </p>
        </div>
      )}
    </motion.div>
  );
}
