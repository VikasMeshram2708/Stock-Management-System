"use client";

import { useProduct } from "@/app/context/ProductState";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ProductForm() {
  const { AddProductMutation } = useProduct();
  const [productDetails, setProductDetails] = useState<ProductDetailsProp>({
    title: "",
    price: 99,
    category: "Electronics",
  });

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AddProductMutation.mutateAsync(productDetails);
      console.log(productDetails);
      setProductDetails({
        title: "",
        price: 99,
        category: "Electronics",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto">
      <form
        onSubmit={handleForm}
        className="p-5 bg-base-300 grid gap-4 rounded"
      >
        <label htmlFor="title" className="label-text text-xl font-semibold">
          Add Product
        </label>
        <input
          value={productDetails.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProductDetails((prev) => ({
              ...prev,
              title: e?.target?.value,
            }))
          }
          type="text"
          placeholder="enter product"
          className="text-lg rounded-md w-full input input-bordered"
        />
        <input
          value={productDetails.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProductDetails((prev) => ({
              ...prev,
              price: parseInt(e?.target?.value),
            }))
          }
          type="number"
          placeholder="enter price"
          className="text-lg rounded-md w-full input input-bordered"
        />
        <select
          className="cursor-pointer p-2 input input-bordered"
          value={productDetails.category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setProductDetails((prev) => ({
              ...prev,
              category: e?.target?.value,
            }));
          }}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Food">Food</option>
          <option value="Furniture">Furniture</option>
          <option value="Kitchen">Kitchen</option>
        </select>
        <button type="submit" className="btn btn-outline">
          Add Product
        </button>
      </form>
    </section>
  );
}
