'use client';

import { useState, useRef } from 'react';
import { useUserStore } from '@/stores/userStore';

/** Insert `-female` before the file extension when voiceGender is female */
function applyGenderSuffix(url: string, gender: 'male' | 'female'): string {
  if (gender !== 'female') return url;
  const dotIdx = url.lastIndexOf('.');
  if (dotIdx === -1) return url;
  return `${url.slice(0, dotIdx)}-female${url.slice(dotIdx)}`;
}

interface AudioButtonProps {
  audioUrl?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  onPlay?: () => void;
}

const sizeStyles = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-base',
  lg: 'w-20 h-20 text-xl',
};

const variantStyles = {
  primary: 'bg-[#1B4965] text-white hover:bg-[#163d55]',
  ghost: 'bg-transparent text-[#1B4965] hover:bg-[#1B4965]/10',
  outline: 'border-2 border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965]/5',
};

export function AudioButton({
  audioUrl,
  label,
  size = 'md',
  variant = 'primary',
  className = '',
  onPlay,
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceGender = useUserStore((s) => s.profile.voiceGender) || 'male';

  const handlePlay = () => {
    if (!audioUrl) {
      onPlay?.();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const genderedUrl = applyGenderSuffix(audioUrl, voiceGender);
    const audio = new Audio(genderedUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      // Fallback to original URL if gendered file doesn't exist
      if (genderedUrl !== audioUrl) {
        const fallback = new Audio(audioUrl);
        audioRef.current = fallback;
        fallback.onplay = () => setIsPlaying(true);
        fallback.onended = () => setIsPlaying(false);
        fallback.onerror = () => setIsPlaying(false);
        fallback.play().catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    };

    audio.play().catch(() => setIsPlaying(false));
    onPlay?.();
  };

  return (
    <button
      onClick={handlePlay}
      className={`
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        rounded-full flex items-center justify-center
        transition-all duration-200
        ${isPlaying ? 'scale-110 ring-4 ring-[#5FA8D3]/30' : ''}
        active:scale-95
        ${className}
      `}
      aria-label={label || 'Play audio'}
    >
      {isPlaying ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      )}
    </button>
  );
}
