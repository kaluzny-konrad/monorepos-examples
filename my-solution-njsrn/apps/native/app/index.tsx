import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { calculateStats, type Lesson, type Word, type DailyActivity } from "@repo/learning-core";

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
      <Text className="text-gray-500 text-sm mb-1">{label}</Text>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
    </View>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  color: string;
}

function ActionCard({ title, description, icon, onPress, color }: ActionCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${color} items-center justify-center mr-4`}>
          <Text className="text-2xl">{icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">{title}</Text>
          <Text className="text-sm text-gray-500">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Index() {
  // Empty data - will be populated from API/state management in the future
  const lessons: Lesson[] = [];
  const words: Word[] = [];
  const activities: DailyActivity[] = [];

  // Calculate stats using shared logic
  const stats = calculateStats(lessons, words, activities);

  const handleActionPress = (action: string) => {
    if (action === "vocabulary") {
      router.push("/vocabulary");
    } else {
      console.log(`Navigate to ${action}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-blue-600 pt-4 pb-8 px-6">
        <Text className="text-white text-3xl font-bold mb-2">Welcome back! 👋</Text>
        <Text className="text-white/90 text-base">Ready to continue your English journey?</Text>
      </View>

        {/* Stats Section */}
        <View className="px-6 -mt-6 mb-6">
          <View className="flex-row">
            <StatCard label="Day Streak" value={`🔥 ${stats.streak}`} />
            <StatCard label="Words Learned" value={stats.wordsLearned} />
            <StatCard label="Lessons" value={stats.lessonsCompleted} />
          </View>
        </View>

      {/* Daily Challenge */}
      <View className="px-6 mb-6">
        <View className="bg-orange-500 rounded-xl p-5 shadow-md">
          <Text className="text-white text-lg font-bold mb-2">Daily Challenge</Text>
          <Text className="text-white/90 text-sm mb-4">
            Complete 5 vocabulary exercises today to maintain your streak!
          </Text>
          <TouchableOpacity
            className="bg-white rounded-lg py-3 px-6 self-start"
            activeOpacity={0.8}
          >
            <Text className="text-orange-600 font-semibold">Start Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Learning Actions */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">Continue Learning</Text>
        
        <ActionCard
          title="Vocabulary"
          description="Learn new words and expand your vocabulary"
          icon="📚"
          color="bg-blue-100"
          onPress={() => handleActionPress("vocabulary")}
        />
        
        <ActionCard
          title="Grammar"
          description="Master English grammar rules and patterns"
          icon="✍️"
          color="bg-green-100"
          onPress={() => handleActionPress("grammar")}
        />
        
        <ActionCard
          title="Practice"
          description="Test your skills with interactive exercises"
          icon="🎯"
          color="bg-purple-100"
          onPress={() => handleActionPress("practice")}
        />
        
        <ActionCard
          title="Progress"
          description="Track your learning journey and achievements"
          icon="📊"
          color="bg-yellow-100"
          onPress={() => handleActionPress("progress")}
        />
      </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
