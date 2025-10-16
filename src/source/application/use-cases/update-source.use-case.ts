import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateSourceDto } from 'src/source/application/dtos/update-source.dto';
import { ISourceRepository } from 'src/source/application/interface/source.repository.interface';

@Injectable()
export class UpdateSourceUseCase {
  constructor(
    @Inject('ISourceRepository')
    private readonly sourceRepository: ISourceRepository,
  ) {}

  async execute(id: string, updateSourceDto: UpdateSourceDto) {
    const source = await this.sourceRepository.findById(id);
    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
    return await this.sourceRepository.update(id, updateSourceDto);
  }
}
