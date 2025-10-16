import { Injectable } from '@nestjs/common';
import { Comment as PrismaComment } from '@prisma/client';
import { CreateCommentDto } from 'src/comment/application/dtos/create-comment.dto';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentMapper {
  toDomain(comment: PrismaComment): Comment {
    return new Comment(
      comment.id,
      comment.content,
      comment.userId,
      comment.articleId,
      comment.createdAt,
      comment.updatedAt,
    );
  }

  toPersistence(createCommentDto: CreateCommentDto): any {
    return {
      content: createCommentDto.content,
      userId: createCommentDto.userId,
      articleId: createCommentDto.articleId,
    };
  }

  toUpdatePersistence(updateCommentDto: any): any {
    const updateData: any = {};
    if (updateCommentDto.content) updateData.content = updateCommentDto.content;
    return updateData;
  }
}
