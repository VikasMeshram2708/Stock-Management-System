"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { useProduct } from "@/app/Context/ProductState";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Product } from "@prisma/client";

export function ProductTable() {
  const queryClient = useQueryClient();

  const { products } = useProduct();
  const [uProduct, setUProduct] = useState<Partial<Product> | null>(null);
  const [checkValue, setCheckValue] = useState<{ [id: string]: boolean }>({});
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      try {
        const res = await fetch("/api/product/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });
        const result = await res.json();
        console.log("res", result);
        if (res.ok && result) {
          return toast.success("Product Deleted.");
        }
      } catch (error) {
        console.log(`Something went wrong. Failed to Delete Product ${error}`);
        toast.error("Failed to Delete Product.");
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["product"],
      }),
  });

  const toggleUpdate = (productId: string) => {
    if (editingProductId === productId) {
      setEditingProductId(null);
      setUProduct(null);
    } else {
      const product = products.find((item) => item.id === productId);
      if (product) {
        setUProduct(product);
        setEditingProductId(productId);
      }
    }
  };

  const handleCheckChange = (id: string) => {
    setCheckValue((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUProduct((prev) => {
      if (prev) {
        return {
          ...prev,
          [name]: name === "price" ? parseFloat(value) || 0 : value,
        };
      }
      return null;
    });
  };

  const handleConfirmUpdate = useMutation({
    mutationFn: async () => {
      try {
        // Implement the update logic here
        console.log("Updating product:", uProduct);
        setEditingProductId(null);
        setUProduct(null);
        // Add API call to update the product
        const res = await fetch("/api/product/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uProduct),
        });
        const result = await res.json();
        console.log("ur", result);
        if (res.ok && result) {
          return toast.success("Product Updated.");
        }
      } catch (error) {
        console.log(
          `Something went wrong. Failed to Update the Product. ${error}`
        );
        return toast.error("Failed to updated the Product.");
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  useEffect(() => {
    console.log("checkValues", checkValue);
  }, [checkValue]);

  if (!products.length) {
    return (
      <h1 className="text-2xl font-semibold text-center mt-10">
        No Products...
      </h1>
    );
  }

  return (
    <section className="container mx-auto">
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Index</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product?.id}>
              <TableCell className="font-medium">
                {/* <Checkbox
                  checked={checkValue[product?.id] || false}
                  onCheckedChange={() => handleCheckChange(product?.id)}
                /> */}
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize font-medium">
                {editingProductId === product?.id ? (
                  <Input
                    name="name"
                    placeholder="Product Name"
                    type="text"
                    value={uProduct?.name || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  product?.name
                )}
              </TableCell>
              <TableCell className="capitalize font-medium">
                {editingProductId === product?.id ? (
                  <Input
                    name="description"
                    placeholder="Description"
                    type="text"
                    value={uProduct?.description || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  product?.description
                )}
              </TableCell>
              <TableCell className="capitalize font-medium">
                {editingProductId === product?.id ? (
                  <Input
                    name="category"
                    placeholder="Category"
                    type="text"
                    value={uProduct?.category || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  product?.category
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingProductId === product?.id ? (
                  <Input
                    name="price"
                    placeholder="Price"
                    type="number"
                    value={uProduct?.price || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  `$ ${product?.price}`
                )}
              </TableCell>
              <TableCell>
                {editingProductId === product?.id ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleConfirmUpdate.mutate()}
                  >
                    Confirm
                  </Button>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => deleteMutation.mutate(product?.id)}
                      size={18}
                      color="red"
                    />
                    <Pencil
                      className="cursor-pointer"
                      size={18}
                      color="blue"
                      onClick={() => toggleUpdate(product?.id)}
                    />
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
