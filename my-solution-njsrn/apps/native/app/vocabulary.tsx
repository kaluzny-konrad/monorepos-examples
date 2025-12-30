import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { trpc } from "@repo/trpc/client";

export default function VocabularyScreen() {
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  const utils = trpc.useUtils();

  const { data: words, isLoading, error } = trpc.vocabulary.getAll.useQuery();
  const { data: wordsNeedingPractice } =
    trpc.vocabulary.getNeedingPractice.useQuery({});

  const createWordMutation = trpc.vocabulary.create.useMutation({
    onSuccess: () => {
      utils.vocabulary.getAll.invalidate();
      setNewWord("");
      setNewDefinition("");
    },
  });

  const markLearnedMutation = trpc.vocabulary.markLearned.useMutation({
    onSuccess: () => {
      utils.vocabulary.getAll.invalidate();
      utils.vocabulary.getNeedingPractice.invalidate();
    },
  });

  const recordPracticeMutation = trpc.vocabulary.recordPractice.useMutation({
    onSuccess: () => {
      utils.vocabulary.getAll.invalidate();
      utils.vocabulary.getNeedingPractice.invalidate();
    },
  });

  const deleteWordMutation = trpc.vocabulary.delete.useMutation({
    onSuccess: () => {
      utils.vocabulary.getAll.invalidate();
    },
  });

  const handleAddWord = () => {
    if (newWord.trim() && newDefinition.trim()) {
      createWordMutation.mutate({ word: newWord, definition: newDefinition });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Loading vocabulary...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <Text className="text-red-600 text-center">Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-blue-600">← Back</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            📚 Vocabulary
          </Text>
          <Text className="text-gray-600">
            Manage your English vocabulary words
          </Text>
        </View>

        {/* Add New Word Form */}
        <View className="bg-white mx-6 rounded-xl p-5 shadow-sm mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Add New Word
          </Text>
          <TextInput
            placeholder="Word"
            value={newWord}
            onChangeText={setNewWord}
            className="px-4 py-3 border border-gray-300 rounded-lg mb-3"
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            placeholder="Definition"
            value={newDefinition}
            onChangeText={setNewDefinition}
            className="px-4 py-3 border border-gray-300 rounded-lg mb-4"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={handleAddWord}
            disabled={createWordMutation.isPending}
            className="bg-blue-600 py-3 rounded-lg items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">
              {createWordMutation.isPending ? "Adding..." : "Add Word"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Words Needing Practice */}
        {wordsNeedingPractice && wordsNeedingPractice.length > 0 && (
          <View className="bg-orange-50 border border-orange-200 mx-6 rounded-xl p-5 mb-6">
            <Text className="text-xl font-semibold text-orange-800 mb-4">
              🔄 Words Needing Practice ({wordsNeedingPractice.length})
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {wordsNeedingPractice.slice(0, 10).map((word) => (
                <TouchableOpacity
                  key={word.id}
                  onPress={() => recordPracticeMutation.mutate({ id: word.id })}
                  className="px-3 py-1 bg-orange-200 rounded-full"
                  activeOpacity={0.7}
                >
                  <Text className="text-orange-800">{word.word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Word List */}
        <View className="bg-white mx-6 rounded-xl shadow-sm overflow-hidden mb-6">
          <View className="px-5 py-4 border-b border-gray-100">
            <Text className="text-xl font-semibold text-gray-900">
              All Words ({words?.length || 0})
            </Text>
          </View>

          {words && words.length > 0 ? (
            words.map((word, index: number) => (
              <View
                key={word.id}
                className={`px-5 py-4 ${index < words.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <View className="flex-row items-center mb-1">
                  <Text className="font-semibold text-gray-900 mr-2">
                    {word.word}
                  </Text>
                  {word.learned && (
                    <View className="px-2 py-0.5 bg-green-100 rounded-full">
                      <Text className="text-green-700 text-xs">Learned</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-600 text-sm mb-1">
                  {word.definition}
                </Text>
                <Text className="text-gray-400 text-xs mb-3">
                  Practiced {word.timesPracticed} times
                </Text>
                <View className="flex-row gap-2">
                  {!word.learned && (
                    <TouchableOpacity
                      onPress={() =>
                        markLearnedMutation.mutate({ id: word.id })
                      }
                      className="px-3 py-1 bg-green-100 rounded-lg"
                      activeOpacity={0.7}
                    >
                      <Text className="text-green-700 text-sm">
                        Mark Learned
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      recordPracticeMutation.mutate({ id: word.id })
                    }
                    className="px-3 py-1 bg-blue-100 rounded-lg"
                    activeOpacity={0.7}
                  >
                    <Text className="text-blue-700 text-sm">Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteWordMutation.mutate({ id: word.id })}
                    className="px-3 py-1 bg-red-100 rounded-lg"
                    activeOpacity={0.7}
                  >
                    <Text className="text-red-700 text-sm">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="px-5 py-12 items-center">
              <Text className="text-gray-500">
                No words yet. Add your first word above!
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
