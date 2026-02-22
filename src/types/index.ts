// ==========================================
// CORE TYPES FOR ALEPHDAVENING
// ==========================================

// --- Skill Types ---
export type SkillType = 'letter' | 'vowel' | 'rule' | 'word' | 'prayer';

export interface Skill {
  id: string;
  type: SkillType;
  level: number;
  sortOrder: number;
  hebrew: string;
  hebrewWithNikud?: string;
  nameEnglish: string;
  sound?: string;
  mnemonic?: string;
  confusableWith?: string; // ID of confusable letter
  audioUrl?: string;
  imageUrl?: string;
  description?: string;
  teachingNotes?: string;
}

// --- Letter & Vowel Data ---
export interface Letter {
  id: string;
  hebrew: string;
  name: string;
  sound: string;
  transliteration: string;
  mnemonic: string;
  confusableWith?: string;
  confusableHint?: string;
  audioUrl: string;
  isFinalForm: boolean;
  baseLetterOf?: string; // for sofit letters
  hasDagesh?: boolean;
  dageshSound?: string;
}

export interface Vowel {
  id: string;
  hebrew: string;
  name: string;
  sound: string;
  soundGroup: 'ah' | 'eh' | 'ee' | 'oh' | 'oo' | 'shva' | 'chataf';
  color: string;
  transliteration: string;
  audioUrl: string;
  description: string;
}

// --- Lesson Types ---
export interface Lesson {
  id: string;
  level: number;
  sortOrder: number;
  title: string;
  description: string;
  skillIds: string[];
  estimatedMinutes: number;
  prerequisiteLessonId?: string;
}

// --- Practice Types ---
export type PracticeType =
  | 'tap_to_hear'
  | 'choose_sound'
  | 'choose_letter'
  | 'spot_difference'
  | 'build_syllable'
  | 'read_word'
  | 'read_line';

export interface PracticeItem {
  id: string;
  skillId: string;
  lessonId: string;
  type: PracticeType;
  promptHebrew: string;
  promptHebrewNikud?: string;
  promptAudioUrl?: string;
  correctAnswer: string;
  distractors: string[];
  difficulty: number;
  tags: string[];
}

export type AttemptResult = 'correct' | 'incorrect' | 'skipped';

export interface Attempt {
  id: string;
  practiceItemId: string;
  result: AttemptResult;
  responseTimeMs: number;
  userAnswer?: string;
  createdAt: Date;
}

// --- Prayer / Siddur Types ---
export interface Prayer {
  id: string;
  slug: string;
  nameHebrew: string;
  nameEnglish: string;
  category: string;
  sortOrder: number;
  whenSaid: string;
  whySaid: string;
  inspirationText: string;
  requiredLevel: number;
  estimatedReadSeconds: number;
  sections: PrayerSection[];
}

export interface PrayerSection {
  id: string;
  sortOrder: number;
  hebrewText: string; // with nekudot
  transliteration: string;
  translation: string;
  audioUrl?: string;
  slowAudioUrl?: string;
  wordTimings?: WordTiming[];
  notes?: string;
  amud?: AmudAnnotation;
}

export interface WordTiming {
  word: string;
  startMs: number;
  endMs: number;
}

// --- Amud / Service Types ---

/** Who says this part of davening */
export type AmudRole = 'shaliach_tzibbur' | 'congregation' | 'both' | 'silent_individual';

/** Physical actions during davening */
export type PhysicalAction =
  | 'stand'
  | 'sit'
  | 'bow'
  | 'bow_and_stand'
  | 'three_steps_forward'
  | 'three_steps_back'
  | 'cover_eyes'
  | 'face_west'
  | 'rise_on_toes';

/** Kaddish variant */
export type KaddishType = 'half' | 'full' | 'mourners' | 'derabanan';

/** Amud metadata — who says it, how, and what the congregation does */
export interface AmudAnnotation {
  role: AmudRole;
  instruction?: string;
  congregationResponse?: string;
  congregationResponseTransliteration?: string;
  physicalActions?: PhysicalAction[];
  waitForCongregation?: boolean;
  notes?: string;
}

/** A single item in a davening service */
export interface ServiceItem {
  id: string;
  prayerId?: string;
  type: 'prayer' | 'kaddish' | 'instruction' | 'responsive' | 'torah_reading';
  label: string;
  labelHebrew?: string;
  amud: AmudAnnotation;
  estimatedSeconds?: number;
  audioUrl?: string;
}

/** A logical group within a service (e.g. Pesukei D'Zimra) */
export interface ServiceSegment {
  id: string;
  title: string;
  titleHebrew?: string;
  description?: string;
  color: string;
  items: ServiceItem[];
}

/** A complete davening service */
export interface DaveningService {
  id: string;
  name: string;
  nameHebrew: string;
  type: 'weekday' | 'shabbat' | 'yom_tov';
  timeOfDay: 'shacharit' | 'mincha' | 'maariv' | 'musaf' | 'kabbalat_shabbat';
  description: string;
  estimatedMinutes: number;
  segments: ServiceSegment[];
}

/** User's display preferences — the toggle system */
export interface DisplaySettings {
  showTransliteration: boolean;
  showTranslation: boolean;
  showInstructions: boolean;
  showAmudCues: boolean;
}

/** User's position in a service (for "You are here") */
export interface ServicePosition {
  serviceId: string;
  segmentIndex: number;
  itemIndex: number;
  lastUpdated: string;
}

// --- User & Progress Types ---
export type Nusach = 'ashkenaz' | 'sefard' | 'edot';
export type Pronunciation = 'modern' | 'american';
export type TransliterationMode = 'full' | 'faded' | 'tap' | 'off';
export type LearningGoal = 'daven' | 'learn' | 'explore' | 'all';
export type HebrewLevel = 'none' | 'some_letters' | 'read_slow' | 'read_improve';
export type VoiceGender = 'male' | 'female';

export interface UserProfile {
  id?: string;
  displayName?: string;
  email?: string;
  currentLevel: number;
  nusach: Nusach;
  pronunciation: Pronunciation;
  dailyGoalMinutes: number;
  transliterationMode: TransliterationMode;
  audioSpeed: number;
  streakDays: number;
  longestStreak: number;
  lastPracticeDate?: string;
  totalStudyMinutes: number;
  totalWordsMastered: number;
  learningGoal: LearningGoal;
  hebrewLevel: HebrewLevel;
  onboardingComplete: boolean;
  voiceGender: VoiceGender;
  // Streak freeze
  streakFreezes: number; // available freezes (max 2)
  lastStreakFreezeWeek?: string; // ISO week string for weekly freeze grant
}

export interface DailyQuest {
  id: string;
  label: string;
  target: number;
  current: number;
  completed: boolean;
}

export interface LearnSession {
  currentLesson: number;
  phase: 'teach' | 'drill' | 'complete';
  teachIndex: number;
  drillIndex: number;
  drillScore: number;
  savedAt: string;
}

export interface SkillProgress {
  skillId: string;
  masteryLevel: number; // 0.0 to 1.0
  timesPracticed: number;
  timesCorrect: number;
  lastPracticed?: Date;
}

export interface LessonProgress {
  lessonId: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  score?: number;
  completedAt?: Date;
}

export interface PrayerProgress {
  prayerId: string;
  status: 'locked' | 'available' | 'learning' | 'mastered';
  listenComplete: boolean;
  echoComplete: boolean;
  readComplete: boolean;
  bestWpm?: number;
  lastPracticed?: Date;
}

export interface DailySession {
  date: string;
  minutesStudied: number;
  itemsReviewed: number;
  itemsCorrect: number;
  newSkillsLearned: number;
}

export type MilestoneType =
  | 'first_letter'
  | 'half_alephbet'
  | 'full_alephbet'
  | 'first_word'
  | 'first_prayer'
  | 'shema_reader'
  | 'bracha_master'
  | 'shul_ready'
  | 'independent_davener';

export interface Milestone {
  type: MilestoneType;
  earnedAt: Date;
}

// --- Practice Session State ---
export interface PracticeSession {
  items: PracticeItem[];
  currentIndex: number;
  attempts: Attempt[];
  startedAt: Date;
  isComplete: boolean;
}

// --- Coaching Types ---
export type CoachingPhase =
  | 'context'
  | 'listen'
  | 'follow_along'
  | 'say_together'
  | 'try_yourself'
  | 'section_complete'
  | 'feedback';

export interface CoachingPreferences {
  listenCount: number;         // default 3, range 1-5
  followAlongCount: number;    // default 2, range 1-3
  sayTogetherCount: number;    // default 2, range 1-3
  initialSpeed: number;        // default 0.75
  showTranslationDuringPractice: boolean;
  skipContextCard: boolean;
}

export interface SectionCoachingProgress {
  coachingComplete: boolean;
  currentStep: CoachingPhase;
  listenCount: number;
  lastPracticed: string;
}

export interface CoachingFeedback {
  paceRating: 'too_slow' | 'just_right' | 'too_fast';
  listenCountRating: 'fewer' | 'perfect' | 'more';
  helpfulAspects: ('hearing' | 'transliteration' | 'translation' | 'all')[];
}

// --- FSRS Card State ---
export interface CardReview {
  practiceItemId: string;
  difficulty: number;
  stability: number;
  dueDate: Date;
  lastReview?: Date;
  reps: number;
  lapses: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
}

// ==========================================
// DAILY LIVING GUIDE TYPES
// ==========================================

export type GuideCategory =
  | 'morning_routine'
  | 'brachot_food'
  | 'personal_care'
  | 'shabbat'
  | 'daily_items'
  | 'home';

export interface GuideStep {
  id: string;
  sortOrder: number;
  instruction: string;
  hebrewText?: string;
  transliteration?: string;
  translation?: string;
  audioUrl?: string;
  tip?: string;
}

export interface GuideQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  titleHebrew?: string;
  category: GuideCategory;
  sortOrder: number;
  icon: string;
  summary: string;
  whenRelevant: string;
  whyItMatters: string;
  quickAnswer: string;
  steps: GuideStep[];
  practicalTips: string[];
  commonMistakes?: string[];
  sources: string[];
  quiz: GuideQuizQuestion[];
  relatedGuideIds?: string[];
  relatedPrayerIds?: string[];
}

export interface GuideCategoryInfo {
  id: GuideCategory;
  title: string;
  titleHebrew: string;
  icon: string;
  color: string;
  description: string;
}

export interface GuideProgress {
  guideId: string;
  read: boolean;
  readAt?: string;
  bookmarked: boolean;
  quizScore?: number;
  quizTotal?: number;
  quizCompletedAt?: string;
}

