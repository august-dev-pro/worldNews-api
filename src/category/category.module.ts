import { Module } from '@nestjs/common';
import { CategoryService } from 'src/category/application/services/category.service';
import { CreateCategoryUseCase } from 'src/category/application/use-cases/category-create.use-case';
import { UpdateCategoryUseCase } from 'src/category/application/use-cases/update-category.use-case';
import { FindCategoryByIdUseCase } from 'src/category/application/use-cases/find-categoryById.use-case';
import { DeleteCategoryUseCase } from 'src/category/application/use-cases/delete-category.use-case';
import { CategoryRepository } from 'src/category/infrastructure/repositories/category.repository';
import { CategoryController } from './presentation/controllers/category.controller';
import { CategoryMapper } from './domain/mapper/category.mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllCategoriesUseCase } from './application/use-cases/find-allCategories.use-case';
import { GetOrCreateCategoryUseCase } from './application/use-cases/get-or-create-category.usecase';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    // UseCases
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    FindCategoryByIdUseCase,
    FindAllCategoriesUseCase,
    DeleteCategoryUseCase,
    GetOrCreateCategoryUseCase,
    // Repositories
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    // Mappers
    CategoryMapper,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
