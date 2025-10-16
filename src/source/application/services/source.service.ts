import { Injectable, Logger } from '@nestjs/common';
import { CreateSourceDto } from '../dtos/create-source.dto';
import { UpdateSourceDto } from '../dtos/update-source.dto';
import { CreateSourceUseCase } from '../use-cases/create-source.use-case';
import { UpdateSourceUseCase } from '../use-cases/update-source.use-case';
import { FindSourceByIdUseCase } from '../use-cases/find-sourceById.use-case';
import { FindAllSourcesUseCase } from '../use-cases/find-allSources.use-case';
import { DeleteSourceUseCase } from '../use-cases/delete-source.use-case';
import { GetOrCreateSourceUseCase } from 'src/source/application/use-cases/get-or-create-source.usecase';

@Injectable()
export class SourceService {
  private readonly logger = new Logger(SourceService.name);

  constructor(
    private readonly createSourceUseCase: CreateSourceUseCase,
    private readonly updateSourceUseCase: UpdateSourceUseCase,
    private readonly findSourceByIdUseCase: FindSourceByIdUseCase,
    private readonly findAllSourcesUseCase: FindAllSourcesUseCase,
    private readonly deleteSourceUseCase: DeleteSourceUseCase,
    private readonly getOrCreateSourceUseCase: GetOrCreateSourceUseCase,
  ) {}

  async create(createSourceDto: CreateSourceDto) {
    return await this.createSourceUseCase.execute(createSourceDto);
  }

  async update(id: string, updateSourceDto: UpdateSourceDto) {
    return await this.updateSourceUseCase.execute(id, updateSourceDto);
  }

  async findById(id: string) {
    return await this.findSourceByIdUseCase.execute(id);
  }

  async findAll() {
    return await this.findAllSourcesUseCase.execute();
  }

  async delete(id: string) {
    return await this.deleteSourceUseCase.execute(id);
  }

  async getOrCreateSource(name: string): Promise<string> {
    this.logger.log(`Calling getOrCreateSource("${name}")`);
    return this.getOrCreateSourceUseCase.execute(name);
  }
}
