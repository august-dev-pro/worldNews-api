// src/article-retrieval/use-cases/fetch-multiple-articles.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ApiExterneDto } from '../dtos/api-externe.dto';
import { IArticleRetrivalRepository } from '../interfaces/article-retrival.repository.interface';

@Injectable()
export class FetchMultipleArticlesUseCase {
  constructor(
    @Inject('IArticleRetrivalRepository')
    private readonly articleRetrivalRepository: IArticleRetrivalRepository,
  ) {}

  // Fonction pour récupérer les articles de plusieurs sources
  async execute(): Promise<any[]> {
    // Récupérer les articles depuis les différentes sources
    const combinedArticles =
      await this.articleRetrivalRepository.fetchArticlesFromApi();

    // Optionnellement, tu peux mapper les articles à un DTO ou un format spécifique
    return combinedArticles;
  }
}
