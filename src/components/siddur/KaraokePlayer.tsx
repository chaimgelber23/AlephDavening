'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';
import { useUserStore } from '@/stores/userStore';
import type { PrayerSection } from '@/types';

export function KaraokePlayer({
  section,
  prayerId,
  currentWordIndex,
  progress,
  onTogglePlay,
  isPlaying,
  isLoading,
}: {
  section: PrayerSection;
  prayerId: string;
  currentWordIndex: number;
  progress: number;
  onTogglePlay: () => void;
  isPlaying: boolean;
  isLoading: boolean;
}) {
  const displaySettings = useUserStore((s) => s.displaySettings);
  const audioSpeed = useUserStore((s) => s.profile.audioSpeed);
  const updateProfile = useUserStore((s) => s.updateProfile);

  const words = section.hebrewText.split(' ');
  const translitWords = section.transliteration.split(' ');

  return (
    <div className="space-y-4">
      {/* Audio Controls */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            disabled={isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${
              isPlaying
                ? 'bg-[#C17767] text-white'
                : isLoading
                ? 'bg-gray-200 text-gray-400'
                : 'bg-[#1B4965] text-white hover:bg-[#163d55]'
            }`}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div className="flex-1">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1B4965] rounded-full"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Speed control */}
          <span className="text-xs font-medium text-[#1B4965] w-8 text-right">{audioSpeed}x</span>
        </div>

        {/* Speed slider */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-gray-300">Slow</span>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.25}
            value={audioSpeed}
            onChange={(e) => updateProfile({ audioSpeed: parseFloat(e.target.value) })}
            className="flex-1 accent-[#1B4965] h-1"
          />
          <span className="text-[10px] text-gray-300">Fast</span>
        </div>
      </div>

      {/* Hebrew Text with Karaoke Highlighting */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div dir="rtl" className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 leading-[2.5]">
          {words.map((word, i) => {
            const isPast = i < currentWordIndex;
            const isCurrent = i === currentWordIndex;
            const isFuture = i > currentWordIndex;

            return (
              <motion.span
                key={i}
                className={`
                  font-[var(--font-hebrew-serif)] text-3xl px-1.5 py-0.5 rounded-lg
                  transition-all duration-200
                  ${isCurrent ? 'bg-[#5FA8D3]/25 text-[#1B4965] scale-105' : ''}
                  ${isPast && isPlaying ? 'text-[#1B4965]/40' : ''}
                  ${isFuture && isPlaying ? 'text-[#1A1A2E]' : ''}
                  ${!isPlaying ? 'text-[#1A1A2E]' : ''}
                `}
                animate={isCurrent ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Transliteration with matching highlight */}
        {displaySettings.showTransliteration && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/30 font-semibold mb-1 text-center">
              How to say it
            </p>
            <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
              {translitWords.map((word, i) => {
                const isCurrent = i === currentWordIndex;
                return (
                  <span
                    key={i}
                    className={`text-base transition-all duration-200 ${
                      isCurrent
                        ? 'text-[#1B4965] font-semibold'
                        : 'text-[#1B4965]/50 italic'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Translation */}
        {displaySettings.showTranslation && section.translation && (
          <div className="mt-3 pt-3 border-t border-gray-50 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#1B4965]/30 font-semibold mb-1">
              What it means
            </p>
            <p className="text-sm text-gray-400">{section.translation}</p>
          </div>
        )}

        {/* Notes */}
        {displaySettings.showInstructions && section.notes && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <p className="text-sm text-gray-500">{section.notes}</p>
          </div>
        )}

        {/* Amud annotation */}
        {displaySettings.showAmudCues && section.amud && (
          <div className="mt-3 pt-3 border-t border-gray-50 space-y-2">
            {section.amud.instruction && (
              <p className="text-xs text-[#1B4965] font-medium text-center">
                {section.amud.instruction}
              </p>
            )}
            {section.amud.congregationResponse && (
              <div className="bg-[#4A7C59]/5 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-[#4A7C59] font-semibold mb-1">
                  Congregation responds
                </p>
                <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-lg text-[#4A7C59]">
                  {section.amud.congregationResponse}
                </p>
                {section.amud.congregationResponseTransliteration && (
                  <p className="text-xs text-[#4A7C59]/60 italic mt-0.5">
                    {section.amud.congregationResponseTransliteration}
                  </p>
                )}
              </div>
            )}
            {section.amud.physicalActions && section.amud.physicalActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {section.amud.physicalActions.map((action) => (
                  <span
                    key={action}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4A373]/15 text-[#8B6914] text-[10px] font-medium"
                  >
                    {action.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}
