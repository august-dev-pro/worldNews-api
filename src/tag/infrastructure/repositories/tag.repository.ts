import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from 'src/tag/application/dtos/create-tag.dto';
import { ITagRepository } from 'src/tag/application/interface/tag.repository.interface';
import { Tag } from 'src/tag/domain/entity/tag.entity';
import { TagMapper } from 'src/tag/domain/mapper/tag.mapper';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagMapper: TagMapper,
  ) {}
  findByName(name: string): Promise<Tag | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prismaService.tag.findUnique({ where: { id } });
    return tag ? this.tagMapper.toDomain(tag) : null;
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.prismaService.tag.findMany();
    return tags.map((tag) => this.tagMapper.toDomain(tag));
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tagData = this.tagMapper.toPersistence(createTagDto);
    const createdTag = await this.prismaService.tag.create({ data: tagData });
    return this.tagMapper.toDomain(createdTag);
  }

  async update(id: string, updateTagDto: Partial<CreateTagDto>): Promise<Tag> {
    const updateData = this.tagMapper.toUpdatePersistence(updateTagDto); // correction
    const updatedTag = await this.prismaService.tag.update({
      where: { id },
      data: updateData,
    });
    return this.tagMapper.toDomain(updatedTag);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.tag.delete({ where: { id } });
  }
}
