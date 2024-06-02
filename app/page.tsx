import ProductSearch from "@/components/ProductSearch";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ProductSearch */}
      <div className="mt-10">
        <ProductSearch />
      </div>
      <h1>Hello,World!</h1>
    </main>
  );
}
