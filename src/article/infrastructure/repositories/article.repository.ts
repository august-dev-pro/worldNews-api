import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { IArticleRepository } from 'src/article/application/interface/article.repository.interface';
import { Article } from 'src/article/domain/entitie/article.entity';
import { ArticleMapper } from 'src/article/domain/mapper/article.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleRepository implements IArticleRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly articleMapper: ArticleMapper,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const articleData = this.articleMapper.toPersistence(createArticleDto);
    const createdArticle = await this.prisma.article.create({
      data: articleData,
    });
    return this.articleMapper.toDomain(createdArticle);
  }

  async update(
    articleId: string,
    updateArticleDto: /* UpdateArticleDto */ any,
  ): Promise<Article> {
    const updateData = this.articleMapper.toUpdatePersistence(updateArticleDto);
    const updatedArticle = await this.prisma.article.update({
      where: { id: articleId },
      data: updateData,
    });
    return this.articleMapper.toDomain(updatedArticle);
  }

  async delete(articleId: string): Promise<void> {
    await this.prisma.article.delete({
      where: { id: articleId },
    });
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany();

    return articles.map((article) => this.articleMapper.toDomain(article));
  }

  async findById(articleId: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      throw new Error(`Article with id ${articleId} not found`);
    }
    return this.articleMapper.toDomain(article);
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: { categoryId },
    });
    return articles.map((article) => this.articleMapper.toDomain(article));
  }

  async findBySource(sourceId: string): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: { sourceId },
    });
    return articles.map((article) => this.articleMapper.toDomain(article));
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: { authorId },
    });
    return articles.map((article) => this.articleMapper.toDomain(article));
  }

  async existsSimilarArticle(data: {
    url?: string;
    title: string;
    content: string;
    source?: string;
  }): Promise<boolean> {
    // 1. Vérifier par URL
    if (data.url) {
      const existingByUrl = await this.prisma.article.findUnique({
        where: { url: data.url },
      });
      if (existingByUrl) return true;
    }

    // 2. Vérifier par titre + début du contenu (+ source si fournie)
    const existing = await this.prisma.article.findFirst({
      where: {
        AND: [
          { title: { contains: data.title, mode: 'insensitive' } },
          {
            content: {
              startsWith: data.content.slice(0, 100),
              mode: 'insensitive',
            },
          },
          data.source
            ? {
                source: {
                  is: {
                    name: { equals: 'Nom', mode: 'insensitive' },
                  },
                },
              }
            : {},
        ],
      },
    });

    return !!existing;
  }
}
