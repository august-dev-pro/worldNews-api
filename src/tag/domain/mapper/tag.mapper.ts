import { Injectable } from '@nestjs/common';
import { Tag as PrismaTag } from '@prisma/client';
import { CreateTagDto } from 'src/tag/application/dtos/create-tag.dto';
import { Tag } from '../entity/tag.entity';

@Injectable()
export class TagMapper {
  toDomain(tag: PrismaTag): Tag {
    return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
  }

  toPersistence(createTagDto: CreateTagDto): any {
    return {
      name: createTagDto.name,
    };
  }

  toUpdatePersistence(updateTagDto: any): any {
    const updateData: any = {};
    if (updateTagDto.name) updateData.name = updateTagDto.name;
    return updateData;
  }
}
