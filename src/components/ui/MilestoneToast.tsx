'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { MilestoneType } from '@/types';

const MILESTONE_DATA: Record<MilestoneType, { title: string; message: string; icon: string }> = {
  first_letter: {
    title: 'First Letter!',
    message: "You've learned your first Hebrew letter. The journey of a thousand miles begins with a single step.",
    icon: '✨',
  },
  half_alephbet: {
    title: 'Halfway There!',
    message: "You know half the Aleph-Bet! You're reading Hebrew letters that scholars have used for 3,000 years.",
    icon: '🌟',
  },
  full_alephbet: {
    title: 'Aleph-Bet Master!',
    message: "You can recognize every Hebrew letter. That's an incredible achievement!",
    icon: '🎓',
  },
  first_word: {
    title: 'First Word!',
    message: "You just read your first Hebrew word. You're reading the language of the Torah!",
    icon: '📖',
  },
  first_prayer: {
    title: 'First Prayer!',
    message: 'You can now say Modeh Ani — try it tomorrow morning when you wake up.',
    icon: '🙏',
  },
  shema_reader: {
    title: 'Shema Reader!',
    message: 'You just read the most important declaration in Judaism. שְׁמַע יִשְׂרָאֵל',
    icon: '💫',
  },
  bracha_master: {
    title: 'Bracha Master!',
    message: "You know the brachot! Next time you eat, try saying the bracha in Hebrew.",
    icon: '🍎',
  },
  shul_ready: {
    title: 'Shul Ready!',
    message: "You can follow along with 50% of a service. Walk into any shul with confidence!",
    icon: '🏛️',
  },
  independent_davener: {
    title: 'Independent Davener!',
    message: "You can daven on your own. This is an extraordinary accomplishment.",
    icon: '🏆',
  },
};

interface MilestoneToastProps {
  milestone: MilestoneType | null;
  onClose: () => void;
}

export function MilestoneToast({ milestone, onClose }: MilestoneToastProps) {
  useEffect(() => {
    if (milestone) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1B4965', '#5FA8D3', '#C6973F', '#4A7C59'],
      });

      // Auto-close after 6 seconds
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [milestone, onClose]);

  const data = milestone ? MILESTONE_DATA[milestone] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[#C6973F]/30 p-6 cursor-pointer"
            onClick={onClose}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{data.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#C6973F]">{data.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{data.message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
