import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProfile,
  SkillProgress,
  LessonProgress,
  PrayerProgress,
  DailySession,
  Milestone,
  MilestoneType,
  LearningGoal,
  HebrewLevel,
  Nusach,
  LearnSession,
  CoachingPreferences,
  SectionCoachingProgress,
  CoachingFeedback,
  CoachingPhase,
  DisplaySettings,
  ServicePosition,
} from '@/types';

interface UserState {
  // Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Skill progress
  skillProgress: Record<string, SkillProgress>;
  updateSkillProgress: (skillId: string, correct: boolean) => void;
  getSkillMastery: (skillId: string) => number;

  // Lesson progress
  lessonProgress: Record<string, LessonProgress>;
  completeLesson: (lessonId: string, score: number) => void;
  unlockLesson: (lessonId: string) => void;

  // Prayer progress
  prayerProgress: Record<string, PrayerProgress>;
  updatePrayerProgress: (prayerId: string, updates: Partial<PrayerProgress>) => void;

  // Daily sessions
  todaySession: DailySession;
  recordPractice: (correct: boolean, isNewSkill?: boolean) => void;

  // Streaks
  checkAndUpdateStreak: () => void;
  useStreakFreeze: () => boolean;

  // Learn session resume
  learnSession: LearnSession | null;
  saveLearnSession: (session: LearnSession) => void;
  clearLearnSession: () => void;

  // Vowel learn session resume
  vowelLearnSession: LearnSession | null;
  saveVowelLearnSession: (session: LearnSession) => void;
  clearVowelLearnSession: () => void;

  // Milestones
  milestones: Milestone[];
  earnMilestone: (type: MilestoneType) => void;
  hasMilestone: (type: MilestoneType) => boolean;

  // Onboarding
  completeOnboarding: (goal: LearningGoal, level: HebrewLevel, nusach: Nusach, dailyMinutes: number) => void;

  // Coaching
  coachingPreferences: CoachingPreferences;
  updateCoachingPreferences: (updates: Partial<CoachingPreferences>) => void;
  applyCoachingFeedback: (feedback: CoachingFeedback) => void;
  sectionProgress: Record<string, SectionCoachingProgress>;
  updateSectionProgress: (key: string, updates: Partial<SectionCoachingProgress>) => void;
  markSectionCoached: (prayerId: string, sectionId: string) => void;
  isSectionCoached: (prayerId: string, sectionId: string) => boolean;
  isPrayerFullyCoached: (prayerId: string, sectionIds: string[]) => boolean;
  getSectionStep: (prayerId: string, sectionId: string) => CoachingPhase | null;
  hasUsedCoaching: boolean;

  // Display settings (toggle layers)
  displaySettings: DisplaySettings;
  updateDisplaySettings: (updates: Partial<DisplaySettings>) => void;

  // Service position ("You are here")
  servicePosition: Record<string, ServicePosition>;
  updateServicePosition: (serviceId: string, position: Partial<ServicePosition>) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  currentLevel: 1,
  nusach: 'ashkenaz',
  pronunciation: 'modern',
  dailyGoalMinutes: 5,
  transliterationMode: 'full',
  audioSpeed: 1.0,
  streakDays: 0,
  longestStreak: 0,
  totalStudyMinutes: 0,
  totalWordsMastered: 0,
  learningGoal: 'daven',
  hebrewLevel: 'none',
  onboardingComplete: false,
  voiceGender: 'male',
  streakFreezes: 1,
};

const getTodayString = () => new Date().toISOString().split('T')[0];

/** Get ISO week string like "2026-W08" for weekly freeze grants */
function getISOWeek(d: Date): string {
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const dayOfYear = Math.ceil((d.getTime() - jan4.getTime()) / 86400000) + jan4.getDay();
  const week = Math.ceil(dayOfYear / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** Count days between two ISO date strings */
function daysBetween(from: string, to: string): number {
  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/** Check if the missed day between lastPractice and today was a Shabbat (Saturday) */
function wasMissedDayShabbat(lastPractice: string, today: string): boolean {
  const last = new Date(lastPractice + 'T00:00:00');
  const end = new Date(today + 'T00:00:00');
  const d = new Date(last);
  d.setDate(d.getDate() + 1);
  while (d < end) {
    if (d.getDay() === 6) return true; // Saturday
    d.setDate(d.getDate() + 1);
  }
  return false;
}

const DEFAULT_SESSION: DailySession = {
  date: getTodayString(),
  minutesStudied: 0,
  itemsReviewed: 0,
  itemsCorrect: 0,
  newSkillsLearned: 0,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      // Skill progress
      skillProgress: {},

      updateSkillProgress: (skillId, correct) =>
        set((state) => {
          const existing = state.skillProgress[skillId] || {
            skillId,
            masteryLevel: 0,
            timesPracticed: 0,
            timesCorrect: 0,
          };

          const newCorrect = existing.timesCorrect + (correct ? 1 : 0);
          const newPracticed = existing.timesPracticed + 1;
          const mastery = Math.min(1, newCorrect / Math.max(newPracticed, 1));

          return {
            skillProgress: {
              ...state.skillProgress,
              [skillId]: {
                ...existing,
                timesPracticed: newPracticed,
                timesCorrect: newCorrect,
                masteryLevel: mastery,
                lastPracticed: new Date(),
              },
            },
          };
        }),

      getSkillMastery: (skillId) => {
        const progress = get().skillProgress[skillId];
        return progress?.masteryLevel || 0;
      },

      // Lesson progress
      lessonProgress: {},

      completeLesson: (lessonId, score) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              status: 'completed',
              score,
              completedAt: new Date(),
            },
          },
        })),

      unlockLesson: (lessonId) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              status: 'available',
            },
          },
        })),

      // Prayer progress
      prayerProgress: {},

      updatePrayerProgress: (prayerId, updates) =>
        set((state) => ({
          prayerProgress: {
            ...state.prayerProgress,
            [prayerId]: {
              ...state.prayerProgress[prayerId],
              prayerId,
              ...updates,
              lastPracticed: new Date(),
            } as PrayerProgress,
          },
        })),

      // Daily sessions
      todaySession: DEFAULT_SESSION,

      recordPractice: (correct, isNewSkill = false) =>
        set((state) => {
          const today = getTodayString();
          const session =
            state.todaySession.date === today
              ? state.todaySession
              : { ...DEFAULT_SESSION, date: today };

          return {
            todaySession: {
              ...session,
              itemsReviewed: session.itemsReviewed + 1,
              itemsCorrect: session.itemsCorrect + (correct ? 1 : 0),
              newSkillsLearned: session.newSkillsLearned + (isNewSkill ? 1 : 0),
            },
          };
        }),

      // Streaks (with Shabbat grace period + freeze support)
      checkAndUpdateStreak: () =>
        set((state) => {
          const today = getTodayString();
          const lastPractice = state.profile.lastPracticeDate;

          if (lastPractice === today) return state; // Already practiced today

          const now = new Date();
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newStreak = state.profile.streakDays;
          let freezes = state.profile.streakFreezes ?? 1;

          // Grant a free freeze each week (Sunday)
          const weekStr = getISOWeek(now);
          if (weekStr !== state.profile.lastStreakFreezeWeek && freezes < 2) {
            freezes = Math.min(freezes + 1, 2);
          }

          if (lastPractice === yesterdayStr) {
            // Practiced yesterday — continue streak
            newStreak += 1;
          } else if (!lastPractice) {
            // First time ever
            newStreak = 1;
          } else {
            // Missed day(s) — check for Shabbat grace or use freeze
            const missedDays = daysBetween(lastPractice, today);

            if (missedDays <= 2 && wasMissedDayShabbat(lastPractice, today)) {
              // Shabbat grace — streak continues
              newStreak += 1;
            } else if (missedDays === 2 && freezes > 0) {
              // Auto-use a freeze for 1 missed day
              freezes -= 1;
              newStreak += 1;
            } else {
              // Streak broken
              newStreak = 1;
            }
          }

          return {
            profile: {
              ...state.profile,
              streakDays: newStreak,
              longestStreak: Math.max(newStreak, state.profile.longestStreak),
              lastPracticeDate: today,
              streakFreezes: freezes,
              lastStreakFreezeWeek: getISOWeek(now),
            },
          };
        }),

      useStreakFreeze: () => {
        const state = get();
        if ((state.profile.streakFreezes ?? 0) <= 0) return false;
        set({
          profile: {
            ...state.profile,
            streakFreezes: (state.profile.streakFreezes ?? 0) - 1,
          },
        });
        return true;
      },

      // Learn session resume
      learnSession: null,

      saveLearnSession: (session) => set({ learnSession: session }),

      clearLearnSession: () => set({ learnSession: null }),

      // Vowel learn session resume
      vowelLearnSession: null,

      saveVowelLearnSession: (session) => set({ vowelLearnSession: session }),

      clearVowelLearnSession: () => set({ vowelLearnSession: null }),

      // Milestones
      milestones: [],

      earnMilestone: (type) =>
        set((state) => {
          if (state.milestones.some((m) => m.type === type)) return state;
          return {
            milestones: [...state.milestones, { type, earnedAt: new Date() }],
          };
        }),

      hasMilestone: (type) => {
        return get().milestones.some((m) => m.type === type);
      },

      // Onboarding
      completeOnboarding: (goal, level, nusach, dailyMinutes) =>
        set((state) => ({
          profile: {
            ...state.profile,
            learningGoal: goal,
            hebrewLevel: level,
            nusach,
            dailyGoalMinutes: dailyMinutes,
            onboardingComplete: true,
          },
        })),

      // Coaching
      coachingPreferences: {
        listenCount: 3,
        followAlongCount: 2,
        sayTogetherCount: 2,
        initialSpeed: 0.75,
        showTranslationDuringPractice: true,
        skipContextCard: false,
      },

      updateCoachingPreferences: (updates) =>
        set((state) => ({
          coachingPreferences: { ...state.coachingPreferences, ...updates },
        })),

      applyCoachingFeedback: (feedback) =>
        set((state) => {
          const prefs = { ...state.coachingPreferences };

          if (feedback.paceRating === 'too_slow') {
            prefs.initialSpeed = Math.min(prefs.initialSpeed + 0.1, 1.0);
          } else if (feedback.paceRating === 'too_fast') {
            prefs.initialSpeed = Math.max(prefs.initialSpeed - 0.1, 0.5);
          }

          if (feedback.listenCountRating === 'fewer') {
            prefs.listenCount = Math.max(prefs.listenCount - 1, 1);
          } else if (feedback.listenCountRating === 'more') {
            prefs.listenCount = Math.min(prefs.listenCount + 1, 5);
          }

          if (
            !feedback.helpfulAspects.includes('translation') &&
            !feedback.helpfulAspects.includes('all')
          ) {
            prefs.showTranslationDuringPractice = false;
          }

          return { coachingPreferences: prefs };
        }),

      sectionProgress: {},

      updateSectionProgress: (key, updates) =>
        set((state) => {
          const defaults: SectionCoachingProgress = {
            coachingComplete: false,
            currentStep: 'listen' as CoachingPhase,
            listenCount: 0,
            lastPracticed: '',
          };
          const existing = state.sectionProgress[key] || defaults;
          return {
            sectionProgress: {
              ...state.sectionProgress,
              [key]: { ...existing, ...updates },
            },
          };
        }),

      markSectionCoached: (prayerId, sectionId) =>
        set((state) => {
          const key = `${prayerId}:${sectionId}`;
          return {
            hasUsedCoaching: true,
            sectionProgress: {
              ...state.sectionProgress,
              [key]: {
                ...(state.sectionProgress[key] || { listenCount: 0, currentStep: 'listen' as CoachingPhase }),
                coachingComplete: true,
                lastPracticed: new Date().toISOString().split('T')[0],
              },
            },
          };
        }),

      isSectionCoached: (prayerId, sectionId) => {
        const key = `${prayerId}:${sectionId}`;
        return get().sectionProgress[key]?.coachingComplete === true;
      },

      isPrayerFullyCoached: (prayerId, sectionIds) => {
        const state = get();
        return sectionIds.every(
          (sid) => state.sectionProgress[`${prayerId}:${sid}`]?.coachingComplete === true
        );
      },

      getSectionStep: (prayerId, sectionId) => {
        const key = `${prayerId}:${sectionId}`;
        return get().sectionProgress[key]?.currentStep || null;
      },

      hasUsedCoaching: false,

      // Display settings (toggle layers)
      displaySettings: {
        showTransliteration: true,
        showTranslation: true,
        showInstructions: true,
        showAmudCues: true,
      },

      updateDisplaySettings: (updates) =>
        set((state) => ({
          displaySettings: { ...state.displaySettings, ...updates },
        })),

      // Service position ("You are here")
      servicePosition: {},

      updateServicePosition: (serviceId, position) =>
        set((state) => {
          const existing = state.servicePosition[serviceId] || {
            serviceId,
            segmentIndex: 0,
            itemIndex: 0,
            lastUpdated: '',
          };
          return {
            servicePosition: {
              ...state.servicePosition,
              [serviceId]: {
                ...existing,
                ...position,
                lastUpdated: new Date().toISOString(),
              },
            },
          };
        }),
    }),
    {
      name: 'alephdavening-user',
    }
  )
);
