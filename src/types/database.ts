export interface UserProfileRow {
  id: string;
  email: string;
  display_name: string | null;
  current_level: number;
  nusach: 'ashkenaz' | 'sefard' | 'edot';
  daily_goal_minutes: number;
  transliteration_mode: 'full' | 'faded' | 'tap' | 'off';
  audio_speed: number;
  streak_days: number;
  longest_streak: number;
  last_practice_date: string | null;
  total_study_minutes: number;
  total_words_mastered: number;
  learning_goal: 'daven' | 'learn' | 'explore' | 'all';
  hebrew_level: 'none' | 'some_letters' | 'read_slow' | 'read_improve';
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface SkillProgressRow {
  id: string;
  user_id: string;
  skill_id: string;
  mastery_level: number;
  times_practiced: number;
  times_correct: number;
  last_practiced: string | null;
}

export interface DailySessionRow {
  id: string;
  user_id: string;
  date: string;
  minutes_studied: number;
  items_reviewed: number;
  items_correct: number;
  new_skills_learned: number;
}

export interface MilestoneRow {
  id: string;
  user_id: string;
  type: string;
  earned_at: string;
}

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfileRow;
        Insert: Omit<UserProfileRow, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfileRow, 'created_at' | 'updated_at'>>;
      };
      skill_progress: {
        Row: SkillProgressRow;
        Insert: Omit<SkillProgressRow, 'id'>;
        Update: Partial<Omit<SkillProgressRow, 'id'>>;
      };
      daily_sessions: {
        Row: DailySessionRow;
        Insert: Omit<DailySessionRow, 'id'>;
        Update: Partial<Omit<DailySessionRow, 'id'>>;
      };
      milestones: {
        Row: MilestoneRow;
        Insert: Omit<MilestoneRow, 'id'>;
        Update: Partial<Omit<MilestoneRow, 'id'>>;
      };
    };
  };
};
