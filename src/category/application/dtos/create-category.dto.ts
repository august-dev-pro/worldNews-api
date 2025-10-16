import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Technologie' })
  name: string;

  @ApiProperty({ example: 'Articles liés à la technologie', required: false })
  description?: string;
}
