import { Injectable } from '@nestjs/common';
import { Article as PrismaArticle } from '@prisma/client';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { Article } from '../entitie/article.entity';

@Injectable()
export class ArticleMapper {
  // Convertir Prisma en entité Domain
  toDomain(article: PrismaArticle): Article {
    return new Article(
      article.id,
      article.title,
      article.content,
      article.url,
      article.imageUrl,
      article.sourceId,
      article.categoryId,
      article.authorId,
      article.language,
      article.sentiment,
      article.createdAt,
      article.updatedAt,
    );
  }

  // Convertir CreateArticleDto en persistance
  toPersistence(createArticleDto: CreateArticleDto): any {
    return {
      title: createArticleDto.title,
      content: createArticleDto.content,
      url: createArticleDto.url,
      imageUrl: createArticleDto.imageUrl,
      sourceId: createArticleDto.sourceId,
      categoryId: createArticleDto.categoryId,
      authorId: createArticleDto.authorId,
      language: createArticleDto.language,
      sentiment: createArticleDto.sentiment,
    };
  }

  // Conversion pour mise à jour
  toUpdatePersistence(updateArticleDto: any): any {
    const updateData: any = {};
    Object.keys(updateArticleDto).forEach((key) => {
      if (updateArticleDto[key] !== undefined) {
        updateData[key] = updateArticleDto[key];
      }
    });
    return updateData;
  }
}
