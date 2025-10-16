import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interface/category.repository.interface';
// import { UpdateCategoryDto } from 'src/category/application/dtos/update-category.dto';
import { Category } from 'src/category/domain/entitie/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    id: string,
    updateCategoryDto: /* UpdateCategoryDto */ any,
  ): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoryRepository.update(id, updateCategoryDto);
  }
}
