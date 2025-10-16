import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ApiParam {
  @ApiProperty({ example: 'category', description: 'Nom du paramètre' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'technology', description: 'Valeur du paramètre' })
  @IsString()
  value: string;
}

export class ApiExterneDto {
  @ApiProperty({
    example: 'https://techcrunch.com',
    description: 'API base URL',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({
    example: 'API_KEY_HERE',
    description: 'API key (optionnelle)',
  })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional({
    type: [ApiParam],
    description: "Liste des paramètres API sous forme 'clé=valeur'",
  })
  @IsOptional()
  // @IsArray()
  params?: [ApiParam];
}
