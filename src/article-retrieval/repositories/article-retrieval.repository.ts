// src/article-retrieval/repositories/article.repository.ts
import { Injectable } from '@nestjs/common';
import { ApiExterneDto } from '../dtos/api-externe.dto';
import { ExternalArticleFetcherUtils } from '../utils/external-articleFetcher.util';
import { IArticleRetrivalRepository } from '../interfaces/article-retrival.repository.interface';

@Injectable()
export class ArticleRetrievalRepository implements IArticleRetrivalRepository {
  // Définir une liste d'APIs externes par défaut
  private readonly defaultExternesApis: ApiExterneDto[] = [
    {
      url: 'https://api.example1.com/articles', // Exemple d'URL
      apiKey: 'your-api-key-1', // Exemple de clé d'API
    },
    {
      url: 'https://api.example2.com/articles', // Exemple d'URL
      apiKey: 'your-api-key-2', // Exemple de clé d'API
    },
  ];

  constructor(
    private readonly externalArticleFetcherUtils: ExternalArticleFetcherUtils,
  ) {}

  // Méthode pour récupérer des articles depuis plusieurs APIs externes
  async fetchArticlesFromApi(): Promise<any[]> {
    // Si aucune donnée n'est fournie, utiliser les APIs par défaut

    const articles: any[] = [];

    // Parcourir toutes les APIs à appeler
    /* for (const api of apisToFetch) {
      try {
        // Récupérer les articles depuis chaque API
        const articlesFromApi =
          await this.externalArticleFetcherUtils.fetchArticlesFromOneApi(api);

        // Ajouter les articles récupérés au tableau global
        articles.push(...articlesFromApi);
      } catch (error) {
        // Gérer les erreurs si l'API échoue
        console.error(
          `Erreur lors de la récupération des articles de l'API ${api.url}:`,
          error.message,
        );
      }
    } */
    try {
      const articlesFromApi =
        await this.externalArticleFetcherUtils.fetchRecentArticles();

      console.error(`les articles de l'API:`, articlesFromApi);

      articles.push(...articlesFromApi);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des articles de l'API :`,
        error,
      );
    }
    return articles;
  }
}
