import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interface/category.repository.interface';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.delete(id);
  }
}
