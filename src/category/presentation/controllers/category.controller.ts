import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CategoryService } from 'src/category/application/services/category.service';
import { CreateCategoryDto } from 'src/category/application/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/category/application/dtos/update-category.dto';
import { Category } from 'src/category/domain/entitie/category.entity';

@ApiTags('Categories') // Swagger Tag pour organiser les endpoints
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category successfully updated',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.update(id, updateCategoryDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category found',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async findById(@Param('id') id: string) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Category not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'List of categories retrieved successfully',
    type: [Category],
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred while fetching categories',
  })
  async findAll() {
    const categories = await this.categoryService.findAll();

    // Si tu veux explicitement gérer le cas "vide"
    if (!categories || categories.length === 0) {
      return {
        message: 'No categories found',
        data: [],
      };
    }

    return categories;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async delete(@Param('id') id: string) {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error deleting category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
