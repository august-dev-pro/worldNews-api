import { Injectable, Logger, Inject } from '@nestjs/common';
import { ISourceRepository } from '../interface/source.repository.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GetOrCreateSourceUseCase {
  private readonly logger = new Logger(GetOrCreateSourceUseCase.name);

  constructor(
    @Inject('ISourceRepository')
    private readonly sourceRepository: ISourceRepository,
  ) {}

  async execute(name: string, url?: string): Promise<string> {
    this.logger.log(`Looking for source: "${name}"`);
    let source = await this.sourceRepository.findByName(name);
    if (source) {
      this.logger.log(`Source "${name}" found with ID: ${source.getId()}`);
      return source.getId();
    }
    this.logger.log(`Source "${name}" not found. Creating...`);
    try {
      source = await this.sourceRepository.create({ name, url });
      this.logger.log(`Source "${name}" created with ID: ${source.getId()}`);
      return source.getId();
    } catch (error) {
      // Gestion de la concurrence
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        this.logger.warn(
          `Conflit d'unicité lors de la création de la source "${name}", récupération de l'existante...`,
        );
        source = await this.sourceRepository.findByName(name);
        if (source) return source.getId();
      }
      this.logger.error(
        `Failed to get or create source "${name}"`,
        error.message,
      );
      throw error;
    }
  }
}
