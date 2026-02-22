'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  const router = useRouter();

  // If logged in, go straight to siddur
  useEffect(() => {
    if (status === 'authenticated' && user) {
      router.replace('/siddur');
    }
  }, [status, user, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#FEFDFB] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1B4965] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      {/* Hero */}
      <div className="bg-[#1B4965] text-white px-6 pt-16 pb-20 rounded-b-[3rem]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">AlephDavening</h1>
            <p className="text-[#5FA8D3] text-lg mt-3">Master the art of davening</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mt-6 text-sm leading-relaxed max-w-xs mx-auto"
          >
            Learn to daven with confidence, keep up in shul, and lead from the amud.
          </motion.p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8 space-y-6">
        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {[
            { icon: '\u{1F4D6}', title: 'Full Davening Map', desc: 'Follow along with every service — Shacharit, Mincha, Maariv, and Shabbat' },
            { icon: '\u{1F3A4}', title: 'Amud Mode', desc: 'Learn to lead davening — know what to say aloud, when to wait, and what the congregation responds' },
            { icon: '\u{1F3B5}', title: 'Karaoke Audio', desc: 'Word-by-word highlighting synced to audio — learn the melody and pronunciation' },
            { icon: '\u{2699}\u{FE0F}', title: 'Adaptive Layers', desc: 'Toggle transliteration, translation, and instructions on or off as you improve' },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4"
            >
              <span className="text-2xl mt-0.5">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-[#2D3142] text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3 pt-2 pb-8"
        >
          <Link
            href="/login"
            className="block w-full py-4 rounded-2xl bg-[#1B4965] text-white text-center font-bold text-lg hover:bg-[#163d55] transition-colors shadow-lg shadow-[#1B4965]/20"
          >
            Get Started
          </Link>
          <p className="text-center text-xs text-gray-400">
            Free to use. Sign in to save your progress.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
