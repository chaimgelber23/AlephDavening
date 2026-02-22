'use client';

import { useUserStore } from '@/stores/userStore';
import type { DisplaySettings } from '@/types';

const TOGGLES: { key: keyof DisplaySettings; label: string; icon: string }[] = [
  { key: 'showTransliteration', label: 'Transliteration', icon: 'Aa' },
  { key: 'showTranslation', label: 'Translation', icon: 'En' },
  { key: 'showInstructions', label: 'Instructions', icon: '?' },
  { key: 'showAmudCues', label: 'Amud', icon: '🎤' },
];

export function DisplayToggleBar() {
  const displaySettings = useUserStore((s) => s.displaySettings);
  const updateDisplaySettings = useUserStore((s) => s.updateDisplaySettings);

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
      {TOGGLES.map(({ key, label, icon }) => {
        const isOn = displaySettings[key];
        return (
          <button
            key={key}
            onClick={() => updateDisplaySettings({ [key]: !isOn })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              isOn
                ? 'bg-[#1B4965] text-white'
                : 'bg-gray-100 text-gray-400 border border-gray-200'
            }`}
          >
            <span className="text-[10px]">{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
