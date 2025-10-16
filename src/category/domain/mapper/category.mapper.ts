import { Injectable } from '@nestjs/common';
import { Category as PrimaCategory } from '@prisma/client';
import { Category } from '../entitie/category.entity';
import { CreateCategoryDto } from 'src/category/application/dtos/create-category.dto';

@Injectable()
export class CategoryMapper {
  // Convertir un DTO (Data Transfer Object) en entité Category
  toDomain(category: PrimaCategory): Category {
    return new Category(category.id, category.name, category.description);
  }

  // Convertir une entité Category en DTO
  toPersistence(createCategoryDto: CreateCategoryDto): any {
    return {
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    };
  }

  toUpdtaePersistence(updateCategoryDto: any): any {
    const updateCategoryData: any = {};

    if (updateCategoryDto.name) {
      updateCategoryData.name = updateCategoryDto.name;
    }
    if (updateCategoryDto.description) {
      updateCategoryData.description = updateCategoryDto.description;
    }
    return updateCategoryData;
  }
}
