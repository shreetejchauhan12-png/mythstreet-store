"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, Product } from "@/app/data/products";
import ProductCard from "@/app/components/ui/ProductCard";

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("q")?.toLowerCase() || "";

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

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
        <p className="text-gray-500">No products found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}