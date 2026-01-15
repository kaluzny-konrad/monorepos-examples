import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Word } from '@repo/learning-core';
import { getWordsNeedingPractice } from '@repo/learning-core';
import type { CreateWordInput } from './vocabulary.schema';
import type { VocabularyRepository } from './repositories/vocabulary.repository';

@Injectable()
export class VocabularyService {
  constructor(
    @Inject('VocabularyRepository')
    private readonly repository: VocabularyRepository,
  ) {}

  async createWord(dto: CreateWordInput): Promise<Word> {
    return this.repository.create({
      word: dto.word,
      definition: dto.definition,
      learned: false,
      timesPracticed: 0,
    });
  }

  async getWordById(id: string): Promise<Word | null> {
    return this.repository.findById(id);
  }

  async getAllWords(): Promise<Word[]> {
    return this.repository.findAll();
  }

  async updateWord(id: string, dto: Partial<CreateWordInput>): Promise<Word> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Word with id ${id} not found`);
    }
    return this.repository.update(id, dto);
  }

  async deleteWord(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Word with id ${id} not found`);
    }
    return this.repository.delete(id);
  }

  async markAsLearned(id: string): Promise<Word> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Word with id ${id} not found`);
    }
    return this.repository.update(id, {
      learned: true,
      learnedAt: existing.learned ? existing.learnedAt : new Date(),
    });
  }

  async recordPractice(id: string): Promise<Word> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Word with id ${id} not found`);
    }
    return this.repository.update(id, {
      timesPracticed: existing.timesPracticed + 1,
      lastPracticedAt: new Date(),
    });
  }

  async getWordsNeedingPractice(days: number = 7): Promise<Word[]> {
    const allWords = await this.repository.findAll();
    return getWordsNeedingPractice(allWords, days);
  }
}
