'use client';

import { useState, useRef, useCallback } from 'react';
import type { Pronunciation, VoiceGender } from '@/types';

type AudioMode = 'hebrew' | 'transliteration';

/**
 * File-suffix map for each pronunciation style.
 * 'modern' is the default (no suffix). Add new styles here.
 *
 * File convention:  /audio/prayers/{prayerId}/{sectionId}{suffix}.mp3
 *   modern   → modeh-ani-1.mp3
 *   american → modeh-ani-1-american.mp3
 *   (future) → modeh-ani-1-{style}.mp3
 */
const PRONUNCIATION_SUFFIX: Record<Pronunciation, string> = {
  modern: '',
  american: '-american',
};

interface UseAudioOptions {
  speed?: number;
  onEnded?: () => void;
  pronunciation?: Pronunciation;
  voiceGender?: VoiceGender;
}

interface AudioTimeRange {
  startTime: number;
  endTime?: number;
}

/**
 * Try to play a pre-generated static file first.
 * Returns the URL if it exists, null otherwise.
 */
async function tryStaticFile(
  prayerId: string,
  sectionId: string,
  pronunciation: Pronunciation
): Promise<string | null> {
  const suffix = PRONUNCIATION_SUFFIX[pronunciation] ?? '';
  const url = `/audio/prayers/${prayerId}/${sectionId}${suffix}.mp3`;

  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.ok) return url;
  } catch {
    // static file doesn't exist
  }

  // Fall back to default (no-suffix) if the styled variant is missing
  if (suffix) {
    const fallbackUrl = `/audio/prayers/${prayerId}/${sectionId}.mp3`;
    try {
      const res = await fetch(fallbackUrl, { method: 'HEAD' });
      if (res.ok) return fallbackUrl;
    } catch {
      // no fallback either
    }
  }

  return null;
}

/**
 * Try to find a full-prayer Siddur Audio recording.
 * Convention: /audio/prayers/{prayerId}/{prayerId}-sidduraudio.mp3
 */
async function trySiddurAudioFile(prayerId: string): Promise<string | null> {
  const url = `/audio/prayers/${prayerId}/${prayerId}-sidduraudio.mp3`;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.ok) return url;
  } catch {
    // doesn't exist
  }
  return null;
}

export function useAudio(options?: UseAudioOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentUrlRef = useRef<string | null>(null);
  const timeRangeRef = useRef<AudioTimeRange | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const stopTimeTracking = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    stopTimeTracking();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    timeRangeRef.current = null;
  }, [stopTimeTracking]);

  const onEndedRef = useRef(options?.onEnded);
  onEndedRef.current = options?.onEnded;

  const startTimeTracking = useCallback((audio: HTMLAudioElement) => {
    const track = () => {
      if (!audio.paused) {
        const range = timeRangeRef.current;
        const time = audio.currentTime;

        // If we have a time range and we've passed the end, stop
        if (range?.endTime && time >= range.endTime) {
          audio.pause();
          setIsPlaying(false);
          onEndedRef.current?.();
          return;
        }

        setCurrentTime(range ? time - range.startTime : time);
        animFrameRef.current = requestAnimationFrame(track);
      }
    };
    animFrameRef.current = requestAnimationFrame(track);
  }, []);

  const playAudioUrl = useCallback(async (
    url: string,
    speed: number,
    isBlob: boolean,
    timeRange?: AudioTimeRange,
  ) => {
    if (isBlob && currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
    }
    currentUrlRef.current = isBlob ? url : null;

    const audio = new Audio(url);
    audio.playbackRate = speed;
    audioRef.current = audio;
    timeRangeRef.current = timeRange ?? null;

    audio.onloadedmetadata = () => {
      const totalDur = timeRange
        ? (timeRange.endTime ?? audio.duration) - timeRange.startTime
        : audio.duration;
      setDuration(totalDur);
    };

    audio.onended = () => {
      stopTimeTracking();
      setIsPlaying(false);
      onEndedRef.current?.();
    };
    audio.onerror = () => {
      stopTimeTracking();
      setIsPlaying(false);
      setError('Playback error');
    };

    // Seek to start time if we have a time range
    if (timeRange?.startTime) {
      audio.currentTime = timeRange.startTime;
    }

    await audio.play();
    setIsPlaying(true);
    startTimeTracking(audio);
  }, [startTimeTracking, stopTimeTracking]);

  /**
   * Play a section of a prayer.
   * Priority: static per-section file → full-prayer siddur audio → Google TTS
   */
  const play = useCallback(async (
    text: string,
    mode: AudioMode = 'hebrew',
    speedOverride?: number,
    prayerId?: string,
    sectionId?: string,
  ) => {
    stop();
    setError(null);
    setIsLoading(true);

    const speed = speedOverride ?? options?.speed ?? 1.0;
    const pronunciation = options?.pronunciation ?? 'modern';

    try {
      // 1. Try pre-generated static file per section
      if (prayerId && sectionId) {
        const staticUrl = await tryStaticFile(prayerId, sectionId, pronunciation);
        if (staticUrl) {
          await playAudioUrl(staticUrl, speed, false);
          setIsLoading(false);
          return;
        }
      }

      // 2. Try full-prayer Siddur Audio recording
      if (prayerId) {
        const siddurUrl = await trySiddurAudioFile(prayerId);
        if (siddurUrl) {
          await playAudioUrl(siddurUrl, speed, false);
          setIsLoading(false);
          return;
        }
      }

      // 3. Fall back to Google Cloud TTS
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, speed, voiceGender: options?.voiceGender || 'male' }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Audio unavailable' }));
        throw new Error(data.error || 'Failed to generate audio');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      await playAudioUrl(url, speed, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Audio unavailable');
    } finally {
      setIsLoading(false);
    }
  }, [stop, options?.speed, options?.pronunciation, options?.voiceGender, playAudioUrl]);

  /**
   * Play audio from a direct URL, optionally with a time range.
   * Used for service-level audio and source recordings.
   */
  const playSource = useCallback(async (
    url: string,
    speedOverride?: number,
    timeRange?: AudioTimeRange,
  ) => {
    stop();
    setError(null);
    setIsLoading(true);

    const speed = speedOverride ?? options?.speed ?? 1.0;

    try {
      await playAudioUrl(url, speed, false, timeRange);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Audio unavailable');
    } finally {
      setIsLoading(false);
    }
  }, [stop, options?.speed, playAudioUrl]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      const range = timeRangeRef.current;
      audioRef.current.currentTime = range ? time + range.startTime : time;
      setCurrentTime(time);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      stopTimeTracking();
      setIsPlaying(false);
    }
  }, [isPlaying, stopTimeTracking]);

  const resume = useCallback(async () => {
    if (audioRef.current && !isPlaying) {
      await audioRef.current.play();
      setIsPlaying(true);
      startTimeTracking(audioRef.current);
    }
  }, [isPlaying, startTimeTracking]);

  return {
    play,
    playSource,
    stop,
    pause,
    resume,
    seek,
    isPlaying,
    isLoading,
    error,
    currentTime,
    duration,
    audioElement: audioRef.current,
  };
}
