import { Inject, Injectable } from '@nestjs/common';
import { CreateSourceDto } from 'src/source/application/dtos/create-source.dto';
import { ISourceRepository } from 'src/source/application/interface/source.repository.interface';

@Injectable()
export class CreateSourceUseCase {
  constructor(
    @Inject('ISourceRepository')
    private readonly sourceRepository: ISourceRepository,
  ) {}

  async execute(createSourceDto: CreateSourceDto) {
    return await this.sourceRepository.create(createSourceDto);
  }
}
