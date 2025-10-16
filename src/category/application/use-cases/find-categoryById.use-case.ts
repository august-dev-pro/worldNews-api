import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interface/category.repository.interface';
import { Category } from 'src/category/domain/entitie/category.entity';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }
}
