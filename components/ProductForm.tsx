"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";

export default function ProductForm() {
  const [productName, setProductName] = useState("");

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(productName);
      setProductName("");
    } catch (error) {
      console.log(error);
    }
  };

  const formMutate = useMutation({
    mutationKey: ["addProductForm"],
    mutationFn: handleForm,
  });

  return (
    <section className="container mx-auto">
      <form
        onSubmit={formMutate.mutate}
        className="p-5 bg-base-300 grid gap-4 rounded"
      >
        <label htmlFor="title" className="label-text text-xl font-semibold">
          Add Product
        </label>
        <input
          value={productName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProductName(e?.target?.value)
          }
          type="text"
          placeholder="enter product"
          className="text-lg rounded-md w-full input input-bordered"
        />
        <button type="submit" className="btn btn-outline">
          Add Product
        </button>
      </form>
    </section>
  );
}
