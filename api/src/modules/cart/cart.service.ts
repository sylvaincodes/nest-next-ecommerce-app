import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get or create active cart
   */
  async getOrCreateCart(userId: string): Promise<CartResponseDto> {
    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Add item to cart
   */
  async addToCart(
    userId: string,
    addToCartDto: AddToCartDto,
  ): Promise<CartResponseDto> {
    const { productId, quantity } = addToCartDto;

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (!product.isActive)
      throw new BadRequestException('Product is not available');
    if (product.stock < quantity)
      throw new BadRequestException(
        `Insufficient stock. Available: ${product.stock}`,
      );

    const cart = await this.getOrCreateActiveCart(userId);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestException(
          `Insufficient stock. Available: ${product.stock}, Current in cart: ${existingItem.quantity}`,
        );
      }

      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    userId: string,
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartResponseDto> {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem || cartItem.cart.userId !== userId)
      throw new NotFoundException('Cart item not found');

    if (cartItem.product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${cartItem.product.stock}`,
      );
    }

    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Remove item
   */
  async removeFromCart(
    userId: string,
    cartItemId: string,
  ): Promise<CartResponseDto> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId)
      throw new NotFoundException('Cart item not found');

    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Clear cart
   */
  async clearCart(userId: string): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId, checkedOut: false },
    });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Merge guest cart into active cart
   */
  async mergeCart(
    userId: string,
    items: { productId: string; quantity: number }[],
  ): Promise<CartResponseDto> {
    if (!items || items.length === 0) {
      return this.getOrCreateActiveCart(userId);
    }

    for (const item of items) {
      try {
        await this.addToCart(userId, {
          productId: item.productId,
          quantity: item.quantity,
        });
      } catch (err) {
        console.warn(
          `[CartService] Failed to merge item ${item.productId}:`,
          err.message,
        );
      }
    }

    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Format cart
   */
  private formatCart(cart: any): CartResponseDto {
    const cartItems: CartItemResponseDto[] = cart.cartItems.map(
      (item: any) => ({
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      id: cart.id,
      userId: cart.userId,
      cartItems,
      totalPrice,
      totalItems,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  /**
   * Get or create active (non-checked-out) cart
   */
  async getOrCreateActiveCart(userId: string) {
    let cart = await this.prisma.cart.findFirst({
      where: { userId, checkedOut: false },
      include: {
        cartItems: { include: { product: true } },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          cartItems: { include: { product: true } },
        },
      });
    }

    return this.formatCart(cart);
  }
}
