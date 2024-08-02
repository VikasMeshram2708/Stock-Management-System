import { createContext } from "react";
import { Product } from "@prisma/client";

interface ContextProps {
  products: Product[];
}
export const ProductContext = createContext<ContextProps | null>(null);
