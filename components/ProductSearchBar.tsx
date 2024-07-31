"use client";

import { useState } from "react";
import { Input } from "./ui/input";

export default function ProductSearchBar() {
  const [productName, setProductName] = useState("");

  return (
    <section className="container mx-auto">
      <form action="">
        <h2 className="text-sm font-semibold mb-3">Enter Product Name</h2>
        <Input
          value={productName}
          onChange={(e) => setProductName(e?.target?.value)}
          className="shadow text-lg rounded"
          type="text"
          placeholder="Enter Product Name"
        />
      </form>
    </section>
  );
}
