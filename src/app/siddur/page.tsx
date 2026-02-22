'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BottomNav } from '@/components/ui/BottomNav';
import { getTefillahPrayers, getAllPrayers } from '@/lib/content/prayers';
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
import { AudioSourcePicker } from '@/components/siddur/AudioSourcePicker';
import { getAudioForPrayer, type AudioSourceId, type PrayerAudioEntry } from '@/lib/content/audio-sources';
import type { Prayer, DaveningService, ServiceItem } from '@/types';

type Tab = 'services' | 'prayers';
type View = 'list' | 'prayer_reader' | 'service_roadmap' | 'amud_mode';

export default function SiddurPage() {
  // Navigation state
  const [view, setView] = useState<View>('list');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [selectedService, setSelectedService] = useState<DaveningService | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showCoaching, setShowCoaching] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioSourceId>('siddur-audio');

  // Store
  const pronunciation = useUserStore((s) => s.profile.pronunciation);
  const audioSpeed = useUserStore((s) => s.profile.audioSpeed);
  const voiceGender = useUserStore((s) => s.profile.voiceGender);
  const hasUsedCoaching = useUserStore((s) => s.hasUsedCoaching);
  const isPrayerFullyCoached = useUserStore((s) => s.isPrayerFullyCoached);
  const displaySettings = useUserStore((s) => s.displaySettings);
  const updateServicePosition = useUserStore((s) => s.updateServicePosition);

  // Audio
  const audioOptions = useMemo(
    () => ({ speed: audioSpeed, pronunciation, voiceGender }),
    [audioSpeed, pronunciation, voiceGender]
  );
  const { play, playSource, stop, isPlaying, isLoading } = useAudio(audioOptions);

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
      // Check if we have a source recording for this prayer
      if (audioSource !== 'tts') {
        const entries = getAudioForPrayer(selectedPrayer.id);
        const entry = entries.find((e) => e.sourceId === audioSource);
        if (entry) {
          playSource(entry.path, audioSpeed);
          return;
        }
      }
      // Fallback to per-section TTS
      const text =
        pronunciation === 'american'
          ? currentSection.transliteration
          : currentSection.hebrewText;
      const audioMode = pronunciation === 'american' ? 'transliteration' : 'hebrew';
      play(text, audioMode, audioSpeed, selectedPrayer.id, currentSection.id);
    }
  }, [isPlaying, stop, play, playSource, currentSection, selectedPrayer, pronunciation, audioSpeed, audioSource]);

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
            {/* Audio Source & Display Toggles */}
            <div className="flex items-center justify-between mt-2 gap-2">
              <AudioSourcePicker
                prayerId={selectedPrayer.id}
                selectedSource={audioSource}
                onSelectSource={(sourceId) => {
                  stop();
                  setAudioSource(sourceId);
                }}
              />
              <DisplayToggleBar />
            </div>
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
              <div className="w-8 h-8 rounded-lg bg-[#C6973F]/20 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C6973F]" />
              </div>
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
                <div className="w-8 h-8 rounded-lg bg-[#1B4965]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B4965]" />
                </div>
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
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSectionIndex === 0
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
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentSectionIndex ? 'bg-[#1B4965]' : 'bg-gray-200 hover:bg-gray-300'
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
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSectionIndex === totalSections - 1
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
// Prayer Filter Groups
// ==========================

type PrayerFilter = 'all' | 'morning' | 'pesukei_dzimra' | 'shema' | 'amidah' | 'closing' | 'hallel';

const PRAYER_FILTERS: { id: PrayerFilter; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: '#1B4965' },
  { id: 'morning', label: 'Morning', color: '#C6973F' },
  { id: 'pesukei_dzimra', label: 'Pesukei D\'Zimra', color: '#5FA8D3' },
  { id: 'shema', label: 'Shema', color: '#7C3AED' },
  { id: 'amidah', label: 'Amidah', color: '#1B4965' },
  { id: 'closing', label: 'Closing', color: '#4A7C59' },
  { id: 'hallel', label: 'Hallel', color: '#C6973F' },
];

const PRAYER_GROUP_MAP: Record<string, PrayerFilter> = {
  'modeh-ani': 'morning',
  'netilat-yadayim': 'morning',
  'asher-yatzar': 'morning',
  'elokai-neshama': 'morning',
  'birchos-hatorah': 'morning',
  'birchos-hashachar': 'morning',
  'hodu': 'pesukei_dzimra',
  'baruch-sheamar': 'pesukei_dzimra',
  'mizmor-ltodah': 'pesukei_dzimra',
  'az-yashir': 'pesukei_dzimra',
  'ashrei': 'pesukei_dzimra',
  'yishtabach': 'pesukei_dzimra',
  'yotzer-or': 'shema',
  'ahavah-rabbah': 'shema',
  'shema': 'shema',
  'emet-vyatziv': 'shema',
  'shemoneh-esrei': 'amidah',
  'tachanun': 'closing',
  'uva-ltzion': 'closing',
  'ein-kelokeinu': 'closing',
  'aleinu': 'closing',
  'hallel': 'hallel',
};

// ==========================
// Compact Prayer Box Card
// ==========================

function PrayerBoxCard({ prayer, onSelect }: { prayer: Prayer; onSelect: (p: Prayer) => void }) {
  const isPrayerCoached = useUserStore((s) =>
    s.isPrayerFullyCoached(prayer.id, prayer.sections.map((sec) => sec.id))
  );
  const group = PRAYER_GROUP_MAP[prayer.id] || 'closing';
  const filterColor = PRAYER_FILTERS.find((f) => f.id === group)?.color || 'var(--primary)';

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(prayer)}
      className="w-full rounded-[1rem] border bg-white border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] cursor-pointer p-4 text-left transition-all relative overflow-hidden group"
    >
      {/* Top color accent - smoother transition */}
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: filterColor }} />

      {/* Coached indicator */}
      {isPrayerCoached && (
        <div className="absolute top-2.5 right-2.5 bg-green-50 rounded-full p-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      <h3 className="font-semibold text-[var(--foreground)] text-[14px] leading-tight pr-5 group-hover:text-[var(--primary)] transition-colors">{prayer.nameEnglish}</h3>
      <p dir="rtl" className="font-[var(--font-hebrew-serif)] text-[15px] text-gray-400 mt-1.5 font-medium">
        {prayer.nameHebrew}
      </p>
      {prayer.sections.length > 4 && (
        <span className="text-[10px] text-gray-400/80 mt-2 block font-medium uppercase tracking-wider">
          {prayer.sections.length} sections
        </span>
      )}
    </motion.button>
  );
}

// ==========================
// Main Siddur List (2-tab)
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
  const [activeFilter, setActiveFilter] = useState<PrayerFilter>('all');

  const services = getAllServices();
  const tefillahPrayers = getTefillahPrayers();

  // Filter prayers by search + group filter
  const filteredPrayers = useMemo(() => {
    let result = tefillahPrayers;

    // Apply group filter
    if (activeFilter !== 'all') {
      result = result.filter((p) => PRAYER_GROUP_MAP[p.id] === activeFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nameEnglish.toLowerCase().includes(q) ||
          p.nameHebrew.includes(q) ||
          p.whenSaid.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tefillahPrayers, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[#154665] text-white px-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-md mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-[var(--primary-light)] text-sm font-medium hover:text-white transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Home
          </Link>
          <h1 className="text-3xl font-bold mt-4 tracking-tight drop-shadow-sm">Learn to Daven</h1>
          <p className="text-[var(--primary-light)] text-sm mt-1.5 font-medium">
            Follow along with services and individual prayers
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-32">
        {/* 2-Tab Bar - Enhanced with animated active state */}
        <div className="flex gap-1 bg-white/60 backdrop-blur-md rounded-[1.25rem] p-1.5 mb-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/50 sticky top-4 z-20">
          {[
            { id: 'services' as Tab, label: 'Services' },
            { id: 'prayers' as Tab, label: 'All Prayers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors z-10 outline-none"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabSiddur"
                  className="absolute inset-0 bg-white shadow-sm rounded-xl border border-gray-100/50"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-20 ${activeTab === tab.id ? 'text-[var(--primary)]' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* === SERVICES TAB === */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* Weekday Services */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs uppercase tracking-widest text-[#B5842B] font-bold">
                  Weekday
                </h2>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <div className="space-y-3.5">
                {services
                  .filter((s) => s.type === 'weekday')
                  .map((service, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={service.id}
                    >
                      <ServiceCard
                        service={service}
                        onSelect={onSelectService}
                        index={i}
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Shabbat Services */}
            {services.some((s) => s.type === 'shabbat') && (
              <div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <h2 className="text-xs uppercase tracking-widest text-[#B5842B] font-bold">
                    Shabbat
                  </h2>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="space-y-3.5">
                  {services
                    .filter((s) => s.type === 'shabbat')
                    .map((service, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={service.id}
                      >
                        <ServiceCard
                          service={service}
                          onSelect={onSelectService}
                          index={i}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* === ALL PRAYERS TAB === */}
        {activeTab === 'prayers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* Search */}
            <div className="relative group">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors"
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
                className="w-full pl-10 pr-4 py-3.5 rounded-[1.25rem] border border-gray-200/80 text-sm shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] focus:border-[var(--primary-light)] focus:ring-4 focus:ring-[var(--primary-glow)] outline-none bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-0.5 -mx-6 sm:mx-0 sm:px-0">
              <div className="w-4 shrink-0 sm:hidden"></div>
              {PRAYER_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 border ${activeFilter === filter.id
                      ? 'text-white border-transparent shadow-md'
                      : 'bg-white text-gray-500 border-gray-200/80 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  style={activeFilter === filter.id ? { backgroundColor: filter.color, boxShadow: `0 4px 12px -3px ${filter.color}50` } : undefined}
                >
                  {filter.label}
                </button>
              ))}
              <div className="w-4 shrink-0 sm:hidden"></div>
            </div>

            {/* 2-column compact grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {filteredPrayers.map((prayer, i) => (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <PrayerBoxCard prayer={prayer} onSelect={onSelectPrayer} />
                </motion.div>
              ))}
            </div>
            {filteredPrayers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 px-4"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600">No prayers found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
