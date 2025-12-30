import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { InMemoryVocabularyRepository } from './repositories/in-memory-vocabulary.repository';

@Module({
  providers: [
    VocabularyService,
    {
      provide: 'VocabularyRepository',
      useClass: InMemoryVocabularyRepository,
    },
  ],
  exports: [VocabularyService],
})
export class VocabularyModule {}

