import { CreateAuthorDto } from 'src/author/application/dtos/create-author.dto';
import { Author } from 'src/author/domain/entity/author.entity';

export interface IAuthorRepository {
  findById(id: string): Promise<Author | null>;
  findAll(): Promise<Author[]>;
  create(createAuthorDto: CreateAuthorDto): Promise<Author>;
  update(
    id: string,
    updateAuthorDto: Partial<CreateAuthorDto>,
  ): Promise<Author>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<Author | null>;
  findByName(name: string): Promise<Author | null>;
}
