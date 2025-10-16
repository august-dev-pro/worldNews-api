import { ApiProperty } from '@nestjs/swagger';

export class CreateSourceDto {
  @ApiProperty({ example: 'TechCrunch' })
  name: string;

  @ApiProperty({ example: 'https://techcrunch.com' })
  url?: string;

  @ApiProperty({
    example: 'https://cdn.techcrunch.com/logo.png',
    required: false,
  })
  logoUrl?: string;
}
