import { ArticleProcessorService } from 'src/article-retrieval/services/article-processor.service';
import { ExternalArticleFetcherUtils } from 'src/article-retrieval/utils/external-articleFetcher.util';
import { ArticleService } from './article.service';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';

@Injectable()
export class ArticleIngestorService {
  constructor(
    private readonly articleFetcher: ExternalArticleFetcherUtils,
    private readonly articleProcessor: ArticleProcessorService,
    private readonly articleService: ArticleService,
  ) {}

  async ingestAll(): Promise<number> {
    const rawArticles = await this.articleFetcher.fetchRecentArticles();

    let count = 0;

    for (const raw of rawArticles) {
      const processed = await this.articleProcessor.processArticle(raw);

      const exists = await this.articleService.existsSimilarArticle(processed);
      if (exists) continue;

      await this.articleService.create(processed);
      count++;
    }

    return count;
  }
}
