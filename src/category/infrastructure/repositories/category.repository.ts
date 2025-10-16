import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICategoryRepository } from '../../application/interface/category.repository.interface';
import { CategoryMapper } from '../../domain/mapper/category.mapper';
import { Category } from '../../domain/entitie/category.entity';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async findById(id: string): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    return category ? this.categoryMapper.toDomain(category) : null;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany();
    return categories.map((category) => this.categoryMapper.toDomain(category));
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryData = this.categoryMapper.toPersistence(createCategoryDto);
    const createdCategory = await this.prismaService.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData,
    });
    return this.categoryMapper.toDomain(createdCategory);
  }

  async update(
    id: string,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const updateData =
      this.categoryMapper.toUpdtaePersistence(updateCategoryDto);
    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data: updateData,
    });
    return this.categoryMapper.toDomain(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.category.delete({ where: { id } });
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      where: { name: name },
    });
    return category ? this.categoryMapper.toDomain(category) : null;
  }
}
