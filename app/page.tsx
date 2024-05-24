import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* SearchBar */}
      <div className="mt-10">
        <SearchBar />
      </div>
      {/* Products Form */}
      <div className="mt-10">
        <ProductForm />
      </div>
      {/* Products Table */}
      <div className="mt-10">
        <ProductTable />
      </div>
    </main>
  );
}
