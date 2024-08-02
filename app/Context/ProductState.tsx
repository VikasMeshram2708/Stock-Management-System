"use client";

import { ReactNode, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { useQuery } from "@tanstack/react-query";

interface ProductStateProps {
  children: ReactNode;
}
export default function ProductState({ children }: ProductStateProps) {
  // const FetchProducts = async () => {
  //   try {
  //     const res = await fetch("/api/product/all");
  //     const result = await res.json();
  //     // console.log("resu", result?.products);
  //     return result?.products;
  //   } catch (error) {
  //     console.log(`Something went wrong. Failed to fetch products. ${error}`);
  //   }
  // };
  // const productQuery = useQuery({
  //   queryKey: ["product"],
  //   queryFn: () => FetchProducts(),
  // });
  const data = {
    name:"vikas"
  }

  return (
    <ProductContext.Provider value={{ data }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const product = useContext(ProductContext);
  if (!product) {
    throw new Error("useProduct must be wrapped in Product State.");
  }
  return product;
}
