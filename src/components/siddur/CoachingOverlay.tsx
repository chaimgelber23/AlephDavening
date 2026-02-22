'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { useAudio } from '@/hooks/useAudio';
import { CoachingStepNav, PHASE_ORDER } from './CoachingStepNav';
import { ContextPhase } from './phases/ContextPhase';
import { ListenPhase } from './phases/ListenPhase';
import { FollowAlongPhase } from './phases/FollowAlongPhase';
import { SayTogetherPhase } from './phases/SayTogetherPhase';
import { TryYourselfPhase } from './phases/TryYourselfPhase';
import { SectionCompletePhase } from './phases/SectionCompletePhase';
import { FeedbackPhase } from './phases/FeedbackPhase';
import type { Prayer, CoachingPhase, CoachingFeedback } from '@/types';

interface CoachingOverlayProps {
  prayer: Prayer;
  initialSectionIndex?: number;
  onClose: () => void;
}

export function CoachingOverlay({
  prayer,
  initialSectionIndex = 0,
  onClose,
}: CoachingOverlayProps) {
  const prefs = useUserStore((s) => s.coachingPreferences);
  const pronunciation = useUserStore((s) => s.profile.pronunciation);
  const voiceGender = useUserStore((s) => s.profile.voiceGender);
  const updateSectionProgress = useUserStore((s) => s.updateSectionProgress);
  const markSectionCoached = useUserStore((s) => s.markSectionCoached);
  const isSectionCoached = useUserStore((s) => s.isSectionCoached);
  const applyCoachingFeedback = useUserStore((s) => s.applyCoachingFeedback);
  const updatePrayerProgress = useUserStore((s) => s.updatePrayerProgress);

  // Find first un-coached section or use initial
  const startSection = useMemo(() => {
    const firstUncoached = prayer.sections.findIndex(
      (s) => !isSectionCoached(prayer.id, s.id)
    );
    return firstUncoached === -1 ? initialSectionIndex : firstUncoached;
  }, [prayer, initialSectionIndex, isSectionCoached]);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(startSection);
  const [phase, setPhase] = useState<CoachingPhase>(
    currentSectionIndex === 0 && !prefs.skipContextCard ? 'context' : 'listen'
  );
  const [repCount, setRepCount] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<CoachingPhase>>(new Set());
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);

  const currentSection = prayer.sections[currentSectionIndex];
  const totalSections = prayer.sections.length;
  const isLastSection = currentSectionIndex === totalSections - 1;

  // Audio with onEnded callback for auto-replay
  const handleAudioEnded = useCallback(() => {
    setRepCount((prev) => prev + 1);
  }, []);

  const audioOptions = useMemo(
    () => ({
      speed: prefs.initialSpeed,
      onEnded: handleAudioEnded,
      pronunciation,
      voiceGender,
    }),
    [prefs.initialSpeed, handleAudioEnded, pronunciation, voiceGender]
  );

  const { play, stop, isPlaying, isLoading } = useAudio(audioOptions);

  // Get target rep count for current phase
  const getTargetCount = useCallback(() => {
    switch (phase) {
      case 'listen':
        return prefs.listenCount;
      case 'follow_along':
        return prefs.followAlongCount;
      case 'say_together':
        return prefs.sayTogetherCount;
      default:
        return 0;
    }
  }, [phase, prefs]);

  // Get speed for current phase
  const getPhaseSpeed = useCallback(() => {
    switch (phase) {
      case 'listen':
        return prefs.initialSpeed;
      case 'follow_along':
        return Math.min(prefs.initialSpeed + 0.1, 1.5);
      case 'say_together':
        return 1.0;
      default:
        return 1.0;
    }
  }, [phase, prefs.initialSpeed]);

  // Play audio for current section
  const playCurrentSection = useCallback(() => {
    if (!currentSection) return;
    const text =
      pronunciation === 'american'
        ? currentSection.transliteration
        : currentSection.hebrewText;
    const mode = pronunciation === 'american' ? 'transliteration' : 'hebrew';
    play(text, mode, getPhaseSpeed(), prayer.id, currentSection.id);
  }, [currentSection, pronunciation, play, getPhaseSpeed, prayer.id]);

  // Auto-play when entering listen/follow/say phases
  useEffect(() => {
    if (
      phase === 'listen' ||
      phase === 'follow_along' ||
      phase === 'say_together'
    ) {
      setRepCount(0);
      const timer = setTimeout(() => playCurrentSection(), 300);
      return () => clearTimeout(timer);
    }
    return () => stop();
  }, [phase, currentSectionIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-replay when rep finishes but more reps needed
  useEffect(() => {
    const target = getTargetCount();
    if (target === 0 || repCount === 0) return;

    if (repCount < target) {
      const timer = setTimeout(() => playCurrentSection(), 600);
      return () => clearTimeout(timer);
    }

    // All reps done — advance to next phase
    if (repCount >= target) {
      advancePhase();
    }
  }, [repCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // Word highlighting for follow-along phase
  useEffect(() => {
    if (phase !== 'follow_along' || !isPlaying || !currentSection) {
      setHighlightedWordIndex(-1);
      return;
    }

    const words = currentSection.hebrewText.split(' ');
    const totalWords = words.length;
    // Simple even-split timing (fallback when no wordTimings)
    const msPerWord = 2000 / totalWords; // ~2 seconds per phrase
    let wordIdx = 0;

    const interval = setInterval(() => {
      setHighlightedWordIndex(wordIdx);
      wordIdx = (wordIdx + 1) % totalWords;
    }, msPerWord);

    return () => clearInterval(interval);
  }, [phase, isPlaying, currentSection]);

  // Advance to the next coaching phase
  const advancePhase = useCallback(() => {
    stop();
    setCompletedPhases((prev) => new Set([...prev, phase]));

    const phaseTransitions: Record<CoachingPhase, CoachingPhase> = {
      context: 'listen',
      listen: 'follow_along',
      follow_along: 'say_together',
      say_together: 'try_yourself',
      try_yourself: 'section_complete',
      section_complete: isLastSection ? 'feedback' : 'listen',
      feedback: 'feedback', // terminal
    };

    const nextPhase = phaseTransitions[phase];

    if (phase === 'section_complete' && !isLastSection) {
      // Move to next section
      markSectionCoached(prayer.id, currentSection.id);
      setCurrentSectionIndex((prev) => prev + 1);
      setCompletedPhases(new Set());
      setRepCount(0);
    }

    if (phase === 'section_complete' && isLastSection) {
      markSectionCoached(prayer.id, currentSection.id);
    }

    setPhase(nextPhase);
    setRepCount(0);
  }, [phase, isLastSection, stop, markSectionCoached, prayer.id, currentSection]);

  // Jump to a specific phase (for step nav)
  const jumpToPhase = useCallback(
    (targetPhase: CoachingPhase) => {
      stop();
      setRepCount(0);
      setPhase(targetPhase);
    },
    [stop]
  );

  // Handle feedback submission
  const handleFeedback = useCallback(
    (feedback: CoachingFeedback) => {
      applyCoachingFeedback(feedback);
      updatePrayerProgress(prayer.id, { status: 'mastered' });
      onClose();
    },
    [applyCoachingFeedback, updatePrayerProgress, prayer.id, onClose]
  );

  // Save progress on close
  const handleClose = useCallback(() => {
    stop();
    if (currentSection) {
      updateSectionProgress(`${prayer.id}:${currentSection.id}`, {
        currentStep: phase,
        listenCount: repCount,
        lastPracticed: new Date().toISOString().split('T')[0],
      });
    }
    onClose();
  }, [stop, prayer.id, currentSection, phase, repCount, updateSectionProgress, onClose]);

  // Section dots for navigating between sections
  const renderSectionDots = () => {
    if (totalSections <= 1 || phase === 'feedback') return null;
    return (
      <div className="flex items-center justify-center gap-1.5 py-1">
        {prayer.sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              stop();
              setCurrentSectionIndex(i);
              setPhase('listen');
              setRepCount(0);
              setCompletedPhases(new Set());
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSectionIndex
                ? 'bg-[#1B4965] w-4'
                : isSectionCoached(prayer.id, s.id)
                ? 'bg-[#4A7C59]'
                : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-[10px] text-gray-400 ml-1.5">
          {currentSectionIndex + 1}/{totalSections}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Overlay panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-[#FEFDFB] rounded-t-3xl shadow-2xl"
        style={{ maxHeight: '88vh' }}
      >
        <div className="flex flex-col h-full max-h-[88vh]">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header with close button */}
          <div className="flex items-center justify-between px-5 py-2">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2D3142]">
                {prayer.nameEnglish}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step navigation pills */}
          <CoachingStepNav
            currentPhase={phase}
            completedPhases={completedPhases}
            onJumpTo={jumpToPhase}
            showContext={currentSectionIndex === 0 && !prefs.skipContextCard}
          />

          {/* Section dots */}
          {renderSectionDots()}

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-5 pb-8">
            <AnimatePresence mode="wait">
              {phase === 'context' && (
                <ContextPhase
                  key="context"
                  prayer={prayer}
                  onAdvance={advancePhase}
                />
              )}

              {phase === 'listen' && currentSection && (
                <ListenPhase
                  key={`listen-${currentSectionIndex}`}
                  section={currentSection}
                  targetCount={prefs.listenCount}
                  currentRep={repCount}
                  isPlaying={isPlaying}
                  isLoading={isLoading}
                  onSkip={advancePhase}
                />
              )}

              {phase === 'follow_along' && currentSection && (
                <FollowAlongPhase
                  key={`follow-${currentSectionIndex}`}
                  section={currentSection}
                  targetCount={prefs.followAlongCount}
                  currentRep={repCount}
                  isPlaying={isPlaying}
                  highlightedWordIndex={highlightedWordIndex}
                  onSkip={advancePhase}
                />
              )}

              {phase === 'say_together' && currentSection && (
                <SayTogetherPhase
                  key={`say-${currentSectionIndex}`}
                  section={currentSection}
                  targetCount={prefs.sayTogetherCount}
                  currentRep={repCount}
                  isPlaying={isPlaying}
                  isLoading={isLoading}
                  onSkip={advancePhase}
                />
              )}

              {phase === 'try_yourself' && currentSection && (
                <TryYourselfPhase
                  key={`try-${currentSectionIndex}`}
                  section={currentSection}
                  showTranslation={prefs.showTranslationDuringPractice}
                  isPlaying={isPlaying}
                  isLoading={isLoading}
                  onPlayCheck={() => {
                    const text =
                      pronunciation === 'american'
                        ? currentSection.transliteration
                        : currentSection.hebrewText;
                    const mode =
                      pronunciation === 'american'
                        ? 'transliteration'
                        : 'hebrew';
                    play(text, mode, 1.0, prayer.id, currentSection.id);
                  }}
                  onComplete={advancePhase}
                />
              )}

              {phase === 'section_complete' && currentSection && (
                <SectionCompletePhase
                  key={`complete-${currentSectionIndex}`}
                  section={currentSection}
                  sectionIndex={currentSectionIndex}
                  totalSections={totalSections}
                  isLastSection={isLastSection}
                  onNext={advancePhase}
                />
              )}

              {phase === 'feedback' && (
                <FeedbackPhase
                  key="feedback"
                  prayer={prayer}
                  onComplete={handleFeedback}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
