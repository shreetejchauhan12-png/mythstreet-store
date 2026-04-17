"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ui/ProductCard";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q")?.toLowerCase() || "";

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();

    const title = p.title.toLowerCase();
    const category = p.category.toLowerCase();
    const type = p.type.toLowerCase();
    const collection = p.collection.toLowerCase();

    return (
      title.includes(q) ||
      collection.includes(q) ||
      category === q ||
      type === q ||
      `${category} ${type}`.includes(q)
    );
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-xl font-semibold mb-6">
        Search: {query}
      </h1>

      {filtered.length === 0 && (
        <p className="text-gray-500">
          No products found
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  );
}