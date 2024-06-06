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
import { useProduct } from "@/app/Context/ProductState";

export default function ProductTable() {
  // @ts-ignore
  const { products, deleteProduct } = useProduct();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleSelectedProducts = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts?.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
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
            {products?.map((item: Product, index: number) => (
              <TableRow key={item?.id}>
                <TableCell>
                  <div className="flex gap-3">
                    <h1>{index + 1}</h1>
                    <Checkbox
                      onClick={() => toggleSelectedProducts(item?.id)}
                    />
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
                        onClick={() => deleteProduct(item?.id as string)}
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
