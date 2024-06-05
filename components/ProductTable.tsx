"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ProductHeaders, Products } from "@/seed/ProductDetails";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { IndianRupee } from "lucide-react";
import { useState } from "react";

export default function ProductTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelectedProducts = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts?.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDelete = (productId: number) => {
    try {
      const filteredProducts = Products?.filter(
        (item) => item?.id === productId
      );
      console.log(filteredProducts);
      return alert("product deleted");
      
    } catch (error) {
      console.error(`Something went wrong. Failed to delete the product.`);
    }
  };

  return (
    <section className="rounded bg-slate-900  container mx-auto">
      <div className="rounded">
        <Table>
          <TableHeader>
            <TableRow>
              {ProductHeaders?.map((item) => (
                <TableHead key={item?.id}>{item?.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Products?.map((item, index) => (
              <TableRow key={item?.id}>
                <TableCell>
                  <div className="flex gap-3">
                    <h1>{index + 1}</h1>
                    <Checkbox
                      onClick={() => toggleSelectedProducts(item?.id)}
                    />
                    {/* <Checkbox onClick={() => GetProductDetail(item?.id)} /> */}
                  </div>
                </TableCell>
                <TableCell>
                  <h1>{item?.productName}</h1>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>
                      <IndianRupee size={14} />
                    </span>
                    <p>{item?.productPrice}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <h1>{item?.productCategory}</h1>
                  {selectedProducts?.includes(item?.id) && (
                    <div className="mt-3 flex gap-3">
                      <Button>Edit</Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item?.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
