import { Module } from '@nestjs/common';
import { AuthorService } from './infrastructure/services/author.service';
import { GetOrCreateAuthorUseCase } from './application/use-cases/get-or-create-author.usecase';
import { AuthorRepository } from './infrastructure/repositories/author.repository';
import { AuthorMapper } from './domain/mapper/author.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    AuthorService,
    GetOrCreateAuthorUseCase,
    AuthorRepository,
    AuthorMapper,
    PrismaService,
    {
      provide: 'IAuthorRepository',
      useClass: AuthorRepository,
    },
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
