import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProductSearch() {
  return (
    <section className="rounded bg-slate-900 container mx-auto px-4 py-2">
      <Label htmlFor="productName" className="text-lg">
        Enter Product Name
      </Label>
      <div className="mt-5">
        <Input
          className="text-lg mt-2"
          placeholder="enter product name"
          type="text"
        />
      </div>
    </section>
  );
}
