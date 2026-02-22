'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import type { DaveningService } from '@/types';

const TIME_ICONS: Record<string, string> = {
  shacharit: '🌅',
  mincha: '☀️',
  maariv: '🌙',
  musaf: '📜',
  kabbalat_shabbat: '🕯️',
};

export function ServiceCard({
  service,
  onSelect,
  index = 0,
}: {
  service: DaveningService;
  onSelect: (service: DaveningService) => void;
  index?: number;
}) {
  const servicePosition = useUserStore((s) => s.servicePosition[service.id]);

  // Calculate how far they've gotten
  const totalItems = service.segments.reduce((sum, seg) => sum + seg.items.length, 0);
  let completedItems = 0;
  if (servicePosition) {
    for (let i = 0; i < servicePosition.segmentIndex; i++) {
      completedItems += service.segments[i]?.items.length || 0;
    }
    completedItems += servicePosition.itemIndex;
  }
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => onSelect(service)}
      className="w-full bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-[#5FA8D3]/30 p-5 text-left transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#1B4965]/8 flex items-center justify-center text-xl shrink-0">
          {TIME_ICONS[service.timeOfDay] || '📖'}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-[#2D3142] text-[15px]">{service.name}</h3>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              ~{service.estimatedMinutes} min
            </span>
          </div>

          {/* Hebrew name */}
          <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-sm text-gray-400 mt-0.5">
            {service.nameHebrew}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">
            {service.description}
          </p>

          {/* Segment preview dots */}
          <div className="flex gap-1 mt-3">
            {service.segments.map((segment) => (
              <div
                key={segment.id}
                className="h-1.5 rounded-full flex-1"
                style={{ backgroundColor: segment.color + '40' }}
              />
            ))}
          </div>

          {/* Resume indicator */}
          {servicePosition && progressPercent > 0 && progressPercent < 100 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B4965] rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-[#1B4965] font-medium">
                {progressPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-gray-300 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  );
}
