import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interface/category.repository.interface';
import { Category } from 'src/category/domain/entitie/category.entity';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
