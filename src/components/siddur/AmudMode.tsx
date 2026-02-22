'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { useAudio } from '@/hooks/useAudio';
import { AmudBadge } from './AmudBadge';
import { DisplayToggleBar } from './DisplayToggleBar';
import type { DaveningService, ServiceItem, ServiceSegment, Prayer, PrayerSection } from '@/types';

interface AmudModeProps {
  service: DaveningService;
  prayers: Map<string, Prayer>;
  onBack: () => void;
  initialSegmentIndex?: number;
  initialItemIndex?: number;
}

export function AmudMode({
  service,
  prayers,
  onBack,
  initialSegmentIndex = 0,
  initialItemIndex = 0,
}: AmudModeProps) {
  const [segmentIndex, setSegmentIndex] = useState(initialSegmentIndex);
  const [itemIndex, setItemIndex] = useState(initialItemIndex);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const displaySettings = useUserStore((s) => s.displaySettings);
  const updateServicePosition = useUserStore((s) => s.updateServicePosition);
  const audioSpeed = useUserStore((s) => s.profile.audioSpeed);
  const pronunciation = useUserStore((s) => s.profile.pronunciation);
  const voiceGender = useUserStore((s) => s.profile.voiceGender);

  const audioOptions = useMemo(
    () => ({ speed: audioSpeed, pronunciation, voiceGender }),
    [audioSpeed, pronunciation, voiceGender]
  );
  const { play, stop, isPlaying, isLoading } = useAudio(audioOptions);

  const currentSegment = service.segments[segmentIndex];
  const currentItem = currentSegment?.items[itemIndex];
  const currentPrayer = currentItem?.prayerId ? prayers.get(currentItem.prayerId) : null;
  const currentSection = currentPrayer?.sections[sectionIndex];

  // Flatten all items for navigation
  const allItems = useMemo(() => {
    const items: { item: ServiceItem; segIdx: number; itemIdx: number }[] = [];
    service.segments.forEach((seg, sIdx) => {
      seg.items.forEach((item, iIdx) => {
        items.push({ item, segIdx: sIdx, itemIdx: iIdx });
      });
    });
    return items;
  }, [service]);

  const flatIndex = useMemo(() => {
    return allItems.findIndex(
      (a) => a.segIdx === segmentIndex && a.itemIdx === itemIndex
    );
  }, [allItems, segmentIndex, itemIndex]);

  const navigateTo = useCallback(
    (segIdx: number, iIdx: number) => {
      stop();
      setSegmentIndex(segIdx);
      setItemIndex(iIdx);
      setSectionIndex(0);
      updateServicePosition(service.id, {
        serviceId: service.id,
        segmentIndex: segIdx,
        itemIndex: iIdx,
      });
    },
    [stop, updateServicePosition, service.id]
  );

  const handleNext = () => {
    // If prayer has more sections, go to next section
    if (currentPrayer && sectionIndex < currentPrayer.sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
      return;
    }
    // Otherwise go to next item
    if (flatIndex < allItems.length - 1) {
      const next = allItems[flatIndex + 1];
      navigateTo(next.segIdx, next.itemIdx);
    }
  };

  const handlePrev = () => {
    // If in a prayer section beyond 0, go back
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      return;
    }
    // Otherwise go to previous item
    if (flatIndex > 0) {
      const prev = allItems[flatIndex - 1];
      navigateTo(prev.segIdx, prev.itemIdx);
    }
  };

  const handlePlaySection = () => {
    if (isPlaying) {
      stop();
      return;
    }
    if (!currentSection) return;
    const text =
      pronunciation === 'american'
        ? currentSection.transliteration
        : currentSection.hebrewText;
    const mode = pronunciation === 'american' ? 'transliteration' : 'hebrew';
    play(
      text,
      mode as 'hebrew' | 'transliteration',
      audioSpeed,
      currentPrayer?.id,
      currentSection.id
    );
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      {/* Amud Mode Header */}
      <div className="sticky top-0 z-20 bg-[#1B4965] text-white">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="text-[#5FA8D3] text-sm hover:text-white">
              ← Exit Amud
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎤</span>
              <span className="text-sm font-semibold">Amud Mode</span>
            </div>
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-xs text-[#5FA8D3] hover:text-white"
            >
              {showTips ? 'Hide Tips' : 'Tips'}
            </button>
          </div>

          {/* Current segment indicator */}
          {currentSegment && (
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentSegment.color }}
              />
              <span className="text-xs text-white/60">{currentSegment.title}</span>
              <span className="text-xs text-white/40">
                {itemIndex + 1}/{currentSegment.items.length}
              </span>
            </div>
          )}

          {/* Overall progress */}
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5FA8D3] rounded-full transition-all duration-300"
              style={{
                width: `${((flatIndex + 1) / allItems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Toggle Bar */}
      <div className="sticky top-[88px] z-10 bg-[#FEFDFB]/95 backdrop-blur-sm px-6 py-1 border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <DisplayToggleBar />
        </div>
      </div>

      {/* Tips Panel */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="max-w-md mx-auto px-6 py-3 space-y-2">
              <TipCard title="Made a mistake?" text="If you skipped a bracha in the Amidah, go back to that bracha and continue from there." />
              <TipCard title="Lost your place?" text="Pause, ask the gabbai quietly, or listen for the congregation's responses to find where you are." />
              <TipCard title="Pace" text="Wait for the majority of the congregation to finish responding 'Amen' before continuing." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-6 pb-32">
        {currentItem ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${segmentIndex}-${itemIndex}-${sectionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Item Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#2D3142]">
                    {currentItem.label}
                  </h2>
                  {currentItem.labelHebrew && (
                    <span dir="rtl" className="font-[var(--font-hebrew-serif)] text-sm text-gray-400">
                      {currentItem.labelHebrew}
                    </span>
                  )}
                </div>
                {displaySettings.showAmudCues && (
                  <AmudBadge role={currentItem.amud.role} />
                )}
              </div>

              {/* Amud Instruction */}
              {displaySettings.showAmudCues && currentItem.amud.instruction && (
                <div className="bg-[#1B4965]/5 rounded-xl p-3 mb-4">
                  <p className="text-sm text-[#1B4965] font-medium">
                    {currentItem.amud.instruction}
                  </p>
                </div>
              )}

              {/* Physical Actions */}
              {displaySettings.showInstructions &&
                currentItem.amud.physicalActions &&
                currentItem.amud.physicalActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {currentItem.amud.physicalActions.map((action) => (
                      <span
                        key={action}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4A373]/15 text-[#8B6914] text-xs font-medium"
                      >
                        {action.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

              {/* Instruction-type items (no prayer content) */}
              {currentItem.type === 'instruction' && (
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <p className="text-gray-500">{currentItem.amud.notes || currentItem.amud.instruction || currentItem.label}</p>
                </div>
              )}

              {/* Prayer Content */}
              {currentPrayer && currentSection && (
                <div className="space-y-4">
                  {/* Section navigation for multi-section prayers */}
                  {currentPrayer.sections.length > 1 && (
                    <div className="flex items-center justify-center gap-1">
                      {currentPrayer.sections.length <= 12 ? (
                        currentPrayer.sections.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { stop(); setSectionIndex(i); }}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === sectionIndex ? 'bg-[#1B4965]' : 'bg-gray-200'
                            }`}
                          />
                        ))
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1B4965] rounded-full transition-all"
                              style={{
                                width: `${((sectionIndex + 1) / currentPrayer.sections.length) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {sectionIndex + 1}/{currentPrayer.sections.length}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* YOUR PART — Main Hebrew text */}
                  {currentItem.amud.role !== 'congregation' && (
                    <div className={`rounded-2xl border-2 p-6 ${
                      currentItem.amud.role === 'shaliach_tzibbur'
                        ? 'border-[#1B4965]/20 bg-[#1B4965]/[0.03]'
                        : currentItem.amud.role === 'both'
                        ? 'border-[#7C3AED]/20 bg-[#7C3AED]/[0.03]'
                        : 'border-gray-100 bg-white'
                    }`}>
                      {displaySettings.showAmudCues && currentItem.amud.role === 'shaliach_tzibbur' && (
                        <p className="text-[10px] uppercase tracking-widest text-[#1B4965] font-bold mb-3 text-center">
                          You say
                        </p>
                      )}
                      {displaySettings.showAmudCues && currentItem.amud.role === 'both' && (
                        <p className="text-[10px] uppercase tracking-widest text-[#7C3AED] font-bold mb-3 text-center">
                          Everyone together
                        </p>
                      )}

                      {/* Hebrew */}
                      <div dir="rtl" className="text-center leading-[2.5]">
                        <p className="font-[var(--font-hebrew-serif)] text-3xl text-[#1A1A2E]">
                          {currentSection.hebrewText}
                        </p>
                      </div>

                      {/* Transliteration */}
                      {displaySettings.showTransliteration && (
                        <div className="mt-2 text-center">
                          <p className="text-lg text-[#1B4965]/70 italic font-medium">
                            {currentSection.transliteration}
                          </p>
                        </div>
                      )}

                      {/* Translation */}
                      {displaySettings.showTranslation && (
                        <div className="mt-2 text-center border-t border-gray-100 pt-2">
                          <p className="text-sm text-gray-400">{currentSection.translation}</p>
                        </div>
                      )}

                      {/* Section amud annotation (if different from item-level) */}
                      {displaySettings.showAmudCues && currentSection.amud?.instruction && (
                        <p className="text-xs text-[#1B4965] mt-3 text-center">
                          {currentSection.amud.instruction}
                        </p>
                      )}

                      {/* Play button */}
                      <button
                        onClick={handlePlaySection}
                        disabled={isLoading}
                        className={`mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isPlaying
                            ? 'bg-[#C17767] text-white'
                            : 'bg-[#1B4965]/10 text-[#1B4965] hover:bg-[#1B4965]/20'
                        }`}
                      >
                        {isLoading ? 'Loading...' : isPlaying ? '⏹ Stop' : '▶ Listen'}
                      </button>
                    </div>
                  )}

                  {/* CONGREGATION RESPONSE */}
                  {displaySettings.showAmudCues && currentItem.amud.congregationResponse && (
                    <div className="rounded-2xl border border-[#4A7C59]/20 bg-[#4A7C59]/[0.03] p-5">
                      <p className="text-[10px] uppercase tracking-widest text-[#4A7C59] font-bold mb-2 text-center">
                        Congregation responds
                      </p>
                      <div dir="rtl" className="text-center leading-[2.5]">
                        <p className="font-[var(--font-hebrew-serif)] text-xl text-[#4A7C59]">
                          {currentItem.amud.congregationResponse}
                        </p>
                      </div>
                      {displaySettings.showTransliteration && currentItem.amud.congregationResponseTransliteration && (
                        <p className="text-sm text-[#4A7C59]/60 italic text-center mt-1">
                          {currentItem.amud.congregationResponseTransliteration}
                        </p>
                      )}
                      {currentItem.amud.waitForCongregation && (
                        <p className="text-xs text-[#4A7C59] mt-2 text-center font-medium">
                          ⏸ Wait for congregation to finish
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section-level congregation response */}
                  {displaySettings.showAmudCues &&
                    currentSection.amud?.congregationResponse &&
                    currentSection.amud.congregationResponse !== currentItem.amud.congregationResponse && (
                      <div className="rounded-xl border border-[#4A7C59]/15 bg-[#4A7C59]/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#4A7C59] font-bold mb-1">
                          They respond
                        </p>
                        <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-lg text-[#4A7C59]">
                          {currentSection.amud.congregationResponse}
                        </p>
                        {displaySettings.showTransliteration && currentSection.amud.congregationResponseTransliteration && (
                          <p className="text-xs text-[#4A7C59]/50 italic mt-0.5">
                            {currentSection.amud.congregationResponseTransliteration}
                          </p>
                        )}
                      </div>
                    )}

                  {/* Notes */}
                  {displaySettings.showInstructions && currentSection.notes && (
                    <p className="text-sm text-gray-500 px-2">{currentSection.notes}</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>End of service</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-20">
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={flatIndex === 0 && sectionIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
              flatIndex === 0 && sectionIndex === 0
                ? 'text-gray-300'
                : 'text-[#1B4965] hover:bg-[#1B4965]/5'
            }`}
          >
            ← Previous
          </button>

          <span className="text-xs text-gray-400">
            {flatIndex + 1} / {allItems.length}
          </span>

          <button
            onClick={handleNext}
            disabled={flatIndex === allItems.length - 1 && (!currentPrayer || sectionIndex >= currentPrayer.sections.length - 1)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
              flatIndex === allItems.length - 1 && (!currentPrayer || sectionIndex >= currentPrayer.sections.length - 1)
                ? 'text-gray-300'
                : 'bg-[#1B4965] text-white hover:bg-[#163d55]'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function TipCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#D4A373]/10 rounded-xl p-3">
      <p className="text-xs font-semibold text-[#8B6914]">{title}</p>
      <p className="text-xs text-[#8B6914]/70 mt-0.5">{text}</p>
    </div>
  );
}
