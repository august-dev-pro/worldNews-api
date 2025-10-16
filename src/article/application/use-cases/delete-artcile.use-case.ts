import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    await this.articleRepository.delete(id);
  }
}
