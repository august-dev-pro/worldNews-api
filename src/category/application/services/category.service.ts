import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/category/application/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/category/application/dtos/update-category.dto';
import { Category } from 'src/category/domain/entitie/category.entity';
import { CreateCategoryUseCase } from '../use-cases/category-create.use-case';
import { DeleteCategoryUseCase } from '../use-cases/delete-category.use-case';
import { FindAllCategoriesUseCase } from '../use-cases/find-allCategories.use-case';
import { FindCategoryByIdUseCase } from '../use-cases/find-categoryById.use-case';
import { UpdateCategoryUseCase } from '../use-cases/update-category.use-case';
import { GetOrCreateCategoryUseCase } from '../use-cases/get-or-create-category.usecase';

@Injectable()
export class CategoryService {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getOrCreateCategoryUseCase: GetOrCreateCategoryUseCase,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.createCategoryUseCase.execute(createCategoryDto);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.updateCategoryUseCase.execute(id, updateCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.findAllCategoriesUseCase.execute();
  }

  async findById(id: string): Promise<Category | null> {
    return await this.findCategoryByIdUseCase.execute(id);
  }

  async delete(id: string): Promise<void> {
    return await this.deleteCategoryUseCase.execute(id);
  }

  async getOrCreateCategory(name: string): Promise<string> {
    return this.getOrCreateCategoryUseCase.execute(name);
  }
}
