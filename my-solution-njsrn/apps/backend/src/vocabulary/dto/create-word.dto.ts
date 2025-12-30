import { z } from 'zod';

export const createWordSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  definition: z.string().min(1, 'Definition is required'),
});

export type CreateWordDto = z.infer<typeof createWordSchema>;

