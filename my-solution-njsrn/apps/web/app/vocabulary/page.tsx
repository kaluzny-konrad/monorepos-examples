"use client";

import { ReactElement, useState } from "react";
import { trpc } from "@repo/trpc/client";
import Link from "next/link";

export default function VocabularyPage(): ReactElement {
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  const utils = trpc.useUtils();
  
  const { data: words, isLoading, error } = trpc.vocabulary.getAll.useQuery();
  const { data: wordsNeedingPractice } = trpc.vocabulary.getNeedingPractice.useQuery({});

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

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() && newDefinition.trim()) {
      createWordMutation.mutate({ word: newWord, definition: newDefinition });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading vocabulary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Vocabulary</h1>
          <p className="text-gray-600">Manage your English vocabulary words</p>
        </div>

        {/* Add New Word Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Word</h2>
          <form onSubmit={handleAddWord} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Definition"
              value={newDefinition}
              onChange={(e) => setNewDefinition(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={createWordMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {createWordMutation.isPending ? "Adding..." : "Add Word"}
            </button>
          </form>
        </div>

        {/* Words Needing Practice */}
        {wordsNeedingPractice && wordsNeedingPractice.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              🔄 Words Needing Practice ({wordsNeedingPractice.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {wordsNeedingPractice.slice(0, 10).map((word) => (
                <button
                  key={word.id}
                  onClick={() => recordPracticeMutation.mutate({ id: word.id })}
                  className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full hover:bg-orange-300 transition-colors"
                >
                  {word.word}
                </button>
              ))}
              {wordsNeedingPractice.length > 10 && (
                <span className="px-3 py-1 text-orange-600">
                  +{wordsNeedingPractice.length - 10} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Word List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              All Words ({words?.length || 0})
            </h2>
          </div>
          
          {words && words.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {words.map((word) => (
                <div
                  key={word.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{word.word}</span>
                      {word.learned && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Learned
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{word.definition}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Practiced {word.timesPracticed} times
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!word.learned && (
                      <button
                        onClick={() => markLearnedMutation.mutate({ id: word.id })}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Mark Learned
                      </button>
                    )}
                    <button
                      onClick={() => recordPracticeMutation.mutate({ id: word.id })}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Practice
                    </button>
                    <button
                      onClick={() => deleteWordMutation.mutate({ id: word.id })}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              No words yet. Add your first word above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

