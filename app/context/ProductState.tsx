"use client";

import { ReactNode, useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import { productSchema } from "@/schema/Product";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";

export const ProductState = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const GetAllProducts = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      const response = await fetch("/api/allproducts");
      const result = await response.json();
      if (!response.ok) {
        return alert(result?.message);
      }
      setAllProducts(result?.data);
      return result?.data;
    },
  });

  const AddProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (productData: ProductDetailsProp) => {
      try {
        productSchema.parse(productData);
        const response = await fetch("/api/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
        const result = await response.json();
        if (!response.ok) {
          return alert(result?.message);
        }
        return alert(result?.message);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ProductContext.Provider
        value={{ AddProductMutation, GetAllProducts, allProducts }}
      >
        {children}
      </ProductContext.Provider>
    </QueryClientProvider>
  );
};

export const useProduct = () => {
  const product = useContext(ProductContext);
  if (!product) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return product;
};
