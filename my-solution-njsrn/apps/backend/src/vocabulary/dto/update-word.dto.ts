import { z } from 'zod';

export const updateWordSchema = z.object({
  word: z.string().min(1).optional(),
  definition: z.string().min(1).optional(),
  learned: z.boolean().optional(),
});

export type UpdateWordDto = z.infer<typeof updateWordSchema>;

