"use client";
import { useProduct } from "@/app/context/ProductState";
import React from "react";

export default function ProductTable() {
  const { allProducts } = useProduct();
  return (
    <section className="min-h-screen container mx-auto">
      <div className="overflow-x-auto rounded bg-base-300">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((item, index) => (
              <tr key={item?.id}>
                <th>{index+1}</th>
                <th>{item?.title}</th>
                <th>{item?.price}</th>
                <th>{item?.category}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
