'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { BottomNav } from '@/components/ui/BottomNav';
import { GuideCategoryTabs } from '@/components/guide/GuideCategoryTabs';
import { GuideCard } from '@/components/guide/GuideCard';
import { GuideReader } from '@/components/guide/GuideReader';
import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategory } from '@/lib/content/guides';
import type { GuideCategory } from '@/types';

type FilterMode = 'all' | 'unread' | 'bookmarked';

export default function GuidePage() {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const guideProgress = useUserStore((s) => s.guideProgress);

  // Filter guides
  const filteredGuides = useMemo(() => {
    let guides = selectedCategory === 'all' ? GUIDES : getGuidesByCategory(selectedCategory);

    // Apply filter mode
    if (filterMode === 'unread') {
      guides = guides.filter((g) => !guideProgress[g.id]?.read);
    } else if (filterMode === 'bookmarked') {
      guides = guides.filter((g) => guideProgress[g.id]?.bookmarked);
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      guides = guides.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q) ||
          g.quickAnswer.toLowerCase().includes(q)
      );
    }

    return guides;
  }, [selectedCategory, filterMode, searchQuery, guideProgress]);

  // Group by category for display
  const groupedGuides = useMemo(() => {
    if (selectedCategory !== 'all') return null;

    const groups: { category: typeof GUIDE_CATEGORIES[0]; guides: typeof filteredGuides }[] = [];
    for (const cat of GUIDE_CATEGORIES) {
      const catGuides = filteredGuides.filter((g) => g.category === cat.id);
      if (catGuides.length > 0) {
        groups.push({ category: cat, guides: catGuides });
      }
    }
    return groups;
  }, [selectedCategory, filteredGuides]);

  // Progress stats
  const readCount = GUIDES.filter((g) => guideProgress[g.id]?.read).length;

  // Active guide
  const activeGuide = activeGuideId ? GUIDES.find((g) => g.id === activeGuideId) : null;

  if (activeGuide) {
    return (
      <GuideReader
        guide={activeGuide}
        onBack={() => setActiveGuideId(null)}
        onNavigate={(id) => {
          setActiveGuideId(id);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1B4965] to-[#1A3F57] text-white px-6 pt-8 pb-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold">Jewish Living Guide</h1>
          <p className="text-white/40 text-sm mt-1">
            {readCount} of {GUIDES.length} guides read
          </p>

          {/* Search */}
          <div className="relative mt-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.08] backdrop-blur-sm text-white placeholder-white/30 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/[0.06] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-5 pt-4 pb-24">
        {/* Category tabs */}
        <GuideCategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Filter pills */}
        <div className="flex items-center gap-2 mt-3 mb-4">
          {(['all', 'unread', 'bookmarked'] as FilterMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                filterMode === mode
                  ? 'bg-[#2D3142] text-white'
                  : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {mode === 'all' ? 'All' : mode === 'unread' ? 'Unread' : 'Bookmarked'}
            </button>
          ))}
        </div>

        {/* Guide list */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">
              {filterMode === 'bookmarked'
                ? 'No bookmarked guides yet'
                : filterMode === 'unread'
                ? 'All guides read!'
                : 'No guides match your search'}
            </p>
          </div>
        ) : groupedGuides ? (
          // Grouped by category
          <div className="space-y-6">
            {groupedGuides.map(({ category: cat, guides }) => (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h2 className="text-[13px] font-bold text-[#2D3142]">{cat.title}</h2>
                  <span className="text-[11px] text-gray-300 font-medium">{guides.length}</span>
                </div>
                <div className="space-y-2">
                  {guides.map((guide, i) => (
                    <GuideCard
                      key={guide.id}
                      guide={guide}
                      progress={guideProgress[guide.id]}
                      onClick={() => setActiveGuideId(guide.id)}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Flat list (filtered by category)
          <div className="space-y-2">
            {filteredGuides.map((guide, i) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                progress={guideProgress[guide.id]}
                onClick={() => setActiveGuideId(guide.id)}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
