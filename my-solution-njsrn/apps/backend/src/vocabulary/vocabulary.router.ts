import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { VocabularyService } from './vocabulary.service';
import {
  createWordSchema,
  wordSchema,
  type CreateWordInput,
} from './vocabulary.schema';
import { z } from 'zod';

@Router({ alias: 'vocabulary' })
export class VocabularyRouter {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Query({
    input: z.object({
      id: z.string(),
    }),
    output: wordSchema.nullable(),
  })
  getById(@Input('id') id: string) {
    return this.vocabularyService.getWordById(id);
  }

  @Query({
    output: z.array(wordSchema),
  })
  getAll() {
    return this.vocabularyService.getAllWords();
  }

  @Mutation({
    input: createWordSchema,
    output: wordSchema,
  })
  create(@Input() wordData: CreateWordInput) {
    return this.vocabularyService.createWord(wordData);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: createWordSchema.partial(),
    }),
    output: wordSchema,
  })
  update(
    @Input('id') id: string,
    @Input('data') data: Partial<CreateWordInput>,
  ) {
    return this.vocabularyService.updateWord(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: z.object({ success: z.boolean() }),
  })
  delete(@Input('id') id: string) {
    return this.vocabularyService
      .deleteWord(id)
      .then(() => ({ success: true }));
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: wordSchema,
  })
  markLearned(@Input('id') id: string) {
    return this.vocabularyService.markAsLearned(id);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: wordSchema,
  })
  recordPractice(@Input('id') id: string) {
    return this.vocabularyService.recordPractice(id);
  }

  @Query({
    input: z
      .object({
        days: z.number().optional(),
      })
      .optional(),
    output: z.array(wordSchema),
  })
  getNeedingPractice(@Input('days') days?: number) {
    return this.vocabularyService.getWordsNeedingPractice(days);
  }
}
