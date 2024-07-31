"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProductForm() {
  return (
    <section className="container mx-auto">
      <form className="grid gap-5 rounded shadow border mt-10 p-4" action="">
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">Enter Product Name</h2>
          <Input type="text" placeholder="Enter Product Name" />
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">Enter Product Description</h2>
          <Input type="text" placeholder="Enter Product Description" />
        </div>
        <div className="">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Product Category" />
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
          className="w-full shadow rounded font-semibold"
          variant={"secondary"}
        >
          Add Product
        </Button>
      </form>
    </section>
  );
}
