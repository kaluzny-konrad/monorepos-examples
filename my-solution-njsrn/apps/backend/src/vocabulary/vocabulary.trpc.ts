import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { VocabularyService } from './vocabulary.service';
import { createWordSchema } from './dto/create-word.dto';
import { updateWordSchema } from './dto/update-word.dto';

const t = initTRPC.create();
const publicProcedure = t.procedure;

export function createVocabularyRouter(vocabularyService: VocabularyService) {
  return t.router({
    create: publicProcedure
      .input(createWordSchema)
      .mutation(async ({ input }) => {
        return vocabularyService.createWord(input);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return vocabularyService.getWordById(input.id);
      }),

    getAll: publicProcedure.query(async () => {
      return vocabularyService.getAllWords();
    }),

    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          data: updateWordSchema,
        })
      )
      .mutation(async ({ input }) => {
        return vocabularyService.updateWord(input.id, input.data);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await vocabularyService.deleteWord(input.id);
        return { success: true };
      }),

    markLearned: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return vocabularyService.markAsLearned(input.id);
      }),

    recordPractice: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return vocabularyService.recordPractice(input.id);
      }),

    getNeedingPractice: publicProcedure
      .input(
        z
          .object({
            days: z.number().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        return vocabularyService.getWordsNeedingPractice(input?.days);
      }),
  });
}

export type VocabularyRouter = ReturnType<typeof createVocabularyRouter>;

