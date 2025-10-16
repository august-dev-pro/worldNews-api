import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interface/category.repository.interface';
import { CreateCategoryDto } from 'src/category/application/dtos/create-category.dto';
import { Category } from 'src/category/domain/entitie/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // const existingCategory = await this.categoryRepository.findByName()
    return this.categoryRepository.create(createCategoryDto);
  }
}
