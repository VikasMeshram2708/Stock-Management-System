import { Category } from "@prisma/client";
import * as z from "zod";

const categoryEnum = z.nativeEnum(Category);

export const productSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(100, {
      message: "Title must be at most 100 characters",
    }),
  price: z
    .number()
    .max(99999, {
      message: "Price must be at most 99999",
    })
    .min(99, {
      message: "Price must be at least 99",
    }),
  category: categoryEnum,
});

export type productSchemaType = z.infer<typeof productSchema>;
