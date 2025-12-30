import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

// This router is used for type generation only
// The actual router with services is created in apps/backend/src/trpc/trpc.router.ts
const appRouter = t.router({
  vocabulary: t.router({
    create: publicProcedure
      .input(z.object({ word: z.string(), definition: z.string() }))
      .mutation(() => ({})),
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(() => null),
    getAll: publicProcedure.query(() => []),
    update: publicProcedure
      .input(z.object({ id: z.string(), data: z.any() }))
      .mutation(() => ({})),
    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(() => ({ success: true })),
    markLearned: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(() => ({})),
    recordPractice: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(() => ({})),
    getNeedingPractice: publicProcedure
      .input(z.object({ days: z.number().optional() }).optional())
      .query(() => []),
  }),
});

export type AppRouter = typeof appRouter;

