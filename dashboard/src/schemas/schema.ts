// src/types/schema.ts
import { z } from 'zod';

// Creating an item
export const CreateItemSchema = z.object({
  item_name: z.string().min(1, "Item name is required").max(100),
  item_color: z.string().min(1, "Item color is required").max(50),
  item_size: z.string().min(1, "Item size is required").max(20),
  item_quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  item_sku: z.string().min(1, "SKU is required").max(50),
});

// Updating an item
export const UpdateItemSchema = z.object({
  item_id: z.number().int().nonnegative("Item ID must be a non-negative integer"),
  item_name: z.string().min(1, "Item name is required").max(100).optional(),
  item_color: z.string().min(1, "Item color is required").max(50).optional(),
  item_size: z.string().min(1, "Item size is required").max(20).optional(),
  item_quantity: z.number().int().nonnegative("Quantity must be a non-negative integer").optional(),
  item_sku: z.string().min(1, "SKU is required").max(50).optional(),
});

// Infer TypeScript types from the schemas
export type CreateItemInput = z.infer<typeof CreateItemSchema>;
export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
