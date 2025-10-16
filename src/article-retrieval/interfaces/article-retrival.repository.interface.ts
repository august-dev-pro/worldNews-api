import { ApiExterneDto } from '../dtos/api-externe.dto';

export interface IArticleRetrivalRepository {
  fetchArticlesFromApi(): Promise<any[]>;
}
