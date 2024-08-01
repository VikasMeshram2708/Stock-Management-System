import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2).max(120),
  price: z.number().min(999).max(999999),
  description: z.string().min(2).max(250),
  category: z.string().min(2).max(120),
});

export type ProductSchema = z.infer<typeof ProductSchema>;

export const UpdateProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(120).optional(),
  price: z.number().min(999).max(999999).optional(),
  description: z.string().min(2).max(250).optional(),
  category: z.string().min(2).max(120).optional(),
});

export type UpdateProductSchema = z.infer<typeof UpdateProductSchema>;
