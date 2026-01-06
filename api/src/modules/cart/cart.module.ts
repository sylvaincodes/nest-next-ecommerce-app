import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../../prisma/prisma.module';

/**
 * Cart Module
 * Handles shopping cart and cart items management
 */
@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
