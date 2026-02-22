'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/ui/BottomNav';
import { getAllServices } from '@/lib/content/services';
import { getAllPrayers } from '@/lib/content/prayers';
import { AmudMode } from '@/components/siddur/AmudMode';
import type { DaveningService } from '@/types';

export default function AmudPage() {
  const [selectedService, setSelectedService] = useState<DaveningService | null>(null);

  const services = getAllServices();

  const prayerMap = useMemo(() => {
    const all = getAllPrayers();
    return new Map(all.map((p) => [p.id, p]));
  }, []);

  const handleBack = useCallback(() => {
    setSelectedService(null);
  }, []);

  // === AMUD MODE ===
  if (selectedService) {
    return (
      <AmudMode
        service={selectedService}
        prayers={prayerMap}
        onBack={handleBack}
      />
    );
  }

  // === SERVICE LIST ===
  const weekdayServices = services.filter((s) => s.type === 'weekday');
  const shabbatServices = services.filter((s) => s.type === 'shabbat');

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      <div className="bg-gradient-to-b from-[#1B4965] to-[#1A3F57] text-white px-6 pt-8 pb-5 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold">Lead the Amud</h1>
          <p className="text-white/50 text-sm mt-1">
            Practice leading davening as shaliach tzibbur
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-28 space-y-6">
        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#C6973F]/10 border border-[#C6973F]/20 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C6973F]/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6973F" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#2D3142]">What is Amud Mode?</p>
              <p className="text-xs text-gray-500 mt-1">
                See exactly what the shaliach tzibbur says, when the congregation responds,
                and physical actions like bowing and standing. Perfect for preparing to lead davening.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Weekday Services */}
        <div>
          <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
            Weekday
          </h2>
          <div className="space-y-3">
            {weekdayServices.map((service, i) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-4 text-left hover:shadow-md hover:border-[#1B4965]/20 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2D3142]">{service.name}</h3>
                    <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-sm text-gray-400 mt-0.5">
                      {service.nameHebrew}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {service.segments.length} sections &middot; ~{service.estimatedMinutes} min
                    </p>
                  </div>
                  <div className="bg-[#1B4965] text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Shabbat Services */}
        {shabbatServices.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
              Shabbat
            </h2>
            <div className="space-y-3">
              {shabbatServices.map((service, i) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (weekdayServices.length + i) * 0.05 }}
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-white rounded-2xl border border-gray-100 p-4 text-left hover:shadow-md hover:border-[#8B5CF6]/20 transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2D3142]">{service.name}</h3>
                      <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-sm text-gray-400 mt-0.5">
                        {service.nameHebrew}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {service.segments.length} sections &middot; ~{service.estimatedMinutes} min
                      </p>
                    </div>
                    <div className="bg-[#8B5CF6] text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}