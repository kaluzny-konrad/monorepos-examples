import { Injectable } from '@nestjs/common';
import type { Word } from '@repo/learning-core';
import type { VocabularyRepository } from './vocabulary.repository';

@Injectable()
export class InMemoryVocabularyRepository implements VocabularyRepository {
  private words: Map<string, Word> = new Map();

  async create(word: Omit<Word, 'id'>): Promise<Word> {
    const id = crypto.randomUUID();
    const newWord: Word = {
      ...word,
      id,
    };
    this.words.set(id, newWord);
    return newWord;
  }

  async findById(id: string): Promise<Word | null> {
    return this.words.get(id) || null;
  }

  async findAll(): Promise<Word[]> {
    return Array.from(this.words.values());
  }

  async update(id: string, data: Partial<Omit<Word, 'id'>>): Promise<Word> {
    const existing = this.words.get(id);
    if (!existing) {
      throw new Error(`Word with id ${id} not found`);
    }
    const updated: Word = {
      ...existing,
      ...data,
    };
    this.words.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!this.words.has(id)) {
      throw new Error(`Word with id ${id} not found`);
    }
    this.words.delete(id);
  }
}

