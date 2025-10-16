import { Injectable, Logger } from '@nestjs/common';
import { GetOrCreateSourceUseCase } from 'src/source/application/use-cases/get-or-create-source.usecase';

@Injectable()
export class SourceService {
  private readonly logger = new Logger(SourceService.name);

  constructor(
    private readonly getOrCreateSourceUseCase: GetOrCreateSourceUseCase,
  ) {}

  async getOrCreateSource(name: string): Promise<string> {
    this.logger.log(`Calling getOrCreateSource("${name}")`);
    return this.getOrCreateSourceUseCase.execute(name);
  }
}
