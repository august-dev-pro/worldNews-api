import { CreateSourceDto } from 'src/source/application/dtos/create-source.dto';
import { Source } from 'src/source/domain/entitie/source.entity';

export interface ISourceRepository {
  findByName(name: string): Promise<Source | null>;
  findById(id: string): Promise<Source | null>;
  findAll(): Promise<Source[]>;
  create(createSourceDto: CreateSourceDto): Promise<Source>;
  update(
    id: string,
    updateSourceDto: Partial<CreateSourceDto>,
  ): Promise<Source>;
  delete(id: string): Promise<void>;
  findByUrl(url: string): Promise<Source | null>;
}
