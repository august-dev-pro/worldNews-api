import { Inject, Injectable } from '@nestjs/common';
import { ISourceRepository } from 'src/source/application/interface/source.repository.interface';

@Injectable()
export class FindAllSourcesUseCase {
  constructor(
    @Inject('ISourceRepository')
    private readonly sourceRepository: ISourceRepository,
  ) {}

  async execute() {
    return await this.sourceRepository.findAll();
  }
}
