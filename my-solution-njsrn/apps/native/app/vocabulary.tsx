import { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { trpc } from "@repo/trpc/client";
import {
  Text,
  Button,
  TextInput,
  Card,
  Divider,
} from "react-native-paper";

export default function VocabularyScreen() {
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const utils = trpc.useUtils();

  const { data: words, isLoading, error, refetch: refetchAll } = trpc.vocabulary.getAll.useQuery();
  const { data: wordsNeedingPractice, refetch: refetchPractice } =
    trpc.vocabulary.getNeedingPractice.useQuery({});

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchAll(), refetchPractice()]);
    } finally {
      setRefreshing(false);
    }
  };

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
        <Text variant="bodyLarge" className="text-gray-600 mt-4">
          Loading vocabulary...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <Text variant="bodyLarge" className="text-red-600 text-center">
          Error: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
        <ScrollView 
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#2563eb"
              colors={["#2563eb"]}
            />
          }
        >
          {/* Header */}
          <View className="px-6 pt-8 pb-8 mb-8">
            <Text variant="headlineMedium" className="text-gray-900 mb-2" style={{ fontWeight: "bold" }}>
              📚 Vocabulary
            </Text>
            <Text variant="bodyMedium" className="text-gray-600">
              Manage your English vocabulary words
            </Text>
          </View>

          {/* Add New Word Form */}
          <Card mode="elevated" style={{ borderRadius: 12, backgroundColor: "white", elevation: 1, marginHorizontal: 24, marginBottom: 32 }}>
            <Card.Content style={{ padding: 24 }}>
              <Text variant="titleLarge" className="text-gray-900 mb-4" style={{ fontWeight: "600" }}>
                Add New Word
              </Text>
              <View className="flex-col gap-4">
                <TextInput
                  placeholder="Word"
                  value={newWord}
                  onChangeText={setNewWord}
                  mode="outlined"
                  style={{ backgroundColor: "white" }}
                  contentStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#2563eb"
                />
                <TextInput
                  placeholder="Definition"
                  value={newDefinition}
                  onChangeText={setNewDefinition}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={{ backgroundColor: "white" }}
                  contentStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#2563eb"
                />
                <Button
                  mode="contained"
                  onPress={handleAddWord}
                  disabled={createWordMutation.isPending}
                  loading={createWordMutation.isPending}
                  buttonColor="#2563eb"
                  style={{ marginTop: 8 }}
                  contentStyle={{ paddingVertical: 8 }}
                >
                  {createWordMutation.isPending ? "Adding..." : "Add Word"}
                </Button>
              </View>
            </Card.Content>
          </Card>

        {/* Words Needing Practice */}
        {wordsNeedingPractice && wordsNeedingPractice.length > 0 && (
          <View
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#fff7ed",
              borderWidth: 1,
              borderColor: "#fed7aa",
              borderRadius: 12,
              marginHorizontal: 24,
              marginBottom: 32,
            }}
          >
            <Text variant="titleLarge" className="text-orange-800 mb-4" style={{ fontWeight: "600" }}>
              🔄 Words Needing Practice ({wordsNeedingPractice.length})
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {wordsNeedingPractice.slice(0, 10).map((word) => (
                <Button
                  key={word.id}
                  mode="contained"
                  onPress={() => recordPracticeMutation.mutate({ id: word.id })}
                  buttonColor="#fed7aa"
                  textColor="#9a3412"
                  style={{ borderRadius: 9999, marginBottom: 4 }}
                  contentStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}
                  labelStyle={{ fontSize: 14 }}
                >
                  {word.word}
                </Button>
              ))}
              {wordsNeedingPractice.length > 10 && (
                <View className="px-3 py-1 self-center">
                  <Text variant="bodyMedium" style={{ color: "#ea580c" }}>
                    +{wordsNeedingPractice.length - 10} more
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Word List */}
        <Card mode="elevated" style={{ borderRadius: 12, backgroundColor: "white", elevation: 1, marginHorizontal: 24, marginBottom: 32 }}>
          <Card.Content style={{ padding: 0 }}>
            <View className="px-6 py-4 border-b border-gray-100">
              <Text variant="titleLarge" className="text-gray-900" style={{ fontWeight: "600" }}>
                All Words ({words?.length || 0})
              </Text>
            </View>

            {words && words.length > 0 ? (
              <View>
                {words.map((word, index: number) => (
                  <View key={word.id}>
                    <View className="px-6 py-4 flex-row items-center justify-between">
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Text variant="titleMedium" className="text-gray-900" style={{ fontWeight: "600" }}>
                            {word.word}
                          </Text>
                          {word.learned && (
                            <View
                              style={{
                                backgroundColor: "#dcfce7",
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: 9999,
                              }}
                            >
                              <Text variant="labelSmall" style={{ color: "#166534", fontSize: 10 }}>
                                Learned
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text variant="bodyMedium" className="text-gray-600 mt-1">
                          {word.definition}
                        </Text>
                        <Text variant="bodySmall" className="text-gray-400 mt-1">
                          Practiced {word.timesPracticed} times
                        </Text>
                      </View>
                      <View className="flex-row gap-2 ml-4">
                        {!word.learned && (
                          <Button
                            mode="contained"
                            onPress={() => markLearnedMutation.mutate({ id: word.id })}
                            buttonColor="#dcfce7"
                            textColor="#166534"
                            style={{ borderRadius: 8 }}
                            contentStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}
                            labelStyle={{ fontSize: 14 }}
                          >
                            Mark Learned
                          </Button>
                        )}
                        <Button
                          mode="contained"
                          onPress={() => recordPracticeMutation.mutate({ id: word.id })}
                          buttonColor="#dbeafe"
                          textColor="#1e40af"
                          style={{ borderRadius: 8 }}
                          contentStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}
                          labelStyle={{ fontSize: 14 }}
                        >
                          Practice
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => deleteWordMutation.mutate({ id: word.id })}
                          buttonColor="#fee2e2"
                          textColor="#991b1b"
                          style={{ borderRadius: 8 }}
                          contentStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}
                          labelStyle={{ fontSize: 14 }}
                        >
                          Delete
                        </Button>
                      </View>
                    </View>
                    {index < words.length - 1 && (
                      <Divider style={{ marginLeft: 24, marginRight: 24 }} />
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View className="px-6 py-12 items-center">
                <Text variant="bodyLarge" className="text-gray-500">
                  No words yet. Add your first word above!
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

          {/* Bottom Spacing */}
          <View className="h-6" />
        </ScrollView>
      </SafeAreaView>
  );
}
