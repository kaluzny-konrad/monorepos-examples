import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  vocabulary: t.router({
    getById: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    }).nullable()).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAll: publicProcedure.output(z.array(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    create: publicProcedure.input(z.object({
      word: z.string().min(1, 'Word is required'),
      definition: z.string().min(1, 'Definition is required'),
    })).output(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    update: publicProcedure.input(z.object({
      id: z.string(),
      data: z.object({
        word: z.string().min(1, 'Word is required'),
        definition: z.string().min(1, 'Definition is required'),
      }).partial(),
    })).output(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({ success: z.boolean() })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    markLearned: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    recordPractice: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.object({
      id: z.string(),
      word: z.string(),
      definition: z.string(),
      learned: z.boolean(),
      learnedAt: z.date().optional(),
      timesPracticed: z.number(),
      lastPracticedAt: z.date().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getNeedingPractice: publicProcedure.input(z
      .object({
        days: z.number().optional(),
      })
      .optional()).output(z.array(z.object({
        id: z.string(),
        word: z.string(),
        definition: z.string(),
        learned: z.boolean(),
        learnedAt: z.date().optional(),
        timesPracticed: z.number(),
        lastPracticedAt: z.date().optional(),
      }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

