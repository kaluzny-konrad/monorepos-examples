import type { LearningStats, Lesson, Word, DailyActivity } from "./types";

/**
 * Calculate learning statistics from lessons and words
 */
export function calculateStats(
  lessons: Lesson[],
  words: Word[],
  activities: DailyActivity[] = []
): LearningStats {
  const completedLessons = lessons.filter((lesson) => lesson.completed);
  const learnedWords = words.filter((word) => word.learned);
  const totalPracticeTime = activities.reduce(
    (sum, activity) => sum + activity.practiceTime,
    0
  );

  return {
    streak: calculateStreak(activities),
    wordsLearned: learnedWords.length,
    lessonsCompleted: completedLessons.length,
    totalPracticeTime,
  };
}

/**
 * Calculate the current learning streak from daily activities
 * A streak is broken if there's a gap of more than 1 day
 */
export function calculateStreak(activities: DailyActivity[]): number {
  if (activities.length === 0) {
    return 0;
  }

  // Sort activities by date (most recent first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Check if today or yesterday has activity
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);

  const hasTodayActivity = sortedActivities.some(
    (activity) => activity.date === todayStr && hasActivity(activity)
  );
  const hasYesterdayActivity = sortedActivities.some(
    (activity) => activity.date === yesterdayStr && hasActivity(activity)
  );

  // If no activity today or yesterday, streak is 0
  if (!hasTodayActivity && !hasYesterdayActivity) {
    return 0;
  }

  // Start counting from the most recent activity
  let streak = 0;
  let currentDate = hasTodayActivity ? today : yesterday;
  let activityIndex = 0;

  while (activityIndex < sortedActivities.length) {
    const currentDateStr = formatDate(currentDate);
    const activity = sortedActivities.find(
      (a) => a.date === currentDateStr
    );

    if (activity && hasActivity(activity)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
      activityIndex++;
    } else {
      // Gap found, streak is broken
      break;
    }
  }

  return streak;
}

/**
 * Check if an activity has any meaningful learning (lessons, words, or practice time)
 */
function hasActivity(activity: DailyActivity): boolean {
  return (
    activity.lessonsCompleted > 0 ||
    activity.wordsLearned > 0 ||
    activity.practiceTime > 0
  );
}

/**
 * Format date to YYYY-MM-DD string
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate completion percentage for lessons
 */
export function calculateLessonProgress(lessons: Lesson[]): number {
  if (lessons.length === 0) {
    return 0;
  }
  const completed = lessons.filter((lesson) => lesson.completed).length;
  return Math.round((completed / lessons.length) * 100);
}

/**
 * Calculate average score from completed lessons
 */
export function calculateAverageScore(lessons: Lesson[]): number {
  const completedLessons = lessons.filter(
    (lesson) => lesson.completed && lesson.score !== undefined
  );

  if (completedLessons.length === 0) {
    return 0;
  }

  const totalScore = completedLessons.reduce(
    (sum, lesson) => sum + (lesson.score || 0),
    0
  );
  return Math.round(totalScore / completedLessons.length);
}

/**
 * Get words that need more practice (learned but not practiced recently)
 */
export function getWordsNeedingPractice(
  words: Word[],
  daysSinceLastPractice: number = 7
): Word[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysSinceLastPractice);

  return words.filter((word) => {
    if (!word.learned) {
      return false;
    }

    if (!word.lastPracticedAt) {
      return true; // Never practiced
    }

    return new Date(word.lastPracticedAt) < cutoffDate;
  });
}

