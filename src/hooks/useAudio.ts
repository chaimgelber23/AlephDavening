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

export function useAudio(options?: UseAudioOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentUrlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const onEndedRef = useRef(options?.onEnded);
  onEndedRef.current = options?.onEnded;

  const playAudioUrl = useCallback(async (url: string, speed: number, isBlob: boolean) => {
    if (isBlob && currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
    }
    currentUrlRef.current = isBlob ? url : null;

    const audio = new Audio(url);
    audio.playbackRate = speed;
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
      onEndedRef.current?.();
    };
    audio.onerror = () => {
      setIsPlaying(false);
      setError('Playback error');
    };

    await audio.play();
    setIsPlaying(true);
  }, []);

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
      // 1. Try pre-generated static file (uses pronunciation for file lookup)
      if (prayerId && sectionId) {
        const staticUrl = await tryStaticFile(prayerId, sectionId, pronunciation);
        if (staticUrl) {
          await playAudioUrl(staticUrl, speed, false);
          setIsLoading(false);
          return;
        }
      }

      // 2. Fall back to TTS API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode, speed, voiceGender: options?.voiceGender || 'male' }),
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

  return { play, stop, isPlaying, isLoading, error };
}
