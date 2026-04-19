"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";

// ✅ SAFE BASE URL
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${BASE_URL}/api/products`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("❌ API FAILED:", res.status);
          setProducts([]);
          return;
        }

        const data = await res.json();

        const clean = Array.isArray(data) ? data : [];

// ✅ sort by latest (using created_at from your backend)
const sorted = clean.sort(
  (a, b) =>
    new Date(b.created_at || b.createdAt).getTime() -
    new Date(a.created_at || a.createdAt).getTime()
);

// ✅ take only latest 8
setProducts(sorted.slice(0, 8));
      } catch (error) {
        console.error("❌ FETCH ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          New Arrivals
        </h2>
      </div>

      {loading && (
        <p className="text-center text-gray-500">
          Loading products...
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
  key={product.id}
  product={{
    ...product,

    image: `/p${product.id}.jpg`,
    hoverLeft: `/p${product.id}-left.jpg`,
    hoverRight: `/p${product.id}-right.jpg`,
  }}
/>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}
    </section>
  );
}