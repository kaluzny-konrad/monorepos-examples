"use client";

import { ReactElement, useState } from "react";
import { trpc } from "@repo/trpc/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function VocabularyPage(): ReactElement {
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  const createWordSchema = z.object({
    word: z.string().min(1, "Word is required"),
    definition: z.string().min(1, "Definition is required"),
  });

  const form = useForm<z.infer<typeof createWordSchema>>({
    resolver: zodResolver(createWordSchema),
    defaultValues: {
      word: "",
      definition: "",
    },
  });

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
      utils.vocabulary.getNeedingPractice.invalidate();
    },
  });

  const onSubmit = (data: z.infer<typeof createWordSchema>) => {
    createWordMutation.mutate(data);
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
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 Vocabulary
          </h1>
          <p className="text-gray-600">Manage your English vocabulary words</p>
        </div>

        {/* Add New Word Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Word
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="text"
                placeholder="Word"
                {...form.register("word")}
                onChange={(e) => setNewWord(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Definition"
                {...form.register("definition")}
                onChange={(e) => setNewDefinition(e.target.value)}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding..." : "Add Word"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Words Needing Practice */}
        {wordsNeedingPractice && wordsNeedingPractice.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-orange-800 mb-4">
              🔄 Words Needing Practice ({wordsNeedingPractice.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {wordsNeedingPractice.slice(0, 10).map((word) => (
                <Button
                  key={word.id}
                  onClick={() => recordPracticeMutation.mutate({ id: word.id })}
                  className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full hover:bg-orange-300 transition-colors"
                >
                  {word.word}
                </Button>
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
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">
                        {word.word}
                      </span>
                      {word.learned && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
                          Learned
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1 wrap-break-word">
                      {word.definition}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Practiced {word.timesPracticed} times
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {!word.learned && (
                      <Button
                        onClick={() =>
                          markLearnedMutation.mutate({ id: word.id })
                        }
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap shrink-0"
                      >
                        Mark Learned
                      </Button>
                    )}
                    <Button
                      onClick={() =>
                        recordPracticeMutation.mutate({ id: word.id })
                      }
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      Practice
                    </Button>
                    <Button
                      onClick={() => deleteWordMutation.mutate({ id: word.id })}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      Delete
                    </Button>
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
