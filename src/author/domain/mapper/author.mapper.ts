import { Injectable } from '@nestjs/common';
import { Author as PrismaAuthor } from '@prisma/client';
import { CreateAuthorDto } from 'src/author/application/dtos/create-author.dto';
import { Author } from '../entity/author.entity';

@Injectable()
export class AuthorMapper {
  toDomain(author: PrismaAuthor): Author {
    return new Author(
      author.id,
      author.name,
      author.email,
      author.createdAt,
      author.updatedAt,
    );
  }

  toPersistence(createAuthorDto: CreateAuthorDto): any {
    return {
      name: createAuthorDto.name,
      email: createAuthorDto.email,
    };
  }

  toUpdatePersistence(updateAuthorDto: any): any {
    const updateData: any = {};
    if (updateAuthorDto.name) updateData.name = updateAuthorDto.name;
    if (updateAuthorDto.email) updateData.email = updateAuthorDto.email;
    return updateData;
  }
}
