import { CreateFavoriteDto } from 'src/favorite/application/dtos/create-favorite.dto';
import { Favorite } from 'src/favorite/domain/entity/favorite.entity';

export interface IFavoriteRepository {
  findAllByUser(userId: string): Promise<Favorite[]>;
  findByArticleAndUser(
    articleId: string,
    userId: string,
  ): Promise<Favorite | null>;
  create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
  delete(userId: string, articleId: string): Promise<void>;
}
