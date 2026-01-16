import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { InMemoryVocabularyRepository } from './repositories/in-memory-vocabulary.repository';
import { VocabularyRouter } from './vocabulary.router';

@Module({
  providers: [
    VocabularyService,
    {
      provide: 'VocabularyRepository',
      useClass: InMemoryVocabularyRepository,
    },
    VocabularyRouter,
  ],
  exports: [VocabularyService],
})
export class VocabularyModule {}
