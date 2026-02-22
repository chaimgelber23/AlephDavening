'use client';

import type { PhysicalAction } from '@/types';

const ACTION_CONFIG: Record<PhysicalAction, { label: string; icon: string }> = {
  stand: { label: 'Stand', icon: '🧍' },
  sit: { label: 'Sit', icon: '🪑' },
  bow: { label: 'Bow', icon: '🙇' },
  bow_and_stand: { label: 'Bow & Stand', icon: '🙇' },
  three_steps_forward: { label: '3 Steps Forward', icon: '👣' },
  three_steps_back: { label: '3 Steps Back', icon: '👣' },
  cover_eyes: { label: 'Cover Eyes', icon: '🤚' },
  face_west: { label: 'Face West', icon: '🧭' },
  rise_on_toes: { label: 'Rise on Toes', icon: '⬆' },
};

export function PhysicalActionPill({ action }: { action: PhysicalAction }) {
  const config = ACTION_CONFIG[action];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4A373]/15 text-[#8B6914] text-[10px] font-medium">
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
