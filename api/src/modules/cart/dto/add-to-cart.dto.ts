import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for adding items to cart
 */
export class AddToCartDto {
  @ApiProperty({
    description: 'Product ID to add to cart',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Quantity of product',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
