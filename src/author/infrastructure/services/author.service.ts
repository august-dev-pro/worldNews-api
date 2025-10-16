// src/domain/services/author.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GetOrCreateAuthorUseCase } from 'src/author/application/use-cases/get-or-create-author.usecase';

@Injectable()
export class AuthorService {
  private readonly logger = new Logger(AuthorService.name);

  constructor(
    private readonly getOrCreateAuthorUseCase: GetOrCreateAuthorUseCase,
  ) {}

  async getOrCreateAuthor(name: string): Promise<string> {
    this.logger.log(`Calling getOrCreateAuthor("${name}")`);
    return this.getOrCreateAuthorUseCase.execute(name);
  }
}
