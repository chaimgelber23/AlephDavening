'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/ui/BottomNav';
import { getBrachotPrayers } from '@/lib/content/prayers';
import { useAudio } from '@/hooks/useAudio';
import { useKaraokeSync } from '@/hooks/useKaraokeSync';
import { useUserStore } from '@/stores/userStore';
import { CoachingOverlay } from '@/components/siddur/CoachingOverlay';
import { DisplayToggleBar } from '@/components/siddur/DisplayToggleBar';
import { KaraokePlayer } from '@/components/siddur/KaraokePlayer';
import { AmudBadge } from '@/components/siddur/AmudBadge';
import type { Prayer } from '@/types';

export default function BrachotPage() {
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showCoaching, setShowCoaching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pronunciation = useUserStore((s) => s.profile.pronunciation);
  const audioSpeed = useUserStore((s) => s.profile.audioSpeed);
  const voiceGender = useUserStore((s) => s.profile.voiceGender);
  const displaySettings = useUserStore((s) => s.displaySettings);
  const hasUsedCoaching = useUserStore((s) => s.hasUsedCoaching);
  const isPrayerFullyCoached = useUserStore((s) => s.isPrayerFullyCoached);

  const audioOptions = useMemo(
    () => ({ speed: audioSpeed, pronunciation, voiceGender }),
    [audioSpeed, pronunciation, voiceGender]
  );
  const { play, stop, isPlaying, isLoading } = useAudio(audioOptions);

  const currentSection = selectedPrayer?.sections[currentSectionIndex];
  const words = currentSection?.hebrewText.split(' ') || [];

  const { currentWordIndex, progress } = useKaraokeSync({
    words,
    wordTimings: currentSection?.wordTimings,
    isPlaying,
  });

  const brachotPrayers = getBrachotPrayers();

  const filteredBrachot = useMemo(() => {
    if (!searchQuery.trim()) return brachotPrayers;
    const q = searchQuery.toLowerCase();
    return brachotPrayers.filter(
      (p) =>
        p.nameEnglish.toLowerCase().includes(q) ||
        p.nameHebrew.includes(q) ||
        p.whenSaid.toLowerCase().includes(q)
    );
  }, [brachotPrayers, searchQuery]);

  const handleSelectPrayer = useCallback((prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setCurrentSectionIndex(0);
  }, []);

  const handleBack = useCallback(() => {
    stop();
    setSelectedPrayer(null);
    setCurrentSectionIndex(0);
  }, [stop]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else if (currentSection && selectedPrayer) {
      const text =
        pronunciation === 'american'
          ? currentSection.transliteration
          : currentSection.hebrewText;
      const audioMode = pronunciation === 'american' ? 'transliteration' : 'hebrew';
      play(text, audioMode, audioSpeed, selectedPrayer.id, currentSection.id);
    }
  }, [isPlaying, stop, play, currentSection, selectedPrayer, pronunciation, audioSpeed]);

  // === PRAYER READER ===
  if (selectedPrayer) {
    const sectionIds = selectedPrayer.sections.map((s) => s.id);
    const isCoached = isPrayerFullyCoached(selectedPrayer.id, sectionIds);
    const totalSections = selectedPrayer.sections.length;

    return (
      <div className="min-h-screen bg-[#FEFDFB]">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3 z-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <button onClick={handleBack} className="text-gray-400 hover:text-gray-600">
                ← Back
              </button>
              <span className="text-sm font-medium text-gray-600">
                {selectedPrayer.nameEnglish}
              </span>
              <span className="text-sm text-gray-400">
                {currentSectionIndex + 1}/{totalSections}
              </span>
            </div>
            <DisplayToggleBar />
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-6 space-y-5 pb-32">
          {/* Context */}
          {currentSectionIndex === 0 && displaySettings.showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#4A7C59]/5 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#4A7C59]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4A7C59]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#4A7C59]">
                    When: {selectedPrayer.whenSaid}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedPrayer.inspirationText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {displaySettings.showAmudCues && currentSection?.amud && (
            <div className="flex items-center justify-center gap-2">
              <AmudBadge role={currentSection.amud.role} />
            </div>
          )}

          {currentSection && (
            <KaraokePlayer
              section={currentSection}
              currentWordIndex={currentWordIndex}
              progress={progress}
              onTogglePlay={handleTogglePlay}
              isPlaying={isPlaying}
              isLoading={isLoading}
            />
          )}

          {/* Section Navigation */}
          {totalSections > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => { if (currentSectionIndex > 0) { stop(); setCurrentSectionIndex(currentSectionIndex - 1); } }}
                disabled={currentSectionIndex === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSectionIndex === 0 ? 'text-gray-300' : 'text-[#1B4965] hover:bg-[#1B4965]/5'}`}
              >
                ← Previous
              </button>
              <div className="flex gap-1">
                {selectedPrayer.sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { stop(); setCurrentSectionIndex(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentSectionIndex ? 'bg-[#4A7C59]' : 'bg-gray-200 hover:bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => { if (currentSectionIndex < totalSections - 1) { stop(); setCurrentSectionIndex(currentSectionIndex + 1); } }}
                disabled={currentSectionIndex === totalSections - 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSectionIndex === totalSections - 1 ? 'text-gray-300' : 'text-[#1B4965] hover:bg-[#1B4965]/5'}`}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Coach button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => { stop(); setShowCoaching(true); }}
          className="fixed bottom-24 right-6 bg-[#C6973F] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#b8892f] active:scale-95 transition-all flex items-center gap-2 z-20"
        >
          <span className="text-sm font-medium">Coach</span>
        </motion.button>

        <AnimatePresence>
          {showCoaching && (
            <CoachingOverlay
              prayer={selectedPrayer}
              initialSectionIndex={currentSectionIndex}
              onClose={() => setShowCoaching(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // === LIST VIEW ===
  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      <div className="bg-gradient-to-b from-[#4A7C59] to-[#3d6849] text-white px-6 pt-8 pb-5 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold">Brachot</h1>
          <p className="text-white/50 text-sm mt-1">
            Blessings over food, drink, and daily experiences
          </p>

          <div className="relative mt-4">
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search brachot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.08] backdrop-blur-sm text-white placeholder-white/30 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/[0.06] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-4 pb-28 space-y-3">
        {filteredBrachot.map((prayer, i) => (
          <motion.button
            key={prayer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => handleSelectPrayer(prayer)}
            className="w-full rounded-2xl border bg-white border-gray-100 hover:shadow-md hover:border-[#4A7C59]/30 cursor-pointer p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#2D3142] text-sm">{prayer.nameEnglish}</h3>
                <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-base text-gray-500">
                  {prayer.nameHebrew}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{prayer.whenSaid}</p>
          </motion.button>
        ))}
        {filteredBrachot.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No brachot found</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}