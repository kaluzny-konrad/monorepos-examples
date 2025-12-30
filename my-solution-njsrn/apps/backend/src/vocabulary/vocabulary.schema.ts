import { z } from 'zod';

export const wordSchema = z.object({
  id: z.string(),
  word: z.string(),
  definition: z.string(),
  learned: z.boolean(),
  learnedAt: z.date().optional(),
  timesPracticed: z.number(),
  lastPracticedAt: z.date().optional(),
});

export const createWordSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  definition: z.string().min(1, 'Definition is required'),
});

export type CreateWordInput = z.infer<typeof createWordSchema>;
export type Word = z.infer<typeof wordSchema>;

