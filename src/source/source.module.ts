import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SourceController } from 'src/source/presentation/source.controller';
import { SourceMapper } from 'src/source/domain/mapper/source.mapper';
import { SourceRepository } from 'src/source/infrastructure/repositories/source.repository';
import { SourceService } from 'src/source/application/services/source.service';
import { CreateSourceUseCase } from './application/use-cases/create-source.use-case';
import { UpdateSourceUseCase } from './application/use-cases/update-source.use-case';
import { DeleteSourceUseCase } from './application/use-cases/delete-source.use-case';
import { FindAllSourcesUseCase } from './application/use-cases/find-allSources.use-case';
import { FindSourceByIdUseCase } from './application/use-cases/find-sourceById.use-case';
import { GetOrCreateSourceUseCase } from './application/use-cases/get-or-create-source.usecase';

@Module({
  imports: [],
  controllers: [SourceController],
  providers: [
    PrismaService,
    SourceService,
    // UseCases
    CreateSourceUseCase,
    UpdateSourceUseCase,
    DeleteSourceUseCase,
    FindAllSourcesUseCase,
    FindSourceByIdUseCase,
    GetOrCreateSourceUseCase,
    // Repositories
    {
      provide: 'ISourceRepository',
      useClass: SourceRepository,
    },
    // Mappers
    SourceMapper,
  ],
  exports: [SourceService],
})
export class SourceModule {}
