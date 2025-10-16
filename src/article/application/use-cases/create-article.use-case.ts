import { Inject, Injectable } from '@nestjs/common';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { Article } from 'src/article/domain/entitie/article.entity';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleRepository.create(createArticleDto);
  }
}
