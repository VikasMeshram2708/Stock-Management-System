"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const queryClient = useQueryClient();
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
  });

  const productMutation = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/product/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        });
        return res.json();
      } catch (error) {
        console.log(
          `Something went wrong. Failed to Mutate the Product Form. ${error}`
        );
      }
    },
    onSuccess: () => {
      const { name, category, description, price } = productDetails;
      if (!name || !category || !description || !price) {
        return toast.error("Please Enter the Value");
      }
      setProductDetails({
        name: "",
        description: "",
        category: "",
        price: 0,
      });
      toast.success("Product Added.");
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
    onError: (error) => {
      return toast.error("Failed to Add Product.");
    },
  });

  return (
    <section className="container mx-auto">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => productMutation.mutate(e)}
        className="grid gap-5 rounded shadow border mt-10 p-4"
        action=""
      >
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">Enter Product Name</h2>
          <Input
            value={productDetails?.name}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                name: e?.target?.value,
              })
            }
            type="text"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">Enter Product Description</h2>
          <Input
            value={productDetails?.description}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                description: e?.target?.value,
              })
            }
            type="text"
            placeholder="Enter Product Description"
          />
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">Enter Product Price</h2>
          <Input
            value={productDetails?.price}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                price: +e?.target?.value,
              })
            }
            type="number"
            placeholder="Enter Price"
          />
        </div>
        <div className="">
          <h2 className="text-lg font-semibold">Select Product Category</h2>
          <Select
            value={productDetails?.category}
            onValueChange={(value) =>
              setProductDetails({
                ...productDetails,
                category: value,
              })
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full shadow rounded font-semibold"
          variant={"secondary"}
        >
          Add Product
        </Button>
      </form>
    </section>
  );
}
