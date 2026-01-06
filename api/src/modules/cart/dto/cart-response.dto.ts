import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponseDto } from './cart-item-response.dto';

/**
 * DTO for cart response
 */
export class CartResponseDto {
  @ApiProperty({
    description: 'Cart ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'Cart items',
    type: [CartItemResponseDto],
  })
  cartItems: CartItemResponseDto[];

  @ApiProperty({
    description: 'Total cart value',
    example: 299.97,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'Total items count',
    example: 3,
  })
  totalItems: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
