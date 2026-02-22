'use client';

import { useRef, useEffect } from 'react';
import type { GuideCategory } from '@/types';
import { GUIDE_CATEGORIES } from '@/lib/content/guides';

interface GuideCategoryTabsProps {
  selected: GuideCategory | 'all';
  onSelect: (category: GuideCategory | 'all') => void;
}

export function GuideCategoryTabs({ selected, onSelect }: GuideCategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active tab
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-5 px-5"
    >
      <button
        ref={selected === 'all' ? activeRef : undefined}
        onClick={() => onSelect('all')}
        className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
          selected === 'all'
            ? 'bg-[#1B4965] text-white shadow-sm'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {GUIDE_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          ref={selected === cat.id ? activeRef : undefined}
          onClick={() => onSelect(cat.id)}
          className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
            selected === cat.id
              ? 'text-white shadow-sm'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          style={selected === cat.id ? { backgroundColor: cat.color } : undefined}
        >
          {cat.icon} {cat.title}
        </button>
      ))}
    </div>
  );
}
