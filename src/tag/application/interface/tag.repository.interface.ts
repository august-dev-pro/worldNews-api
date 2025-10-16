import { CreateTagDto } from 'src/tag/application/dtos/create-tag.dto';
import { Tag } from 'src/tag/domain/entity/tag.entity';

export interface ITagRepository {
  findById(id: string): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  create(createTagDto: CreateTagDto): Promise<Tag>;
  update(id: string, updateTagDto: Partial<CreateTagDto>): Promise<Tag>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Tag | null>;
}
