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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[#184F6E] text-white px-6 pt-16 pb-24 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        {/* Subtle background glow effect for depth */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-md mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/90 drop-shadow-sm">
              AlephDavening
            </h1>
            <p className="text-[var(--primary-light)] text-lg mt-3 font-medium tracking-wide">
              Master the art of davening
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/85 mt-6 text-sm leading-relaxed max-w-[280px] mx-auto font-light"
          >
            Learn to daven with confidence, keep up in shul, and lead from the amud.
          </motion.p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-12 space-y-6 relative z-20">
        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          {[
            { title: 'Follow Along in Shul', desc: 'See every tefilah laid out clearly — Shacharit, Mincha, Maariv, and Shabbat. Always know where you are.', color: 'var(--primary)' },
            { title: 'Lead from the Amud', desc: 'Know what to say aloud, when to wait, and what the tzibbur responds. Be ready to daven for the amud.', color: 'var(--success)' },
            { title: 'Learn Every Word', desc: 'Listen to each tefilah with audio playback and word-by-word highlighting. Learn the pronunciation and flow.', color: 'var(--gold)' },
            { title: 'Learn at Your Pace', desc: 'Show or hide transliteration, translation, and instructions as you gain confidence.', color: 'var(--primary-light)' },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-[1.25rem] border border-gray-100/80 p-5 flex items-start gap-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all cursor-pointer group"
            >
              <div className="w-1.5 self-stretch rounded-full shrink-0 transition-all group-hover:w-2" style={{ backgroundColor: feature.color }} />
              <div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm group-hover:text-[var(--primary)] transition-colors">{feature.title}</h3>
                <p className="text-xs text-gray-500/90 mt-1.5 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
          className="space-y-4 pt-4 pb-10"
        >
          <Link href="/siddur" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-light)] rounded-2xl">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[#154665] text-white text-center font-bold text-lg shadow-[0_8px_25px_-5px_rgba(18,60,86,0.5)] border border-white/10"
            >
              Get Started
            </motion.div>
          </Link>
          <p className="text-center text-xs text-gray-400 font-medium tracking-wide uppercase">
            Free to use. No sign-in required.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
