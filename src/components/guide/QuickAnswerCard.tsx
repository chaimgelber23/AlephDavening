'use client';

interface QuickAnswerCardProps {
  quickAnswer: string;
}

export function QuickAnswerCard({ quickAnswer }: QuickAnswerCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#C6973F]/10 to-[#C6973F]/5 border border-[#C6973F]/20 rounded-2xl p-4">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#C6973F]/15 flex items-center justify-center shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6973F" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#C6973F] uppercase tracking-wider mb-1">Quick Answer</p>
          <p className="text-[14px] text-[#2D3142] leading-relaxed">{quickAnswer}</p>
        </div>
      </div>
    </div>
  );
}
