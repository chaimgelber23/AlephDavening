'use client';

import type { AmudRole } from '@/types';

const ROLE_CONFIG: Record<AmudRole, { label: string; bg: string; text: string }> = {
  shaliach_tzibbur: { label: 'SAY ALOUD', bg: 'bg-[#1B4965]', text: 'text-white' },
  congregation: { label: 'CONGREGATION', bg: 'bg-[#4A7C59]/15', text: 'text-[#4A7C59]' },
  both: { label: 'EVERYONE', bg: 'bg-[#7C3AED]/15', text: 'text-[#7C3AED]' },
  silent_individual: { label: 'SILENT', bg: 'bg-gray-100', text: 'text-gray-500' },
};

export function AmudBadge({ role }: { role: AmudRole }) {
  const config = ROLE_CONFIG[role];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
