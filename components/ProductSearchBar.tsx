"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useProduct } from "@/app/Context/ProductState";
import useDebounce from "@/lib/useDebounce";
import { Product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ProductSearchBar() {
  const { products } = useProduct();
  const [productName, setProductName] = useState("");
  const [newProduct, setNewProduct] = useState<Product>();
  const debounceProductName = useDebounce(1500, productName);

  useEffect(() => {
    if (products.length < 0) return;

    const filteredProducts = products?.filter((item) =>
      item?.name.toLowerCase().includes(debounceProductName.toLowerCase())
    );

    setNewProduct(filteredProducts[0]);

  }, [debounceProductName, products]);

  return (
    <section className="container mx-auto">
      <form action="" className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Search Product</h2>
        <Input
          value={productName}
          onChange={(e) => setProductName(e?.target?.value)}
          className="shadow text-lg rounded"
          type="text"
          placeholder="Enter Product Name"
        />
      </form>
      {productName?.length ? (
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="capitalize">{newProduct?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="capitalize text-sm">{newProduct?.category}</p>
            <p className="capitalize text-sm">{newProduct?.description}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm">$ {newProduct?.price}</p>
          </CardFooter>
        </Card>
      ) : (
        ""
      )}
    </section>
  );
}
