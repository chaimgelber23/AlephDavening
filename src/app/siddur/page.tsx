'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BottomNav } from '@/components/ui/BottomNav';
import { getTefillahPrayers, getBrachotPrayers, getAllPrayers } from '@/lib/content/prayers';
import { getAllServices } from '@/lib/content/services';
import { useAudio } from '@/hooks/useAudio';
import { useKaraokeSync } from '@/hooks/useKaraokeSync';
import { useUserStore } from '@/stores/userStore';
import { CoachingOverlay } from '@/components/siddur/CoachingOverlay';
import { DisplayToggleBar } from '@/components/siddur/DisplayToggleBar';
import { ServiceCard } from '@/components/siddur/ServiceCard';
import { ServiceRoadmap } from '@/components/siddur/ServiceRoadmap';
import { AmudMode } from '@/components/siddur/AmudMode';
import { KaraokePlayer } from '@/components/siddur/KaraokePlayer';
import { AmudBadge } from '@/components/siddur/AmudBadge';
import type { Prayer, DaveningService, ServiceItem } from '@/types';

type Tab = 'services' | 'prayers' | 'brachot';
type View = 'list' | 'prayer_reader' | 'service_roadmap' | 'amud_mode';

export default function SiddurPage() {
  // Navigation state
  const [view, setView] = useState<View>('list');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [selectedService, setSelectedService] = useState<DaveningService | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showCoaching, setShowCoaching] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);

  // Store
  const pronunciation = useUserStore((s) => s.profile.pronunciation);
  const audioSpeed = useUserStore((s) => s.profile.audioSpeed);
  const voiceGender = useUserStore((s) => s.profile.voiceGender);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const hasUsedCoaching = useUserStore((s) => s.hasUsedCoaching);
  const isPrayerFullyCoached = useUserStore((s) => s.isPrayerFullyCoached);
  const displaySettings = useUserStore((s) => s.displaySettings);
  const updateServicePosition = useUserStore((s) => s.updateServicePosition);

  // Audio
  const audioOptions = useMemo(
    () => ({ speed: audioSpeed, pronunciation, voiceGender }),
    [audioSpeed, pronunciation, voiceGender]
  );
  const { play, stop, isPlaying, isLoading } = useAudio(audioOptions);

  // Current section data
  const currentSection = selectedPrayer?.sections[currentSectionIndex];
  const words = currentSection?.hebrewText.split(' ') || [];

  // Karaoke sync
  const { currentWordIndex, progress } = useKaraokeSync({
    words,
    wordTimings: currentSection?.wordTimings,
    isPlaying,
  });

  // Prayer map for AmudMode
  const prayerMap = useMemo(() => {
    const all = getAllPrayers();
    return new Map(all.map((p) => [p.id, p]));
  }, []);

  // Handlers
  const handleSelectPrayer = useCallback((prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setCurrentSectionIndex(0);
    setView('prayer_reader');
  }, []);

  const handleSelectService = useCallback((service: DaveningService) => {
    setSelectedService(service);
    setView('service_roadmap');
  }, []);

  const handleServiceItemSelect = useCallback(
    (item: ServiceItem, segIdx: number, itemIdx: number) => {
      if (selectedService) {
        updateServicePosition(selectedService.id, {
          serviceId: selectedService.id,
          segmentIndex: segIdx,
          itemIndex: itemIdx,
        });
      }
      if (item.prayerId) {
        const prayer = prayerMap.get(item.prayerId);
        if (prayer) {
          handleSelectPrayer(prayer);
        }
      }
    },
    [selectedService, updateServicePosition, prayerMap, handleSelectPrayer]
  );

  const handleEnterAmudMode = useCallback(() => {
    setView('amud_mode');
  }, []);

  const handleBack = useCallback(() => {
    stop();
    if (view === 'prayer_reader') {
      if (selectedService) {
        setView('service_roadmap');
      } else {
        setView('list');
      }
      setSelectedPrayer(null);
      setCurrentSectionIndex(0);
    } else if (view === 'service_roadmap') {
      setView('list');
      setSelectedService(null);
    } else if (view === 'amud_mode') {
      setView('service_roadmap');
    } else {
      setView('list');
    }
  }, [view, selectedService, stop]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else if (currentSection && selectedPrayer) {
      const text =
        pronunciation === 'american'
          ? currentSection.transliteration
          : currentSection.hebrewText;
      const audioMode = pronunciation === 'american' ? 'transliteration' : 'hebrew';
      play(text, audioMode, audioSpeed, selectedPrayer.id, currentSection.id);
    }
  }, [isPlaying, stop, play, currentSection, selectedPrayer, pronunciation, audioSpeed]);

  // === VIEWS ===

  // List view (main siddur page)
  if (view === 'list') {
    return <SiddurList onSelectPrayer={handleSelectPrayer} onSelectService={handleSelectService} />;
  }

  // Service Roadmap
  if (view === 'service_roadmap' && selectedService) {
    return (
      <ServiceRoadmap
        service={selectedService}
        onSelectItem={handleServiceItemSelect}
        onEnterAmudMode={handleEnterAmudMode}
        onBack={handleBack}
      />
    );
  }

  // Amud Mode
  if (view === 'amud_mode' && selectedService) {
    return (
      <AmudMode
        service={selectedService}
        prayers={prayerMap}
        onBack={handleBack}
      />
    );
  }

  // Prayer Reader
  if (view === 'prayer_reader' && selectedPrayer) {
    const sectionIds = selectedPrayer.sections.map((s) => s.id);
    const isCoached = isPrayerFullyCoached(selectedPrayer.id, sectionIds);
    const showFirstTimeBanner = !hasUsedCoaching && !isCoached && !dismissedBanner;
    const totalSections = selectedPrayer.sections.length;
    const showCompactProgress = totalSections > 12;

    return (
      <div className="min-h-screen bg-[#FEFDFB]">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3 z-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <button onClick={handleBack} className="text-gray-400 hover:text-gray-600">
                ← Back
              </button>
              <span className="text-sm font-medium text-gray-600">
                {selectedPrayer.nameEnglish}
              </span>
              <span className="text-sm text-gray-400">
                {currentSectionIndex + 1}/{totalSections}
              </span>
            </div>
            {/* Display Toggle Bar */}
            <DisplayToggleBar />
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-6 space-y-5 pb-32">
          {/* First-time coaching banner */}
          {showFirstTimeBanner && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#C6973F]/10 border border-[#C6973F]/20 rounded-2xl p-4 flex items-center gap-3"
            >
              <span className="text-xl">&#x1F393;</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D3142]">First time?</p>
                <p className="text-xs text-gray-500">
                  Tap &quot;Coach&quot; below to learn this step by step
                </p>
              </div>
              <button
                onClick={() => setDismissedBanner(true)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Prayer Context Card */}
          {currentSectionIndex === 0 && displaySettings.showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1B4965]/5 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">&#x1F4A1;</span>
                <div>
                  <p className="text-sm font-medium text-[#1B4965]">
                    When: {selectedPrayer.whenSaid}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedPrayer.inspirationText}
                  </p>
                  {selectedPrayer.whySaid && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      {selectedPrayer.whySaid}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Amud Badge for current section */}
          {displaySettings.showAmudCues && currentSection?.amud && (
            <div className="flex items-center justify-center gap-2">
              <AmudBadge role={currentSection.amud.role} />
              {currentSection.amud.physicalActions?.map((action) => (
                <span
                  key={action}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#D4A373]/15 text-[#8B6914] text-[10px] font-medium"
                >
                  {action.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Karaoke Player (replaces old text + audio) */}
          {currentSection && (
            <KaraokePlayer
              section={currentSection}
              prayerId={selectedPrayer.id}
              currentWordIndex={currentWordIndex}
              progress={progress}
              onTogglePlay={handleTogglePlay}
              isPlaying={isPlaying}
              isLoading={isLoading}
            />
          )}

          {/* Section Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentSectionIndex > 0) {
                  stop();
                  setCurrentSectionIndex(currentSectionIndex - 1);
                }
              }}
              disabled={currentSectionIndex === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentSectionIndex === 0
                  ? 'text-gray-300'
                  : 'text-[#1B4965] hover:bg-[#1B4965]/5'
              }`}
            >
              ← Previous
            </button>

            {/* Progress indicator */}
            {showCompactProgress ? (
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B4965] rounded-full transition-all duration-300"
                    style={{ width: `${((currentSectionIndex + 1) / totalSections) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {currentSectionIndex + 1}/{totalSections}
                </span>
              </div>
            ) : (
              <div className="flex gap-1">
                {selectedPrayer.sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { stop(); setCurrentSectionIndex(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentSectionIndex ? 'bg-[#1B4965]' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => {
                if (currentSectionIndex < totalSections - 1) {
                  stop();
                  setCurrentSectionIndex(currentSectionIndex + 1);
                }
              }}
              disabled={currentSectionIndex === totalSections - 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentSectionIndex === totalSections - 1
                  ? 'text-gray-300'
                  : 'text-[#1B4965] hover:bg-[#1B4965]/5'
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Coach me floating button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => { stop(); setShowCoaching(true); }}
          className="fixed bottom-24 right-6 bg-[#C6973F] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#b8892f] active:scale-95 transition-all flex items-center gap-2 z-20"
        >
          <span className="text-base">&#x1F393;</span>
          <span className="text-sm font-medium">Coach</span>
        </motion.button>

        {/* Coaching overlay */}
        <AnimatePresence>
          {showCoaching && (
            <CoachingOverlay
              prayer={selectedPrayer}
              initialSectionIndex={currentSectionIndex}
              onClose={() => setShowCoaching(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Fallback
  return <SiddurList onSelectPrayer={handleSelectPrayer} onSelectService={handleSelectService} />;
}

// ==========================
// Prayer Card
// ==========================

function PrayerCard({ prayer, onSelect }: { prayer: Prayer; onSelect: (p: Prayer) => void }) {
  const isPrayerCoached = useUserStore((s) =>
    s.isPrayerFullyCoached(prayer.id, prayer.sections.map((sec) => sec.id))
  );

  return (
    <button
      onClick={() => onSelect(prayer)}
      className="w-full rounded-2xl border bg-white border-gray-100 hover:shadow-md hover:border-[#5FA8D3]/30 cursor-pointer p-4 text-left transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            isPrayerCoached
              ? 'bg-[#4A7C59]/10 text-[#4A7C59]'
              : 'bg-[#1B4965]/10 text-[#1B4965]'
          }`}>
            {isPrayerCoached ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              prayer.sortOrder
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[#2D3142] text-sm">{prayer.nameEnglish}</h3>
            <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-base text-gray-500">
              {prayer.nameHebrew}
            </p>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {prayer.sections.length > 4 && (
        <div className="mt-2 flex items-center gap-2 ml-11">
          <span className="text-xs bg-[#1B4965]/5 text-[#1B4965] px-2 py-0.5 rounded-full font-medium">
            {prayer.sections.length} sections
          </span>
          {prayer.estimatedReadSeconds >= 60 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              ~{Math.ceil(prayer.estimatedReadSeconds / 60)} min
            </span>
          )}
        </div>
      )}
    </button>
  );
}

// ==========================
// Main Siddur List (3-tab)
// ==========================

function SiddurList({
  onSelectPrayer,
  onSelectService,
}: {
  onSelectPrayer: (prayer: Prayer) => void;
  onSelectService: (service: DaveningService) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [searchQuery, setSearchQuery] = useState('');

  const services = getAllServices();
  const tefillahPrayers = getTefillahPrayers();
  const brachotPrayers = getBrachotPrayers();

  // Filter prayers by search
  const filteredPrayers = useMemo(() => {
    if (!searchQuery.trim()) return tefillahPrayers;
    const q = searchQuery.toLowerCase();
    return tefillahPrayers.filter(
      (p) =>
        p.nameEnglish.toLowerCase().includes(q) ||
        p.nameHebrew.includes(q) ||
        p.whenSaid.toLowerCase().includes(q)
    );
  }, [tefillahPrayers, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      {/* Header */}
      <div className="bg-[#1B4965] text-white px-6 py-8 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <Link href="/" className="text-[#5FA8D3] text-sm hover:text-white">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold mt-2">Your Siddur</h1>
          <p className="text-[#5FA8D3] text-sm mt-1">
            Learn to daven, lead from the amud, and follow along in shul
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-4 pb-28">
        {/* 3-Tab Bar */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {[
            { id: 'services' as Tab, label: 'Services' },
            { id: 'prayers' as Tab, label: 'All Prayers' },
            { id: 'brachot' as Tab, label: 'Brachos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#1B4965] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* === SERVICES TAB === */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Weekday Services */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                Weekday
              </h2>
              <div className="space-y-3">
                {services
                  .filter((s) => s.type === 'weekday')
                  .map((service, i) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onSelect={onSelectService}
                      index={i}
                    />
                  ))}
              </div>
            </div>

            {/* Shabbat Services */}
            {services.some((s) => s.type === 'shabbat') && (
              <div>
                <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                  Shabbat
                </h2>
                <div className="space-y-3">
                  {services
                    .filter((s) => s.type === 'shabbat')
                    .map((service, i) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onSelect={onSelectService}
                        index={i}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* === ALL PRAYERS TAB === */}
        {activeTab === 'prayers' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search prayers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 outline-none bg-white"
              />
            </div>

            {/* All prayers flat list (no level gating!) */}
            <div className="space-y-2">
              {filteredPrayers.map((prayer, i) => (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <PrayerCard prayer={prayer} onSelect={onSelectPrayer} />
                </motion.div>
              ))}
              {filteredPrayers.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">
                  No prayers match &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </div>
        )}

        {/* === BRACHOS TAB === */}
        {activeTab === 'brachot' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-4 px-1">
              Blessings over food and drink — know which bracha to say and when
            </p>
            {brachotPrayers.map((prayer, i) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <PrayerCard prayer={prayer} onSelect={onSelectPrayer} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
