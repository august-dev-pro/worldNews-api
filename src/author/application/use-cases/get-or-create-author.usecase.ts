// src/application/use-cases/author/get-or-create-author.usecase.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { IAuthorRepository } from '../interface/author.repository.interface';

@Injectable()
export class GetOrCreateAuthorUseCase {
  private readonly logger = new Logger(GetOrCreateAuthorUseCase.name);

  constructor(
    @Inject('IAuthorRepository')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(name: string): Promise<string> {
    if (name == '') return 'inconnu';

    try {
      this.logger.log(`Looking for author: "${name}"`);
      const existing = await this.authorRepository.findByName(name);

      if (existing) {
        this.logger.log(`Author "${name}" found with ID: ${existing.getId()}`);
        return existing.getId();
      }

      this.logger.log(`Author "${name}" not found. Creating...`);
      const created = await this.authorRepository.create({ name });

      this.logger.log(`Author "${name}" created with ID: ${created.getId()}`);
      return created.getId();
    } catch (error) {
      this.logger.error(
        `Failed to get or create author "${name}"`,
        error.stack,
      );
      throw error;
    }
  }
}
