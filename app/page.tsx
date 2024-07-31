import AddProductForm from "@/components/AddProductForm";
import ProductSearchBar from "@/components/ProductSearchBar";
import { ProductTable } from "@/components/ProductTable";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* SearchBar */}
      <ProductSearchBar />
      {/* Add Product Form */}
      <AddProductForm />
      {/* Product Table */}
      <ProductTable />
    </main>
  );
}
