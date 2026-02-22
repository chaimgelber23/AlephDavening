'use client';

import { useState, useEffect } from 'react';
import { AUDIO_SOURCES, getAvailableSources, getAudioForPrayer, type AudioSourceId, type PrayerAudioEntry } from '@/lib/content/audio-sources';

interface AudioSourcePickerProps {
  prayerId: string;
  selectedSource: AudioSourceId;
  onSelectSource: (sourceId: AudioSourceId, entry: PrayerAudioEntry | null) => void;
}

export function AudioSourcePicker({ prayerId, selectedSource, onSelectSource }: AudioSourcePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const availableSources = getAvailableSources(prayerId);
  const entries = getAudioForPrayer(prayerId);

  // If only TTS is available, don't show the picker
  if (availableSources.length <= 1) return null;

  const currentSource = AUDIO_SOURCES[selectedSource];
  const selectedEntry = entries.find((e) => e.sourceId === selectedSource) ?? null;

  return (
    <div className="relative">
      {/* Current source pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1B4965]/8 text-[#1B4965] hover:bg-[#1B4965]/15 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        {currentSource?.shortLabel ?? 'Source'}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40 min-w-[200px]">
            {availableSources.map((sourceId) => {
              const source = AUDIO_SOURCES[sourceId];
              const entry = entries.find((e) => e.sourceId === sourceId);
              const isSelected = sourceId === selectedSource;

              return (
                <button
                  key={sourceId}
                  onClick={() => {
                    onSelectSource(sourceId, entry ?? null);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-[#1B4965]/5' : ''
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#1B4965]' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#1B4965]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isSelected ? 'text-[#1B4965]' : 'text-[#2D3142]'}`}>
                      {source.label}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {entry?.type === 'nusach' ? 'Nusach melody' : entry?.type === 'full-prayer' ? 'Full reading' : source.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
