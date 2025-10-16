// src/article-retrieval/article-retrieval.module.ts
import { Module } from '@nestjs/common';
import { ExternalArticleFetcherUtils } from './utils/external-articleFetcher.util';
import { FetchMultipleArticlesUseCase } from './use-cases/fetch-multiple-articles.use-case';
import { ArticleRetrivalController } from './controllers/article-retrieval.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleRetrievalRepository } from './repositories/article-retrieval.repository';
import { ArticleProcessorService } from './services/article-processor.service';
import { CategoryModule } from 'src/category/category.module';
import { SourceModule } from 'src/source/source.module';
import { AuthorModule } from 'src/author/author.module';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [CategoryModule, SourceModule, AuthorModule, ArticleModule],
  controllers: [ArticleRetrivalController],
  providers: [
    PrismaService,
    ExternalArticleFetcherUtils,
    FetchMultipleArticlesUseCase,
    ArticleProcessorService,
    {
      provide: 'IArticleRetrivalRepository',
      useClass: ArticleRetrievalRepository,
    },
  ],
  exports: [FetchMultipleArticlesUseCase], // Exporter le use-case pour qu'il soit utilisé ailleurs
})
export class ArticleRetrievalModule {}
