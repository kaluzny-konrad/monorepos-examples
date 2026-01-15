import type { Word } from '@repo/learning-core';

export interface VocabularyRepository {
  create(word: Omit<Word, 'id'>): Promise<Word>;
  findById(id: string): Promise<Word | null>;
  findAll(): Promise<Word[]>;
  update(id: string, data: Partial<Omit<Word, 'id'>>): Promise<Word>;
  delete(id: string): Promise<void>;
}
