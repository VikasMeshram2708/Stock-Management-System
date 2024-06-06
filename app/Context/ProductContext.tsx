import { ProductSchemaType } from "@/models/ProductSchema";
import { createContext } from "react";

interface ProductProps {
  products: Product[];
  deleteProduct: (productId: string) => Promise<any>;
  addProduct: (productData: ProductSchemaType) => Promise<void>;
}
export const ProductContext = createContext<ProductProps | null>(null);
