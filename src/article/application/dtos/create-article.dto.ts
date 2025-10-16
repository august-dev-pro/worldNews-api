import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SourceDto {
  @ApiProperty({ example: 'TechCrunch' })
  name: string;

  @ApiProperty({ example: 'https://techcrunch.com' })
  @IsOptional()
  url?: string;

  @ApiProperty({
    example: 'https://cdn.techcrunch.com/logo.png',
    required: false,
  })
  @IsOptional()
  logoUrl?: string;
}

export class CreateArticleDto {
  @ApiProperty({ example: 'Titre de l’article' })
  title: string;

  @ApiProperty({ example: 'Contenu détaillé de l’article' })
  content: string;

  @ApiProperty({ example: 'https://newsapi.org/article' })
  url: string;

  @ApiProperty({ example: 'https://image-url.com/image.jpg', required: false })
  imageUrl?: string;

  @ApiProperty({ example: 'source-UID' })
  sourceId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  categoryId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  authorId?: string;

  @ApiProperty({ example: 'fr', required: false })
  @IsOptional()
  language?: string;

  @ApiProperty({ example: 'nalyse sentimentale via OpenAI', required: false })
  @IsOptional()
  sentiment?: string;

  @ApiProperty({ example: 'nalyse sentimentale via OpenAI', required: false })
  @IsOptional()
  publishedAt?: Date;
}
