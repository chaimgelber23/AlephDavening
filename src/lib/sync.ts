import { supabase } from '@/lib/supabase';
import type { UserProfile, SkillProgress } from '@/types';
import type { UserProfileRow } from '@/types/database';

export async function syncProfileToSupabase(userId: string, profile: UserProfile) {
  const { error } = await supabase.from('user_profiles').upsert(
    {
      id: userId,
      email: profile.email ?? '',
      display_name: profile.displayName ?? null,
      current_level: profile.currentLevel,
      nusach: profile.nusach,
      daily_goal_minutes: profile.dailyGoalMinutes,
      transliteration_mode: profile.transliterationMode,
      audio_speed: profile.audioSpeed,
      streak_days: profile.streakDays,
      longest_streak: profile.longestStreak,
      last_practice_date: profile.lastPracticeDate ?? null,
      total_study_minutes: profile.totalStudyMinutes,
      total_words_mastered: profile.totalWordsMastered,
      learning_goal: profile.learningGoal,
      hebrew_level: profile.hebrewLevel,
      onboarding_complete: profile.onboardingComplete,
    },
    { onConflict: 'id' }
  );

  if (error) console.error('Profile sync error:', error);
}

export async function syncSkillProgressToSupabase(
  userId: string,
  skillProgress: Record<string, SkillProgress>
) {
  const rows = Object.values(skillProgress).map((sp) => ({
    user_id: userId,
    skill_id: sp.skillId,
    mastery_level: sp.masteryLevel,
    times_practiced: sp.timesPracticed,
    times_correct: sp.timesCorrect,
    last_practiced: sp.lastPracticed ? new Date(sp.lastPracticed).toISOString() : null,
  }));

  if (rows.length === 0) return;

  const { error } = await supabase
    .from('skill_progress')
    .upsert(rows, { onConflict: 'user_id,skill_id' });

  if (error) console.error('Skill progress sync error:', error);
}

export async function loadProfileFromSupabase(userId: string): Promise<UserProfileRow | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data as unknown as UserProfileRow;
}

// Simple debounce utility
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
