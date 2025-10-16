import { CreateCommentDto } from 'src/comment/application/dtos/create-comment.dto';
import { Comment } from 'src/comment/domain/entity/comment.entity';

export interface ICommentRepository {
  findById(id: string): Promise<Comment | null>;
  findAllByArticle(articleId: string): Promise<Comment[]>;
  create(createCommentDto: CreateCommentDto): Promise<Comment>;
  update(
    id: string,
    updateCommentDto: Partial<CreateCommentDto>,
  ): Promise<Comment>;
  delete(id: string): Promise<void>;
}
