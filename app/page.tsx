import ProductSearch from "@/components/ProductSearch";
import ProductTable from "@/components/ProductTable";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ProductSearch */}
      <div className="mt-10">
        <ProductSearch />
      </div>

      {/* Product Table */}
      <div className="mt-10">
        <ProductTable />
      </div>
    </main>
  );
}
