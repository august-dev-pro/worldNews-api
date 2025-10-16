import { Injectable } from '@nestjs/common';
import { Source as PrismaSource } from '@prisma/client';
import { Source } from '../entitie/source.entity';
import { CreateSourceDto } from 'src/source/application/dtos/create-source.dto';

@Injectable()
export class SourceMapper {
  toDomain(source: PrismaSource): Source {
    return new Source(
      source.id,
      source.name,
      source.url,
      source.logoUrl,
      source.createdAt,
      source.updatedAt,
    );
  }

  toPersistence(createSourceDto: CreateSourceDto): any {
    return {
      name: createSourceDto.name,
      url: createSourceDto.url,
      logoUrl: createSourceDto.logoUrl,
    };
  }

  toUpdatePersistence(updateSourceDto: any): any {
    const updateData: any = {};
    if (updateSourceDto.name) updateData.name = updateSourceDto.name;
    if (updateSourceDto.url) updateData.url = updateSourceDto.url;
    if (updateSourceDto.logoUrl) updateData.logoUrl = updateSourceDto.logoUrl;
    return updateData;
  }
}
