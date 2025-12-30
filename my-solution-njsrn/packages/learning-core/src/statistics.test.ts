import { describe, it, expect } from "vitest";
import {
  calculateStats,
  calculateStreak,
  calculateLessonProgress,
  calculateAverageScore,
  getWordsNeedingPractice,
} from "./statistics";
import type { Lesson, Word, DailyActivity } from "./types";

describe("calculateStats", () => {
  it("should calculate stats from empty arrays", () => {
    const stats = calculateStats([], []);
    expect(stats).toEqual({
      streak: 0,
      wordsLearned: 0,
      lessonsCompleted: 0,
      totalPracticeTime: 0,
    });
  });

  it("should calculate stats from lessons and words", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true },
      { id: "2", title: "Lesson 2", completed: false },
      { id: "3", title: "Lesson 3", completed: true },
    ];

    const words: Word[] = [
      { id: "1", word: "hello", definition: "greeting", learned: true },
      { id: "2", word: "world", definition: "planet", learned: true },
      { id: "3", word: "test", definition: "exam", learned: false },
    ];

    const stats = calculateStats(lessons, words);
    expect(stats.lessonsCompleted).toBe(2);
    expect(stats.wordsLearned).toBe(2);
  });

  it("should include practice time from activities", () => {
    const activities: DailyActivity[] = [
      { date: "2024-01-01", lessonsCompleted: 1, wordsLearned: 5, practiceTime: 30 },
      { date: "2024-01-02", lessonsCompleted: 2, wordsLearned: 3, practiceTime: 45 },
    ];

    const stats = calculateStats([], [], activities);
    expect(stats.totalPracticeTime).toBe(75);
  });
});

describe("calculateStreak", () => {
  it("should return 0 for empty activities", () => {
    expect(calculateStreak([])).toBe(0);
  });

  it("should calculate streak for consecutive days", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const activities: DailyActivity[] = [
      { date: formatDate(today), lessonsCompleted: 1, wordsLearned: 0, practiceTime: 10 },
      { date: formatDate(yesterday), lessonsCompleted: 1, wordsLearned: 0, practiceTime: 15 },
      { date: formatDate(twoDaysAgo), lessonsCompleted: 1, wordsLearned: 0, practiceTime: 20 },
    ];

    expect(calculateStreak(activities)).toBeGreaterThanOrEqual(1);
  });

  it("should handle streak with only today's activity", () => {
    const today = new Date();
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const activities: DailyActivity[] = [
      { date: formatDate(today), lessonsCompleted: 1, wordsLearned: 5, practiceTime: 30 },
    ];

    expect(calculateStreak(activities)).toBe(1);
  });

  it("should break streak when there's a gap", () => {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const activities: DailyActivity[] = [
      { date: formatDate(today), lessonsCompleted: 1, wordsLearned: 0, practiceTime: 10 },
      { date: formatDate(threeDaysAgo), lessonsCompleted: 1, wordsLearned: 0, practiceTime: 15 },
    ];

    // Should only count today's activity, not the one 3 days ago
    expect(calculateStreak(activities)).toBe(1);
  });
});

describe("calculateLessonProgress", () => {
  it("should return 0 for empty lessons", () => {
    expect(calculateLessonProgress([])).toBe(0);
  });

  it("should calculate 100% for all completed", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true },
      { id: "2", title: "Lesson 2", completed: true },
    ];
    expect(calculateLessonProgress(lessons)).toBe(100);
  });

  it("should calculate 50% for half completed", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true },
      { id: "2", title: "Lesson 2", completed: false },
    ];
    expect(calculateLessonProgress(lessons)).toBe(50);
  });

  it("should calculate 33% for 1 out of 3 completed", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true },
      { id: "2", title: "Lesson 2", completed: false },
      { id: "3", title: "Lesson 3", completed: false },
    ];
    expect(calculateLessonProgress(lessons)).toBe(33);
  });
});

describe("calculateAverageScore", () => {
  it("should return 0 for no completed lessons", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: false },
    ];
    expect(calculateAverageScore(lessons)).toBe(0);
  });

  it("should return 0 for empty lessons", () => {
    expect(calculateAverageScore([])).toBe(0);
  });

  it("should calculate average score correctly", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true, score: 80 },
      { id: "2", title: "Lesson 2", completed: true, score: 90 },
      { id: "3", title: "Lesson 3", completed: true, score: 70 },
      { id: "4", title: "Lesson 4", completed: false },
    ];
    expect(calculateAverageScore(lessons)).toBe(80);
  });

  it("should ignore lessons without scores", () => {
    const lessons: Lesson[] = [
      { id: "1", title: "Lesson 1", completed: true, score: 80 },
      { id: "2", title: "Lesson 2", completed: true },
      { id: "3", title: "Lesson 3", completed: true, score: 100 },
    ];
    expect(calculateAverageScore(lessons)).toBe(90);
  });
});

describe("getWordsNeedingPractice", () => {
  it("should return empty array for no words", () => {
    expect(getWordsNeedingPractice([])).toEqual([]);
  });

  it("should return words that are learned but never practiced", () => {
    const words: Word[] = [
      {
        id: "1",
        word: "hello",
        definition: "greeting",
        learned: true,
        timesPracticed: 0,
      },
      {
        id: "2",
        word: "world",
        definition: "planet",
        learned: false,
        timesPracticed: 0,
      },
    ];

    const result = getWordsNeedingPractice(words);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should return words not practiced recently", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10); // 10 days ago

    const words: Word[] = [
      {
        id: "1",
        word: "hello",
        definition: "greeting",
        learned: true,
        timesPracticed: 5,
        lastPracticedAt: oldDate,
      },
      {
        id: "2",
        word: "world",
        definition: "planet",
        learned: true,
        timesPracticed: 3,
        lastPracticedAt: new Date(), // today
      },
    ];

    const result = getWordsNeedingPractice(words, 7);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should not return words practiced recently", () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 2); // 2 days ago

    const words: Word[] = [
      {
        id: "1",
        word: "hello",
        definition: "greeting",
        learned: true,
        timesPracticed: 5,
        lastPracticedAt: recentDate,
      },
    ];

    const result = getWordsNeedingPractice(words, 7);
    expect(result).toHaveLength(0);
  });

  it("should not return unlearned words", () => {
    const words: Word[] = [
      {
        id: "1",
        word: "hello",
        definition: "greeting",
        learned: false,
        timesPracticed: 0,
      },
    ];

    const result = getWordsNeedingPractice(words);
    expect(result).toHaveLength(0);
  });
});


