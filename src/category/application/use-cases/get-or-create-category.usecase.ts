import { Injectable, Logger, Inject } from '@nestjs/common';
import { ICategoryRepository } from '../interface/category.repository.interface';

@Injectable()
export class GetOrCreateCategoryUseCase {
  private readonly logger = new Logger(GetOrCreateCategoryUseCase.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(name: string): Promise<string> {
    try {
      this.logger.log(`Looking for category: "${name}"`);
      const existing = await this.categoryRepository.findByName(name);

      if (existing) {
        this.logger.log(
          `Category "${name}" found with ID: ${existing.getId()}`,
        );
        return existing.getId();
      }

      this.logger.log(`Category "${name}" not found. Creating...`);
      const created = await this.categoryRepository.create({ name });

      this.logger.log(`Category "${name}" created with ID: ${created.getId()}`);
      return created.getId();
    } catch (error) {
      this.logger.error(
        `Failed to get or create category "${name}"`,
        error.stack,
      );
      throw error;
    }
  }
}
