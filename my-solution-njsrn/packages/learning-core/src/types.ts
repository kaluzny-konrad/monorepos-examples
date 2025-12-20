export interface LearningStats {
  streak: number;
  wordsLearned: number;
  lessonsCompleted: number;
  totalPracticeTime: number; // in minutes
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
}

export interface Word {
  id: string;
  word: string;
  definition: string;
  learned: boolean;
  learnedAt?: Date;
  timesPracticed: number;
  lastPracticedAt?: Date;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD format
  lessonsCompleted: number;
  wordsLearned: number;
  practiceTime: number;
}

