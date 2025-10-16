import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { Article } from 'src/article/domain/entitie/article.entity';

export interface IArticleRepository {
  findById(id: string): Promise<Article | null>;
  findAll(): Promise<Article[]>;
  create(createArticleDto: CreateArticleDto): Promise<Article>;
  update(
    id: string,
    updateArticleDto: Partial<CreateArticleDto>,
  ): Promise<Article>;
  delete(id: string): Promise<void>;
  findByCategory(categoryId: string): Promise<Article[]>;
  findBySource(sourceId: string): Promise<Article[]>;
  findByAuthor(authorId: string): Promise<Article[]>;
  existsSimilarArticle(data: {
    url?: string;
    title: string;
    content: string;
    source?: string;
  }): Promise<boolean>;
}
