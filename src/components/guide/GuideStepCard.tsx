'use client';

import { AudioButton } from '@/components/ui/AudioButton';
import type { GuideStep } from '@/types';

interface GuideStepCardProps {
  step: GuideStep;
  stepNumber: number;
}

export function GuideStepCard({ step, stepNumber }: GuideStepCardProps) {
  return (
    <div className="flex gap-3">
      {/* Step number */}
      <div className="w-7 h-7 rounded-full bg-[#1B4965] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        {stepNumber}
      </div>

      <div className="flex-1 min-w-0">
        {/* Instruction */}
        <p className="text-[14px] text-[#2D3142] leading-relaxed">{step.instruction}</p>

        {/* Hebrew text block (for brachot) */}
        {step.hebrewText && (
          <div className="bg-[#FEFDFB] border border-[#C6973F]/15 rounded-xl p-3.5 mt-2.5">
            <p
              dir="rtl"
              className="font-[var(--font-hebrew-serif)] text-xl text-[#1A1A2E] leading-[2.2] text-center"
            >
              {step.hebrewText}
            </p>
            {step.transliteration && (
              <p className="text-[13px] text-[#1B4965] text-center mt-2 italic">
                {step.transliteration}
              </p>
            )}
            {step.translation && (
              <p className="text-[12px] text-gray-400 text-center mt-1">
                {step.translation}
              </p>
            )}
            {step.audioUrl && (
              <div className="flex justify-center mt-2.5">
                <AudioButton audioUrl={step.audioUrl} size="sm" variant="outline" />
              </div>
            )}
          </div>
        )}

        {/* Tip callout */}
        {step.tip && (
          <div className="bg-[#5FA8D3]/8 border border-[#5FA8D3]/15 rounded-xl p-3 mt-2.5 flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5FA8D3" strokeWidth="2" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-[12px] text-[#2D3142]/70 leading-relaxed">{step.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
