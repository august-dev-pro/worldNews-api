import { CreateCategoryDto } from 'src/category/application/dtos/create-category.dto';
import { Category } from 'src/category/domain/entitie/category.entity';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  update(
    id: string,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
}
