import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ArticleService } from 'src/article/application/services/article.service';
import { CreateArticleDto } from 'src/article/application/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/article/application/dtos/update-article.dto';
import { Article } from 'src/article/domain/entitie/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({
    status: 201,
    description: 'Article successfully created',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return await this.articleService.create(createArticleDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiParam({ name: 'id', type: String, description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article successfully updated',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    try {
      return await this.articleService.update(id, updateArticleDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article found',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  async findById(@Param('id') id: string) {
    try {
      return await this.articleService.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Article not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async delete(@Param('id') id: string) {
    try {
      return await this.articleService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error deleting article',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/by-category/:categoryId')
  @ApiOperation({ summary: 'Get articles by category' })
  @ApiParam({ name: 'categoryId', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Articles found',
    type: Article,
    isArray: true,
  })
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.articleService.findByCategory(categoryId);
  }

  @Get('/by-source/:sourceId')
  @ApiOperation({ summary: 'Get articles by source' })
  @ApiParam({ name: 'sourceId', type: String, description: 'Source ID' })
  @ApiResponse({
    status: 200,
    description: 'Articles found',
    type: Article,
    isArray: true,
  })
  async findBySource(@Param('sourceId') sourceId: string) {
    return await this.articleService.findBySource(sourceId);
  }

  @Get('/by-author/:authorId')
  @ApiOperation({ summary: 'Get articles by author' })
  @ApiParam({ name: 'authorId', type: String, description: 'Author ID' })
  @ApiResponse({
    status: 200,
    description: 'Articles found',
    type: Article,
    isArray: true,
  })
  async findByAuthor(@Param('authorId') authorId: string) {
    return await this.articleService.findByAuthor(authorId);
  }

  @Get()
  @ApiOperation({ summary: 'Get articles list' })
  @ApiResponse({
    status: 200,
    description: 'Articles found',
    type: [Article],
    isArray: true,
  })
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAll();
  }
}
