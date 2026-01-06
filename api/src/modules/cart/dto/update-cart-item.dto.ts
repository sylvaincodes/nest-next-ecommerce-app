import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for updating cart item quantity
 */
export class UpdateCartItemDto {
  @ApiProperty({
    description: 'New quantity for cart item',
    example: 3,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
