// DTO for category response

import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: '550e484-ere8458454-45erer4844858',
    description: 'The unique identifier of the category',
  })
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 'Devices and gadgets including phones, laptops, and accessories',
    description: 'A brief description of the category',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: 'electronics',
    description: 'The URL-friendly slug for the category',
    nullable: true,
  })
  slug: string | null;

  @ApiProperty({
    example: 'https://example.com/images/electronics.png',
    description: 'URL of the category image',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    example: true,
    description: 'Indicates if the category is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: 150,
    description: 'Number of products in this category',
  })
  productCount: number;

  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    description: 'The date and time when the category was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-10T15:30:00Z',
    description: 'The date and time when the category was last updated',
  })
  updatedAt: Date;
}
