"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";

// ✅ SAFE BASE URL (fallback added)
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${BASE_URL}/api/products/new`);

        if (!res.ok) {
          console.error("❌ API FAILED:", res.status);
          setProducts([]);
          return;
        }

        const data = await res.json();

        // ✅ SAFETY CHECK
        const clean = Array.isArray(data) ? data : [];

        setProducts(clean);
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

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading products...
        </p>
      )}

      {/* PRODUCTS */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                hoverLeft: product.hover_left || product.image,
                hoverRight: product.hover_right || product.image,
              }}
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}
    </section>
  );
}