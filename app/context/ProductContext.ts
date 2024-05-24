"use client";
import { createContext } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

interface ProductProps {
  AddProductMutation: UseMutationResult<
    void,
    unknown,
    ProductDetailsProp,
    unknown
  >;
  GetAllProducts: UseQueryResult<any, unknown>;
  allProducts: Product[];
}
export const ProductContext = createContext<ProductProps | null>(null);
