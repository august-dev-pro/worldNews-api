// src/article/application/article.service.ts
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/article/application/dtos/update-article.dto';
import { Article } from 'src/article/domain/entitie/article.entity';
import { CreateArticleUseCase } from '../use-cases/create-article.use-case';
import { DeleteArticleUseCase } from '../use-cases/delete-artcile.use-case';
import { FindAllArticlesUseCase } from '../use-cases/find-allArticles.use-case';
import { FindArticleByIdUseCase } from '../use-cases/find-articleById.use-case';
import { FindArticlesByAuthorUseCase } from '../use-cases/find-articlesByAuthor.use-case';
import { FindArticlesByCategoryUseCase } from '../use-cases/find-articlesByCategory.use-case';
import { FindArticlesBySourceUseCase } from '../use-cases/find-articlesBySource.use-case';
import { UpdateArticleUseCase } from '../use-cases/update-article.use-case';
import { FindSimilarArticleByIdUseCase } from '../use-cases/find-similar-article.use-case';

@Injectable()
export class ArticleService {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly findSimilarArticleByIdUseCase: FindSimilarArticleByIdUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly findAllArticlesUseCase: FindAllArticlesUseCase,
    private readonly findArticleByIdUseCase: FindArticleByIdUseCase,
    private readonly findArticlesByCategoryUseCase: FindArticlesByCategoryUseCase,
    private readonly findArticlesBySourceUseCase: FindArticlesBySourceUseCase,
    private readonly findArticlesByAuthorUseCase: FindArticlesByAuthorUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.createArticleUseCase.execute(createArticleDto);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return await this.updateArticleUseCase.execute(id, updateArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return await this.findAllArticlesUseCase.execute();
  }

  async findById(id: string): Promise<Article | null> {
    return await this.findArticleByIdUseCase.execute(id);
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    return await this.findArticlesByCategoryUseCase.execute(categoryId);
  }

  async findBySource(sourceId: string): Promise<Article[]> {
    return await this.findArticlesBySourceUseCase.execute(sourceId);
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    return await this.findArticlesByAuthorUseCase.execute(authorId);
  }

  async delete(id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute(id);
  }

  async existsSimilarArticle(data: {
    url?: string;
    title: string;
    content: string;
    source?: string;
  }): Promise<boolean> {
    return await this.findSimilarArticleByIdUseCase.execute(data);
  }
}
