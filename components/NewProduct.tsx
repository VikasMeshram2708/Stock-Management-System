"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useProduct } from "@/app/Context/ProductState";

export default function NewProduct() {
  // @ts-ignore
  const { addProduct } = useProduct();

  const [productData, setProductData] = useState({
    name: "",
    price: 100,
    category: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setProductData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(productData);
    const data = {
      name: productData?.name,
      price: +productData?.price,
      category: productData?.category,
    };
    addProduct(data);
    setProductData({
      name: "",
      price: 100,
      category: "",
    });
  };

  return (
    <section className="container mx-auto bg-slate-900 px-8 py-6 rounded-md my-10">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label
            className="block text-lg font-medium text-gray-300 mb-1"
            htmlFor="productName"
          >
            Product Name
          </label>
          <Input
            id="productName"
            name="name"
            type="text"
            value={productData.name}
            onChange={handleInputChange}
            className="text-lg px-3 py-2 border rounded-md"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-300 mb-1"
            htmlFor="productPrice"
          >
            Product Price
          </label>

          <Input
            id="productPrice"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            className="text-lg px-3 py-2 border rounded-md"
            placeholder="Enter product price"
          />
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-300 mb-1"
            htmlFor="productCategory"
          >
            Product Category
          </label>

          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger
              id="productCategory"
              className="text-lg px-3 py-2 border rounded-md"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-lg">
                <SelectLabel>Product Category</SelectLabel>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
}
