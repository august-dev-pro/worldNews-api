import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSourceDto } from 'src/source/application/dtos/create-source.dto';
import { ISourceRepository } from 'src/source/application/interface/source.repository.interface';
import { Source } from 'src/source/domain/entitie/source.entity';
import { SourceMapper } from 'src/source/domain/mapper/source.mapper';

@Injectable()
export class SourceRepository implements ISourceRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sourceMapper: SourceMapper,
  ) {}
  findByUrl(url: string): Promise<Source | null> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Source | null> {
    const source = await this.prismaService.source.findUnique({
      where: { name },
    });
    return source ? this.sourceMapper.toDomain(source) : null;
  }

  async findById(id: string): Promise<Source | null> {
    const source = await this.prismaService.source.findUnique({
      where: { id },
    });
    return source ? this.sourceMapper.toDomain(source) : null;
  }

  async findAll(): Promise<Source[]> {
    const sources = await this.prismaService.source.findMany();
    return sources.map((source) => this.sourceMapper.toDomain(source));
  }

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const sourceData = this.sourceMapper.toPersistence(createSourceDto);
    const createdSource = await this.prismaService.source.create({
      data: sourceData,
    });
    return this.sourceMapper.toDomain(createdSource);
  }

  async update(
    id: string,
    updateSourceDto: Partial<CreateSourceDto>,
  ): Promise<Source> {
    const updateData = this.sourceMapper.toUpdatePersistence(updateSourceDto); // correction
    const updatedSource = await this.prismaService.source.update({
      where: { id },
      data: updateData,
    });
    return this.sourceMapper.toDomain(updatedSource);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.source.delete({ where: { id } });
  }
}
