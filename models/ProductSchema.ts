import * as z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be longer than 2 characters.",
    })
    .max(100, {
      message: "Product name must not be greater than 100 characters.",
    }),
  price: z
    .number()
    .min(100, {
      message: "Price must be longer than ₹100.",
    })
    .max(99999, {
      message: "Price must not be longer than ₹99999.",
    }),
  category: z.string(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>