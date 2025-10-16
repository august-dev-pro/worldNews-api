import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISourceRepository } from 'src/source/application/interface/source.repository.interface';

@Injectable()
export class FindSourceByIdUseCase {
  constructor(
    @Inject('ISourceRepository')
    private readonly sourceRepository: ISourceRepository,
  ) {}

  async execute(id: string) {
    const source = await this.sourceRepository.findById(id);
    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
    return source;
  }
}
