"use client";

import { useProduct } from "@/app/Context/ProductState";
import { Button } from "./ui/button";

export default function TotalProduct() {
  const { products } = useProduct();
  return <Button className="text-lg font-semibold">{products?.length}</Button>;
}
