'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { AmudBadge } from './AmudBadge';
import type { DaveningService, ServiceSegment, ServiceItem } from '@/types';

const ROLE_ICONS: Record<string, string> = {
  shaliach_tzibbur: '🎤',
  congregation: '👥',
  both: '🤝',
  silent_individual: '🤫',
};

const TYPE_LABELS: Record<string, string> = {
  kaddish: 'Kaddish',
  instruction: 'Note',
  responsive: 'Call & Response',
  torah_reading: 'Torah Reading',
};

export function ServiceRoadmap({
  service,
  onSelectItem,
  onEnterAmudMode,
  onBack,
}: {
  service: DaveningService;
  onSelectItem: (item: ServiceItem, segmentIndex: number, itemIndex: number) => void;
  onEnterAmudMode: () => void;
  onBack: () => void;
}) {
  const [expandedSegment, setExpandedSegment] = useState<string | null>(
    service.segments[0]?.id || null
  );
  const servicePosition = useUserStore((s) => s.servicePosition[service.id]);
  const displaySettings = useUserStore((s) => s.displaySettings);

  // Calculate overall progress
  const totalItems = service.segments.reduce((sum, seg) => sum + seg.items.length, 0);
  let completedItems = 0;
  if (servicePosition) {
    for (let i = 0; i < servicePosition.segmentIndex; i++) {
      completedItems += service.segments[i]?.items.length || 0;
    }
    completedItems += servicePosition.itemIndex;
  }
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const isCurrentItem = (segIdx: number, itemIdx: number) => {
    if (!servicePosition) return false;
    return servicePosition.segmentIndex === segIdx && servicePosition.itemIndex === itemIdx;
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      {/* Header */}
      <div className="bg-[#1B4965] text-white px-6 py-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
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
            <span className="text-xs text-white/50">~{service.estimatedMinutes} min</span>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Progress</span>
              <span className="text-xs text-white/70">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#5FA8D3] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            {/* Segment color markers */}
            <div className="flex gap-0.5 mt-2">
              {service.segments.map((segment) => {
                const segmentPercent = (segment.items.length / totalItems) * 100;
                return (
                  <div
                    key={segment.id}
                    className="h-1 rounded-full"
                    style={{
                      width: `${segmentPercent}%`,
                      backgroundColor: segment.color,
                      opacity: 0.6,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Amud Mode Button */}
          <button
            onClick={onEnterAmudMode}
            className="mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            🎤 Enter Amud Mode
          </button>
        </div>
      </div>

      {/* Segment List */}
      <div className="max-w-md mx-auto px-6 py-4 space-y-3 pb-28">
        {service.segments.map((segment, segIdx) => (
          <SegmentCard
            key={segment.id}
            segment={segment}
            segmentIndex={segIdx}
            isExpanded={expandedSegment === segment.id}
            onToggle={() =>
              setExpandedSegment(expandedSegment === segment.id ? null : segment.id)
            }
            onSelectItem={onSelectItem}
            isCurrentItem={isCurrentItem}
            showAmudCues={displaySettings.showAmudCues}
          />
        ))}
      </div>
    </div>
  );
}

function SegmentCard({
  segment,
  segmentIndex,
  isExpanded,
  onToggle,
  onSelectItem,
  isCurrentItem,
  showAmudCues,
}: {
  segment: ServiceSegment;
  segmentIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectItem: (item: ServiceItem, segmentIndex: number, itemIndex: number) => void;
  isCurrentItem: (segIdx: number, itemIdx: number) => boolean;
  showAmudCues: boolean;
}) {
  const totalSeconds = segment.items.reduce((sum, item) => sum + (item.estimatedSeconds || 0), 0);
  const minutes = Math.ceil(totalSeconds / 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: segmentIndex * 0.05 }}
    >
      {/* Segment Header */}
      <button onClick={onToggle} className="w-full text-left">
        <div
          className={`rounded-2xl border-2 p-4 transition-all ${
            isExpanded
              ? 'border-current bg-opacity-5'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
          style={isExpanded ? { borderColor: segment.color, backgroundColor: segment.color + '0D' } : undefined}
        >
          <div className="flex items-center gap-3">
            {/* Color indicator */}
            <div
              className="w-3 h-10 rounded-full shrink-0"
              style={{ backgroundColor: segment.color }}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#2D3142] text-sm">{segment.title}</h3>
                <div className="flex items-center gap-2">
                  {minutes > 0 && (
                    <span className="text-[10px] text-gray-400">~{minutes} min</span>
                  )}
                  <span className="text-xs text-gray-400">{segment.items.length}</span>
                  <span
                    className={`text-gray-400 transition-transform text-xs ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </div>
              </div>
              {segment.titleHebrew && (
                <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-xs text-gray-400 mt-0.5">
                  {segment.titleHebrew}
                </p>
              )}
              {!isExpanded && segment.description && (
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{segment.description}</p>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {segment.description && (
              <p className="text-xs text-gray-500 mt-2 ml-7 mb-2">{segment.description}</p>
            )}
            <div
              className="mt-2 ml-4 border-l-2 pl-4 space-y-1.5"
              style={{ borderColor: segment.color + '40' }}
            >
              {segment.items.map((item, itemIdx) => {
                const isCurrent = isCurrentItem(segmentIndex, itemIdx);
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item, segmentIndex, itemIdx)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 transition-all ${
                      isCurrent
                        ? 'bg-[#1B4965]/10 border border-[#1B4965]/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* "You are here" dot */}
                      {isCurrent && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#1B4965] shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      )}

                      {/* Role icon */}
                      {showAmudCues && (
                        <span className="text-xs shrink-0">
                          {ROLE_ICONS[item.amud.role]}
                        </span>
                      )}

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${
                            item.type === 'instruction'
                              ? 'text-gray-400 italic'
                              : 'text-[#2D3142] font-medium'
                          }`}>
                            {item.label}
                          </span>
                          {item.type !== 'prayer' && item.type !== 'instruction' && (
                            <span className="text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                              {TYPE_LABELS[item.type] || item.type}
                            </span>
                          )}
                        </div>
                        {item.labelHebrew && (
                          <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-xs text-gray-400">
                            {item.labelHebrew}
                          </p>
                        )}
                      </div>

                      {/* Amud badge */}
                      {showAmudCues && item.type !== 'instruction' && (
                        <AmudBadge role={item.amud.role} />
                      )}
                    </div>

                    {/* Instruction text */}
                    {showAmudCues && item.amud.instruction && (
                      <p className="text-[10px] text-gray-400 mt-1 ml-4">
                        {item.amud.instruction}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
