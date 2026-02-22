'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { QuickAnswerCard } from './QuickAnswerCard';
import { GuideStepCard } from './GuideStepCard';
import { GuideQuiz } from './GuideQuiz';
import { GuideCard } from './GuideCard';
import type { Guide } from '@/types';
import { getGuideCategoryInfo, GUIDES } from '@/lib/content/guides';

interface GuideReaderProps {
  guide: Guide;
  onBack: () => void;
  onNavigate: (guideId: string) => void;
}

export function GuideReader({ guide, onBack, onNavigate }: GuideReaderProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const guideProgress = useUserStore((s) => s.guideProgress);
  const markGuideRead = useUserStore((s) => s.markGuideRead);
  const toggleGuideBookmark = useUserStore((s) => s.toggleGuideBookmark);
  const completeGuideQuiz = useUserStore((s) => s.completeGuideQuiz);

  const category = getGuideCategoryInfo(guide.category);
  const progress = guideProgress[guide.id];
  const isRead = progress?.read;
  const isBookmarked = progress?.bookmarked;

  const relatedGuides = (guide.relatedGuideIds || [])
    .map((id) => GUIDES.find((g) => g.id === id))
    .filter(Boolean) as Guide[];

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-[#F8F7F4]">
        <div className="max-w-md mx-auto px-5 pt-6 pb-24">
          {/* Quiz header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowQuiz(false)}
              className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div>
              <p className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider">Quiz</p>
              <h2 className="text-lg font-bold text-[#2D3142]">{guide.title}</h2>
            </div>
          </div>
          <GuideQuiz
            questions={guide.quiz}
            onComplete={(score, total) => completeGuideQuiz(guide.id, score, total)}
            onClose={() => setShowQuiz(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-md mx-auto px-5 pt-6 pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {/* Category pill */}
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: category?.color || '#1B4965' }}
            >
              {category?.icon} {category?.title}
            </span>
            {/* Bookmark */}
            <button
              onClick={() => toggleGuideBookmark(guide.id)}
              className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isBookmarked ? '#C6973F' : 'none'}
                stroke={isBookmarked ? '#C6973F' : '#9CA3AF'}
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-[#2D3142]">{guide.title}</h1>
          {guide.titleHebrew && (
            <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-lg text-[#1B4965]/50 mt-1">
              {guide.titleHebrew}
            </p>
          )}
        </motion.div>

        {/* When relevant pill */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4">
          <div className="inline-flex items-center gap-1.5 bg-[#5FA8D3]/10 text-[#1B4965] text-[12px] font-medium px-3 py-1.5 rounded-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {guide.whenRelevant}
          </div>
        </motion.div>

        {/* Quick Answer */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4">
          <QuickAnswerCard quickAnswer={guide.quickAnswer} />
        </motion.div>

        {/* Why It Matters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-5">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Why It Matters</h3>
          <p className="text-[14px] text-[#2D3142]/80 leading-relaxed">{guide.whyItMatters}</p>
        </motion.div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Step by Step</h3>
          <div className="space-y-4">
            {guide.steps.map((step, i) => (
              <GuideStepCard key={step.id} step={step} stepNumber={i + 1} />
            ))}
          </div>
        </motion.div>

        {/* Practical Tips */}
        {guide.practicalTips.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Practical Tips</h3>
            <div className="bg-white rounded-2xl border border-gray-100/80 p-4 space-y-2.5">
              {guide.practicalTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#4A7C59]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#2D3142]/80 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Common Mistakes */}
        {guide.commonMistakes && guide.commonMistakes.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Common Mistakes</h3>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 space-y-2.5">
              {guide.commonMistakes.map((mistake, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                  <p className="text-[13px] text-[#2D3142]/80 leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Halachic Sources */}
        {guide.sources.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-6">
            <button
              onClick={() => setSourcesExpanded(!sourcesExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Halachic Sources ({guide.sources.length})
              </h3>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                className={`transition-transform ${sourcesExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {sourcesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 bg-white rounded-2xl border border-gray-100/80 p-4 space-y-2"
              >
                {guide.sources.map((source, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6973F" strokeWidth="2" className="shrink-0 mt-1">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                    <p className="text-[12px] text-[#2D3142]/70 leading-relaxed">{source}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Related Guides</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
              {relatedGuides.map((rg) => (
                <button
                  key={rg.id}
                  onClick={() => onNavigate(rg.id)}
                  className="shrink-0 w-44 bg-white rounded-xl border border-gray-100/80 p-3 text-left hover:shadow-sm transition-all active:scale-[0.98]"
                >
                  <span className="text-lg">{rg.icon}</span>
                  <p className="text-[13px] font-semibold text-[#2D3142] mt-1.5 line-clamp-1">{rg.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{rg.summary}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8 space-y-3">
          {/* Take Quiz */}
          {guide.quiz.length > 0 && (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3.5 bg-[#8B5CF6] text-white text-[15px] font-semibold rounded-2xl hover:bg-[#7C3AED] transition-colors shadow-sm"
            >
              {progress?.quizCompletedAt ? `Retake Quiz (${progress.quizScore}/${progress.quizTotal})` : 'Take Quiz'}
            </button>
          )}

          {/* Mark as Read */}
          {!isRead && (
            <button
              onClick={() => markGuideRead(guide.id)}
              className="w-full py-3.5 bg-[#4A7C59] text-white text-[15px] font-semibold rounded-2xl hover:bg-[#3d6849] transition-colors shadow-sm"
            >
              Mark as Read
            </button>
          )}

          {isRead && (
            <div className="flex items-center justify-center gap-2 text-[#4A7C59] py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-medium">Read</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
