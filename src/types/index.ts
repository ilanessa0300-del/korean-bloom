// User statistics
export interface UserStats {
  lessonsCompleted: number;
  streakDays: number;
  points: number;
  totalStudyMinutes: number;
  recentActivity: ActivityEntry[];
  lastActiveDate: string; // ISO date string
  wordsLearned: number;
}

export interface ActivityEntry {
  id: string;
  type: 'lesson' | 'test' | 'words' | 'writing';
  title: string;
  timestamp: string; // ISO string
  points: number;
}

// Lesson types
export type LessonCategory = 'hangul' | 'grammar' | 'words' | 'writing';

export interface Lesson {
  id: string;
  category: LessonCategory;
  title: string;
  titleKz: string;
  level: number;
  module: number;
  order: number;
  videoUrl: string;
  isLocked: boolean;
  testScorePercent: 0 | 50 | 100 | null;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionKz: string;
  options: string[];
  optionsKz: string[];
  correctIndex: number;
}

// Word cards
export interface WordCard {
  id: string;
  front: string; // Russian
  frontKz: string; // Kazakh
  back: string; // Korean
  transcription: string;
}

export interface WordCardSet {
  id: string;
  category: 'greetings' | 'numbersKorean' | 'numbersChinese' | 'family' | 'food' | 'flowers' | 'colors' | 'verbs';
  title: string;
  titleKz: string;
  cards: WordCard[];
}

// Calendar
export interface CalendarEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  lessonsCount: number;
  minutes: number;
  points: number;
  note?: string;
}

// Achievements
export interface Achievement {
  id: string;
  title: string;
  titleKz: string;
  description: string;
  descriptionKz: string;
  isUnlocked: boolean;
  progressValue: number;
  goalValue: number;
}

// Korean alphabet letters for writing practice
export interface KoreanLetter {
  id: string;
  character: string;
  romanization: string;
  type: 'consonant' | 'vowel';
  name: string;
  nameKz: string;
}
