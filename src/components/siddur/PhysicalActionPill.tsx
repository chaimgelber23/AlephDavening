'use client';

import type { PhysicalAction } from '@/types';

const ACTION_CONFIG: Record<PhysicalAction, string> = {
  stand: 'Stand',
  sit: 'Sit',
  bow: 'Bow',
  bow_and_stand: 'Bow & Stand',
  three_steps_forward: '3 Steps Forward',
  three_steps_back: '3 Steps Back',
  cover_eyes: 'Cover Eyes',
  face_west: 'Face West',
  rise_on_toes: 'Rise on Toes',
};

export function PhysicalActionPill({ action }: { action: PhysicalAction }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D4A373]/15 text-[#8B6914] text-[10px] font-medium">
      {ACTION_CONFIG[action]}
    </span>
  );
}
