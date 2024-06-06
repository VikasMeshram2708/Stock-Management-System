"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { ProductSchema, ProductSchemaType } from "@/models/ProductSchema";

export const ProductState = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  //   Add Product
  const addProduct = async (productData: ProductSchemaType) => {
    try {
      // Sanitize the incoming data
      ProductSchema.parse(productData);

      //   Send the api request
      const response = await fetch("/api/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        return alert("failed to add the product.");
      }
      alert("product has been added to table.");
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(window.location.reload());
        }, 2000);
      });
    } catch (error) {
      console.error(`Something went wrong. Failed to add product: ${error}`);
    }
  };

  //   Delete Product
  const deleteProduct = async (productId: string) => {
    try {
      const res = await fetch("/api/deleteproduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await res.json();
      if (!res.ok) {
        return result?.message;
      }
      alert("Product has been Deleted.");
      new Promise((resolve) => {
        return resolve(
          setTimeout(() => {
            window.location.reload();
          }, 2000)
        );
      });
    } catch (error) {
      console.error(
        `Something went wrong. Failed to delete the product. : ${error}`
      );
    }
  };

  //   Fetch Products
  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const response = await fetch("/api/getproducts");
        const result = await response.json();
        if (!response.ok) {
          return console.log(result?.message);
        }
        setProducts(result?.data);
        return result?.data;
      } catch (error) {
        console.error(`Something went wrong. Please try again. :${error}`);
      }
    };

    GetAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, deleteProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const product = useContext(ProductContext);
  if (!product) {
    return new Error(
      "useProduct must be wrapped in the ProductState provider."
    );
  }

  return product;
};
