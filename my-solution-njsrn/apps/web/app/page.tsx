"use client";

import { ReactElement, useMemo } from "react";
import { calculateStats, type Lesson, type Word, type DailyActivity } from "@repo/learning-core";

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps): ReactElement {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
}

function ActionCard({ title, description, icon, onClick, color }: ActionCardProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100 text-left w-full hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default function HomePage(): ReactElement {
  // Mock data - in a real app, this would come from state management or API
  const mockLessons: Lesson[] = [
    { id: "1", title: "Basic Greetings", completed: true, score: 85 },
    { id: "2", title: "Present Tense", completed: true, score: 90 },
    { id: "3", title: "Past Tense", completed: true, score: 75 },
    { id: "4", title: "Future Tense", completed: false },
    { id: "5", title: "Conditionals", completed: true, score: 88 },
    { id: "6", title: "Passive Voice", completed: false },
  ];

  const mockWords: Word[] = Array.from({ length: 342 }, (_, i) => ({
    id: `word-${i + 1}`,
    word: `word${i + 1}`,
    definition: `Definition ${i + 1}`,
    learned: true,
    learnedAt: new Date(),
    timesPracticed: Math.floor(Math.random() * 10),
    lastPracticedAt: new Date(),
  }));

  // Generate daily activities for the last 7 days
  const mockActivities: DailyActivity[] = useMemo(() => {
    const activities: DailyActivity[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0] as string;
      activities.push({
        date: dateStr,
        lessonsCompleted: i === 0 ? 1 : Math.floor(Math.random() * 3),
        wordsLearned: Math.floor(Math.random() * 10) + 5,
        practiceTime: Math.floor(Math.random() * 30) + 15,
      });
    }
    return activities;
  }, []);

  // Calculate stats using shared logic
  const stats = useMemo(
    () => calculateStats(mockLessons, mockWords, mockActivities),
    [mockLessons, mockWords, mockActivities]
  );

  const handleActionClick = (action: string) => {
    if (action === "vocabulary") {
      window.location.href = "/vocabulary";
    } else {
      console.log(`Navigate to ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 pt-12 pb-8 px-6 rounded-b-3xl">
          <h1 className="text-white text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-white/90 text-base">Ready to continue your English journey?</p>
        </div>

        {/* Stats Section */}
        <div className="px-6 -mt-6 mb-6">
          <div className="flex gap-2">
            <StatCard label="Day Streak" value={`🔥 ${stats.streak}`} />
            <StatCard label="Words Learned" value={stats.wordsLearned} />
            <StatCard label="Lessons" value={stats.lessonsCompleted} />
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-5 shadow-md">
            <h2 className="text-white text-lg font-bold mb-2">Daily Challenge</h2>
            <p className="text-white/90 text-sm mb-4">
              Complete 5 vocabulary exercises today to maintain your streak!
            </p>
            <button className="bg-white rounded-lg py-3 px-6 hover:bg-gray-50 transition-colors">
              <span className="text-orange-600 font-semibold">Start Challenge</span>
            </button>
          </div>
        </div>

        {/* Learning Actions */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
          
          <ActionCard
            title="Vocabulary"
            description="Learn new words and expand your vocabulary"
            icon="📚"
            color="bg-blue-100"
            onClick={() => handleActionClick("vocabulary")}
          />
          
          <ActionCard
            title="Grammar"
            description="Master English grammar rules and patterns"
            icon="✍️"
            color="bg-green-100"
            onClick={() => handleActionClick("grammar")}
          />
          
          <ActionCard
            title="Practice"
            description="Test your skills with interactive exercises"
            icon="🎯"
            color="bg-purple-100"
            onClick={() => handleActionClick("practice")}
          />
          
          <ActionCard
            title="Progress"
            description="Track your learning journey and achievements"
            icon="📊"
            color="bg-yellow-100"
            onClick={() => handleActionClick("progress")}
          />
        </div>

        {/* Bottom Spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
}
