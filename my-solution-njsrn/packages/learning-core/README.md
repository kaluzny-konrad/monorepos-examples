# @repo/learning-core

Shared learning logic and statistics calculations for the English learning app.

## Features

- **Learning Statistics**: Calculate comprehensive learning stats from lessons, words, and activities
- **Streak Calculation**: Track daily learning streaks with gap detection
- **Progress Tracking**: Calculate lesson completion percentages and average scores
- **Practice Recommendations**: Identify words that need more practice

## Installation

This package is part of the monorepo and is automatically linked via workspace protocol.

## Usage

```typescript
import {
  calculateStats,
  calculateStreak,
  calculateLessonProgress,
} from "@repo/learning-core";
import type { Lesson, Word, DailyActivity } from "@repo/learning-core";

const lessons: Lesson[] = [
  { id: "1", title: "Lesson 1", completed: true, score: 85 },
  { id: "2", title: "Lesson 2", completed: false },
];

const words: Word[] = [
  { id: "1", word: "hello", definition: "greeting", learned: true },
];

const activities: DailyActivity[] = [
  {
    date: "2024-01-01",
    lessonsCompleted: 1,
    wordsLearned: 5,
    practiceTime: 30,
  },
];

const stats = calculateStats(lessons, words, activities);
console.log(stats.streak); // Current learning streak
console.log(stats.wordsLearned); // Number of learned words
console.log(stats.lessonsCompleted); // Number of completed lessons
```

## API

### Functions

- `calculateStats(lessons, words, activities?)` - Calculate comprehensive learning statistics
- `calculateStreak(activities)` - Calculate current learning streak from daily activities
- `calculateLessonProgress(lessons)` - Calculate completion percentage (0-100)
- `calculateAverageScore(lessons)` - Calculate average score from completed lessons
- `getWordsNeedingPractice(words, daysSinceLastPractice?)` - Get words that need practice

### Types

- `LearningStats` - Statistics interface
- `Lesson` - Lesson data structure
- `Word` - Word/vocabulary data structure
- `DailyActivity` - Daily learning activity record

## Testing

Run tests with:

```bash
pnpm test
```

Watch mode:

```bash
pnpm test:watch
```

## Build

Build the package:

```bash
pnpm build
```
