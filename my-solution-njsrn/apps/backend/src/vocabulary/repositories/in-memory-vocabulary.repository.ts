import { Injectable } from '@nestjs/common';
import type { Word } from '@repo/learning-core';
import type { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class InMemoryVocabularyRepository implements VocabularyRepository {
  private words: Map<string, Word> = new Map();

  create(word: Omit<Word, 'id'>): Promise<Word> {
    const id = crypto.randomUUID();
    const newWord: Word = {
      ...word,
      id,
    };
    this.words.set(id, newWord);
    return Promise.resolve(newWord);
  }

  findById(id: string): Promise<Word | null> {
    return Promise.resolve(this.words.get(id) || null);
  }

  findAll(): Promise<Word[]> {
    return Promise.resolve(Array.from(this.words.values()));
  }

  update(id: string, data: Partial<Omit<Word, 'id'>>): Promise<Word> {
    const existing = this.words.get(id);
    if (!existing) {
      throw new Error(`Word with id ${id} not found`);
    }
    const updated: Word = {
      ...existing,
      ...data,
    };
    this.words.set(id, updated);
    return Promise.resolve(updated);
  }

  delete(id: string): Promise<void> {
    if (!this.words.has(id)) {
      throw new Error(`Word with id ${id} not found`);
    }
    this.words.delete(id);
    return Promise.resolve();
  }
}
