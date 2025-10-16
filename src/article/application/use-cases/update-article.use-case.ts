import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';
// import { UpdateArticleDto } from 'src/article/application/dtos/update-article.dto';
import { Article } from 'src/article/domain/entitie/article.entity';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(
    id: string,
    updateArticleDto: /* UpdateArticleDto */ any,
  ): Promise<Article> {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    return this.articleRepository.update(id, updateArticleDto);
  }
}
