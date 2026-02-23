'use client';

import type { DaveningService, ServiceSegment, ServiceItem, AmudRole, PhysicalAction } from '@/types';

const ROLE_ICONS: Record<AmudRole, string> = {
  shaliach_tzibbur: '🎤',
  congregation: '👥',
  both: '🤝',
  silent_individual: '🤫',
};

const ROLE_LABELS: Record<AmudRole, { label: string; color: string; bg: string }> = {
  shaliach_tzibbur: { label: 'Say Aloud', color: 'text-white', bg: 'bg-[#1B4965]' },
  congregation: { label: 'Congregation', color: 'text-[#4A7C59]', bg: 'bg-[#4A7C59]/10' },
  both: { label: 'Everyone', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
  silent_individual: { label: 'Silent', color: 'text-gray-500', bg: 'bg-gray-100' },
};

const ACTION_LABELS: Record<PhysicalAction, string> = {
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

const TYPE_LABELS: Record<string, string> = {
  kaddish: 'Kaddish',
  instruction: 'Note',
  responsive: 'Call & Response',
  torah_reading: 'Torah Reading',
};

export function TefillahPrepSheet({
  service,
  onBack,
}: {
  service: DaveningService;
  onBack: () => void;
}) {
  // Collect all congregation responses for the quick-reference section
  const congregationResponses: {
    label: string;
    labelHebrew?: string;
    response: string;
    transliteration?: string;
  }[] = [];

  for (const segment of service.segments) {
    for (const item of segment.items) {
      if (item.amud.congregationResponse) {
        congregationResponses.push({
          label: item.label,
          labelHebrew: item.labelHebrew,
          response: item.amud.congregationResponse,
          transliteration: item.amud.congregationResponseTransliteration,
        });
      }
    }
  }

  // Stats
  const totalItems = service.segments.reduce((sum, seg) => sum + seg.items.length, 0);
  const roleCounts: Record<AmudRole, number> = {
    shaliach_tzibbur: 0,
    congregation: 0,
    both: 0,
    silent_individual: 0,
  };
  for (const segment of service.segments) {
    for (const item of segment.items) {
      roleCounts[item.amud.role]++;
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header — hidden when printing */}
      <div className="bg-[#1B4965] text-white px-6 py-6 rounded-b-3xl no-print">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="text-[#5FA8D3] text-sm hover:text-white">
            ← Back
          </button>
          <div className="flex items-center justify-between mt-3">
            <div>
              <h1 className="text-xl font-bold">{service.name}</h1>
              <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-[#5FA8D3] text-sm mt-0.5">
                {service.nameHebrew}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Print Header — only visible when printing */}
      <div className="hidden print-only px-6 pt-6 pb-4 border-b-2 border-gray-200">
        <div className="max-w-2xl mx-auto flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
            <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-lg text-gray-600 mt-0.5">
              {service.nameHebrew}
            </p>
          </div>
          <span className="text-sm text-gray-500">~{service.estimatedMinutes} min</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 pb-28">
        {/* Legend */}
        <div className="border border-gray-100 rounded-2xl p-4 prep-segment print:border-gray-300">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Roles</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ROLE_LABELS) as AmudRole[]).map((role) => (
                  <span key={role} className="inline-flex items-center gap-1 text-xs text-gray-600">
                    <span>{ROLE_ICONS[role]}</span>
                    <span>{ROLE_LABELS[role].label}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Actions</p>
              <div className="flex flex-wrap gap-1.5">
                {['stand', 'bow', 'cover_eyes', 'rise_on_toes', 'three_steps_forward'].map((action) => (
                  <span key={action} className="px-2 py-0.5 rounded-full bg-[#D4A373]/10 text-[#8B6914] text-[10px] font-medium print:bg-amber-50 print:border print:border-amber-200">
                    {ACTION_LABELS[action as PhysicalAction]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Segments */}
        {service.segments.map((segment) => (
          <SegmentBlock key={segment.id} segment={segment} />
        ))}

        {/* Congregation Response Quick-Reference */}
        {congregationResponses.length > 0 && (
          <div className="prep-segment">
            <h2 className="text-sm font-bold text-[#2D3142] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A7C59]/10 flex items-center justify-center text-xs">👥</span>
              Congregation Responses — Quick Reference
            </h2>
            <div className="space-y-2">
              {congregationResponses.map((resp, i) => (
                <div key={i} className="border border-[#4A7C59]/20 rounded-xl p-3 prep-response print:border-green-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#2D3142]">{resp.label}</span>
                    {resp.labelHebrew && (
                      <span dir="rtl" className="font-[var(--font-hebrew-serif)] text-xs text-gray-400">
                        {resp.labelHebrew}
                      </span>
                    )}
                  </div>
                  <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-base text-[#4A7C59] leading-relaxed">
                    {resp.response}
                  </p>
                  {resp.transliteration && (
                    <p className="text-xs text-[#4A7C59]/60 italic mt-1">
                      {resp.transliteration}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="border-t border-gray-100 pt-4 prep-segment print:border-gray-300">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Summary</p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs text-gray-500">
              {totalItems} items
            </span>
            <span className="text-xs text-gray-500">
              ~{service.estimatedMinutes} min
            </span>
            {(Object.keys(roleCounts) as AmudRole[]).map((role) =>
              roleCounts[role] > 0 ? (
                <span key={role} className="text-xs text-gray-500">
                  {ROLE_ICONS[role]} {roleCounts[role]} {ROLE_LABELS[role].label.toLowerCase()}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentBlock({
  segment,
}: {
  segment: ServiceSegment;
}) {
  const totalSeconds = segment.items.reduce((sum, item) => sum + (item.estimatedSeconds || 0), 0);
  const minutes = Math.ceil(totalSeconds / 60);

  return (
    <div className="prep-segment">
      {/* Segment Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-3 h-10 rounded-full shrink-0 print-color"
          style={{ backgroundColor: segment.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#2D3142] text-sm">{segment.title}</h3>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              {minutes > 0 && <span>~{minutes} min</span>}
              <span>{segment.items.length} items</span>
            </div>
          </div>
          {segment.titleHebrew && (
            <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-xs text-gray-400 mt-0.5">
              {segment.titleHebrew}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {segment.description && (
        <p className="text-xs text-gray-500 mb-2 ml-6">{segment.description}</p>
      )}

      {/* Items */}
      <div
        className="ml-4 border-l-2 pl-4 space-y-1"
        style={{ borderColor: segment.color + '40' }}
      >
        {segment.items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ItemRow({
  item,
}: {
  item: ServiceItem;
}) {
  const roleConfig = ROLE_LABELS[item.amud.role];
  const hasResponse = !!item.amud.congregationResponse;
  const hasActions = item.amud.physicalActions && item.amud.physicalActions.length > 0;
  const isInstruction = item.type === 'instruction';

  return (
    <div className={`rounded-xl px-3 py-2 ${isInstruction ? 'bg-gray-50 print:bg-gray-100' : ''}`}>
      {/* Main row */}
      <div className="flex items-center gap-2">
        {/* Role icon */}
        <span className="text-xs shrink-0">{ROLE_ICONS[item.amud.role]}</span>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-sm ${isInstruction ? 'text-gray-400 italic' : 'text-[#2D3142] font-medium'}`}>
              {item.label}
            </span>
            {item.labelHebrew && (
              <span dir="rtl" className="font-[var(--font-hebrew-serif)] text-xs text-gray-400">
                {item.labelHebrew}
              </span>
            )}
            {item.type !== 'prayer' && item.type !== 'instruction' && (
              <span className="text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full print:bg-gray-200">
                {TYPE_LABELS[item.type] || item.type}
              </span>
            )}
          </div>
        </div>

        {/* Role badge */}
        <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${roleConfig.bg} ${roleConfig.color} print-color`}>
          {roleConfig.label.toUpperCase()}
        </span>
      </div>

      {/* Instruction */}
      {item.amud.instruction && (
        <p className="text-[11px] text-gray-500 mt-1 ml-5 leading-snug">
          {item.amud.instruction}
        </p>
      )}

      {/* Physical actions + wait indicator */}
      {(hasActions || item.amud.waitForCongregation) && (
        <div className="flex flex-wrap gap-1 mt-1 ml-5">
          {item.amud.physicalActions?.map((action) => (
            <span
              key={action}
              className="px-1.5 py-0.5 rounded-full bg-[#D4A373]/10 text-[#8B6914] text-[9px] font-medium print:bg-amber-50 print:border print:border-amber-200 print-color"
            >
              {ACTION_LABELS[action]}
            </span>
          ))}
          {item.amud.waitForCongregation && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#1B4965]/10 text-[#1B4965] text-[9px] font-medium print:bg-blue-50 print:border print:border-blue-200">
              Wait for congregation
            </span>
          )}
        </div>
      )}

      {/* Congregation response inline */}
      {hasResponse && (
        <div className="mt-1.5 ml-5 bg-[#4A7C59]/5 rounded-lg p-2 prep-response print:bg-green-50 print:border print:border-green-200">
          <p className="text-[9px] uppercase tracking-wider text-[#4A7C59] font-semibold mb-0.5">
            Congregation responds
          </p>
          <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-sm text-[#4A7C59] leading-relaxed">
            {item.amud.congregationResponse}
          </p>
          {item.amud.congregationResponseTransliteration && (
            <p className="text-[10px] text-[#4A7C59]/60 italic mt-0.5">
              {item.amud.congregationResponseTransliteration}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
