import { Inject, Injectable } from '@nestjs/common';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';
import { Article } from 'src/article/domain/entitie/article.entity';

@Injectable()
export class FindArticlesByAuthorUseCase {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(authorId: string): Promise<Article[]> {
    return this.articleRepository.findByAuthor(authorId);
  }
}
