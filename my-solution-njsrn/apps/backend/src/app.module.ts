import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
    VocabularyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
