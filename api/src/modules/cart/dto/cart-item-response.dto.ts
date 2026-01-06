import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../products/dto/product-response.dto';

/**
 * DTO for cart item response
 */
export class CartItemResponseDto {
  @ApiProperty({
    description: 'Cart item ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Cart ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  cartId: string;

  @ApiProperty({
    description: 'Product ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  productId: string;

  @ApiProperty({
    description: 'Quantity',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Product details',
    type: () => ProductResponseDto,
  })
  product: ProductResponseDto;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
