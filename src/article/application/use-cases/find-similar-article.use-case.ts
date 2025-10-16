import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';

@Injectable()
export class FindSimilarArticleByIdUseCase {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(data: {
    url?: string | undefined;
    title: string;
    content: string;
    source?: string | undefined;
  }): Promise<boolean> {
    const existingArticle =
      await this.articleRepository.existsSimilarArticle(data);

    return existingArticle;
  }
}
