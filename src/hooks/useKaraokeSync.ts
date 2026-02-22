'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { WordTiming } from '@/types';

interface UseKaraokeSyncOptions {
  words: string[];
  wordTimings?: WordTiming[];
  isPlaying: boolean;
  duration?: number;
  onWordChange?: (index: number) => void;
}

interface UseKaraokeSyncReturn {
  currentWordIndex: number;
  progress: number;
  reset: () => void;
}

export function useKaraokeSync({
  words,
  wordTimings,
  isPlaying,
  duration,
  onWordChange,
}: UseKaraokeSyncOptions): UseKaraokeSyncReturn {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [progress, setProgress] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevWordIndexRef = useRef<number>(-1);
  const onWordChangeRef = useRef(onWordChange);

  // Keep the callback ref up to date without triggering effects
  useEffect(() => {
    onWordChangeRef.current = onWordChange;
  }, [onWordChange]);

  // Fire onWordChange whenever currentWordIndex changes
  useEffect(() => {
    if (currentWordIndex !== prevWordIndexRef.current) {
      prevWordIndexRef.current = currentWordIndex;
      onWordChangeRef.current?.(currentWordIndex);
    }
  }, [currentWordIndex]);

  const reset = useCallback(() => {
    // Cancel any running animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Clear any running interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    startTimeRef.current = null;
    setCurrentWordIndex(-1);
    setProgress(0);
  }, []);

  // --- Precise mode (wordTimings provided) ---
  useEffect(() => {
    if (!wordTimings || wordTimings.length === 0) return;
    if (words.length === 0) return;

    if (!isPlaying) {
      // Stop: cancel animation frame, reset index
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      startTimeRef.current = null;
      setCurrentWordIndex(-1);
      setProgress(0);
      return;
    }

    // Start playing: record the start time
    startTimeRef.current = performance.now();
    setCurrentWordIndex(0);

    const totalDuration = wordTimings[wordTimings.length - 1].endMs;

    const tick = () => {
      if (startTimeRef.current === null) return;

      const elapsed = performance.now() - startTimeRef.current;

      // If we've exceeded the total duration, finish
      if (elapsed >= totalDuration) {
        setCurrentWordIndex(words.length - 1);
        setProgress(1);
        animationFrameRef.current = null;
        return;
      }

      // Find the word whose timing window contains the current elapsed time
      let foundIndex = -1;
      for (let i = 0; i < wordTimings.length; i++) {
        if (elapsed >= wordTimings[i].startMs && elapsed < wordTimings[i].endMs) {
          foundIndex = i;
          break;
        }
        // If we're past this word but before the next, stay on this word
        if (
          elapsed >= wordTimings[i].endMs &&
          (i + 1 >= wordTimings.length || elapsed < wordTimings[i + 1].startMs)
        ) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex >= 0) {
        setCurrentWordIndex(foundIndex);
      }

      setProgress(Math.min(elapsed / totalDuration, 1));

      // Continue the loop
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, wordTimings, words.length]);

  // --- Even-split fallback (no wordTimings) ---
  useEffect(() => {
    // Only run this effect when wordTimings is NOT provided
    if (wordTimings && wordTimings.length > 0) return;
    if (words.length === 0) return;

    if (!isPlaying) {
      // Stop: clear interval, reset index
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentWordIndex(-1);
      setProgress(0);
      return;
    }

    // Start playing
    const estimatedDuration = words.length * 400;
    const totalDuration = duration || estimatedDuration;
    const msPerWord = totalDuration / words.length;

    let wordIdx = 0;
    setCurrentWordIndex(0);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      wordIdx += 1;

      if (wordIdx >= words.length) {
        // Reached the end
        setCurrentWordIndex(words.length - 1);
        setProgress(1);
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      setCurrentWordIndex(wordIdx);
      setProgress(wordIdx / (words.length - 1));
    }, msPerWord);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, wordTimings, words.length, duration]);

  // Clean up everything on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentWordIndex,
    progress,
    reset,
  };
}
