'use client';

import { motion } from 'framer-motion';
import type { Guide, GuideProgress } from '@/types';
import { getGuideCategoryInfo } from '@/lib/content/guides';

interface GuideCardProps {
  guide: Guide;
  progress?: GuideProgress;
  onClick: () => void;
  index?: number;
}

export function GuideCard({ guide, progress, onClick, index = 0 }: GuideCardProps) {
  const category = getGuideCategoryInfo(guide.category);
  const isRead = progress?.read;
  const hasQuiz = progress?.quizCompletedAt;
  const isBookmarked = progress?.bookmarked;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 hover:shadow-md transition-all active:scale-[0.99] flex items-center gap-3.5"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-lg"
        style={{ backgroundColor: `${category?.color || '#1B4965'}12` }}
      >
        {guide.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-[#2D3142] truncate">{guide.title}</p>
          {isBookmarked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#C6973F" className="shrink-0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{guide.summary}</p>
        {/* Status pills */}
        <div className="flex items-center gap-1.5 mt-1.5">
          {isRead && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#4A7C59] bg-[#4A7C59]/8 px-2 py-0.5 rounded-full">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Read
            </span>
          )}
          {hasQuiz && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#8B5CF6] bg-[#8B5CF6]/8 px-2 py-0.5 rounded-full">
              {progress!.quizScore}/{progress!.quizTotal}
            </span>
          )}
        </div>
      </div>

      {/* Chevron */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" className="shrink-0">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.button>
  );
}
