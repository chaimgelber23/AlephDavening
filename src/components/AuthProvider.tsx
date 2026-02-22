'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import {
  syncProfileToSupabase,
  syncSkillProgressToSupabase,
  loadProfileFromSupabase,
  debounce,
} from '@/lib/sync';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  const user = useAuthStore((s) => s.user);
  const syncSetup = useRef(false);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  // Sync data when authenticated
  useEffect(() => {
    if (!user) {
      syncSetup.current = false;
      return;
    }
    if (syncSetup.current) return;
    syncSetup.current = true;

    const userId = user.id;

    // On auth, merge remote profile into local store
    loadProfileFromSupabase(userId).then((remoteProfile) => {
      const localProfile = useUserStore.getState().profile;

      if (remoteProfile && remoteProfile.onboarding_complete) {
        // Remote has data — use it to fill in any missing fields
        useUserStore.getState().updateProfile({
          id: userId,
          email: user.email,
          displayName: remoteProfile.display_name ?? localProfile.displayName,
          currentLevel: remoteProfile.current_level,
          nusach: remoteProfile.nusach,
          dailyGoalMinutes: remoteProfile.daily_goal_minutes,
          transliterationMode: remoteProfile.transliteration_mode,
          audioSpeed: remoteProfile.audio_speed,
          streakDays: Math.max(remoteProfile.streak_days, localProfile.streakDays),
          longestStreak: Math.max(remoteProfile.longest_streak, localProfile.longestStreak),
          lastPracticeDate: remoteProfile.last_practice_date ?? localProfile.lastPracticeDate,
          totalStudyMinutes: Math.max(remoteProfile.total_study_minutes, localProfile.totalStudyMinutes),
          totalWordsMastered: Math.max(remoteProfile.total_words_mastered, localProfile.totalWordsMastered),
          learningGoal: remoteProfile.learning_goal,
          hebrewLevel: remoteProfile.hebrew_level,
          onboardingComplete: remoteProfile.onboarding_complete,
        });
      } else {
        // No remote data — push local to remote
        useUserStore.getState().updateProfile({ id: userId, email: user.email });
        syncProfileToSupabase(userId, { ...localProfile, id: userId, email: user.email });
      }
    });

    // Subscribe to future changes and sync them (debounced)
    const debouncedSync = debounce(() => {
      const state = useUserStore.getState();
      syncProfileToSupabase(userId, state.profile);
      syncSkillProgressToSupabase(userId, state.skillProgress);
    }, 500);

    const unsub = useUserStore.subscribe(debouncedSync);

    return () => {
      unsub();
      syncSetup.current = false;
    };
  }, [user]);

  return <>{children}</>;
}
