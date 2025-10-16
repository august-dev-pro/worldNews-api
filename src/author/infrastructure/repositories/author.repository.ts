import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthorRepository } from '../../application/interface/author.repository.interface';
import { Author } from '../../domain/entity/author.entity';
import { AuthorMapper } from '../../domain/mapper/author.mapper';
import { CreateAuthorDto } from '../../application/dtos/create-author.dto';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authorMapper: AuthorMapper,
  ) {}
  findByEmail(email: string): Promise<Author | null> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Author | null> {
    const author = await this.prismaService.author.findFirst({
      where: { name },
    });
    return author ? this.authorMapper.toDomain(author) : null;
  }

  async findById(id: string): Promise<Author | null> {
    const author = await this.prismaService.author.findUnique({
      where: { id },
    });
    return author ? this.authorMapper.toDomain(author) : null;
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.prismaService.author.findMany();
    return authors.map((author) => this.authorMapper.toDomain(author));
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const authorData = this.authorMapper.toPersistence(createAuthorDto);
    const createdAuthor = await this.prismaService.author.create({
      data: authorData,
    });
    return this.authorMapper.toDomain(createdAuthor);
  }

  async update(
    id: string,
    updateAuthorDto: Partial<CreateAuthorDto>,
  ): Promise<Author> {
    const updateData = this.authorMapper.toUpdatePersistence(updateAuthorDto);
    const updatedAuthor = await this.prismaService.author.update({
      where: { id },
      data: updateData,
    });
    return this.authorMapper.toDomain(updatedAuthor);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.author.delete({ where: { id } });
  }
}
