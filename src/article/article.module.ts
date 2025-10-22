import { Module } from '@nestjs/common';
import { ArticleService } from './application/services/article.service';
import { CreateArticleUseCase } from 'src/article/application/use-cases/create-article.use-case';
import { UpdateArticleUseCase } from 'src/article/application/use-cases/update-article.use-case';
import { FindArticleByIdUseCase } from 'src/article/application/use-cases/find-articleById.use-case';
import { DeleteArticleUseCase } from 'src/article/application/use-cases/delete-artcile.use-case';
import { FindArticlesByCategoryUseCase } from 'src/article/application/use-cases/find-articlesByCategory.use-case';
import { FindArticlesBySourceUseCase } from 'src/article/application/use-cases/find-articlesBySource.use-case';
import { FindArticlesByAuthorUseCase } from 'src/article/application/use-cases/find-articlesByAuthor.use-case';
import { ArticleRepository } from './infrastructure/repositories/article.repository';
import { ArticleMapper } from 'src/article/domain/mapper/article.mapper';
import { ArticleController } from './presentation/controllers/article.controller';
import { FindAllArticlesUseCase } from './application/use-cases/find-allArticles.use-case';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindSimilarArticleByIdUseCase } from './application/use-cases/find-similar-article.use-case';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    PrismaService,
    // UseCases
    CreateArticleUseCase,
    UpdateArticleUseCase,
    FindArticleByIdUseCase,
    DeleteArticleUseCase,
    FindArticlesByCategoryUseCase,
    FindArticlesBySourceUseCase,
    FindArticlesByAuthorUseCase,
    FindAllArticlesUseCase,
    FindSimilarArticleByIdUseCase,
    // Repositories
    {
      provide: 'IArticleRepository',
      useClass: ArticleRepository,
    },
    // Mappers
    ArticleMapper,
  ],

  exports: [ArticleService],
})
export class ArticleModule {}
