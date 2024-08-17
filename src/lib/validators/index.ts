import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { cartItems } from '@/lib/db/schema/cart';
import { products } from '@/lib/db/schema/product';
import { discountCodes, userDiscounts } from '@/lib/db/schema/discount';

// Cart Items
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, createdAt: true, updatedAt: true });
export const updateCartItemSchema = z.object({
    quantity: z.number().int().positive(),
});

// Products
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export const selectProductSchema = createSelectSchema(products);

// Discount Codes
export const insertDiscountCodeSchema = createInsertSchema(discountCodes).omit({ id: true });

// User Discounts
export const insertUserDiscountSchema = createInsertSchema(userDiscounts).omit({ id: true });