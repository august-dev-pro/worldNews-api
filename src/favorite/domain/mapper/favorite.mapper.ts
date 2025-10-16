import { Injectable } from '@nestjs/common';
import { Favorite as PrismaFavorite } from '@prisma/client';
import { CreateFavoriteDto } from 'src/favorite/application/dtos/create-favorite.dto';
import { Favorite } from '../entity/favorite.entity';

@Injectable()
export class FavoriteMapper {
  toDomain(favorite: PrismaFavorite): Favorite {
    return new Favorite(favorite.userId, favorite.articleId);
  }

  toPersistence(createFavoriteDto: CreateFavoriteDto): any {
    return {
      userId: createFavoriteDto.userId,
      articleId: createFavoriteDto.articleId,
    };
  }
}
