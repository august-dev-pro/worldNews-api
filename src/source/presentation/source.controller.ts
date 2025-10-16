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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SourceService } from 'src/source/application/services/source.service';
import { CreateSourceDto } from 'src/source/application/dtos/create-source.dto';
import { Source } from 'src/source/domain/entitie/source.entity';
import { UpdateSourceDto } from 'src/source/application/dtos/update-source.dto';

@ApiTags('Sources') // Swagger Tag pour organiser les endpoints dans Swagger
@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new source' })
  @ApiResponse({
    status: 201,
    description: 'Source successfully created',
    type: Source,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async create(@Body() createSourceDto: CreateSourceDto) {
    try {
      return await this.sourceService.create(createSourceDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating source',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing source' })
  @ApiParam({ name: 'id', type: String, description: 'Source ID' })
  @ApiResponse({
    status: 200,
    description: 'Source successfully updated',
    type: Source,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ) {
    try {
      return await this.sourceService.update(id, updateSourceDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating source',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a source by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Source ID' })
  @ApiResponse({
    status: 200,
    description: 'Source found',
    type: Source,
  })
  @ApiResponse({
    status: 404,
    description: 'Source not found',
  })
  async findById(@Param('id') id: string) {
    try {
      return await this.sourceService.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Source not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all sources' })
  @ApiResponse({
    status: 200,
    description: 'List of sources',
    type: [Source],
  })
  async findAll() {
    return await this.sourceService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a source by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Source ID' })
  @ApiResponse({
    status: 200,
    description: 'Source successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async delete(@Param('id') id: string) {
    try {
      return await this.sourceService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error deleting source',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
