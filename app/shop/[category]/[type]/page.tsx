"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { getProducts, Product } from "@/app/data/products";

export default function TypePage({
  params,
}: {
  params: Promise<{ category: string; type: string }>;
}) {
  const { category, type } = use(params);

  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");

  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("latest");
  const [price, setPrice] = useState(2000);

  // ✅ FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  let filteredProducts = products;

  // category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // type filter
  if (type !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.type === type
    );
  }

  // collection filter
  if (collection) {
    filteredProducts = filteredProducts.filter(
      (p) => p.collection === collection
    );
  }

  // price filter
  filteredProducts = filteredProducts.filter(
    (p) => p.price <= price
  );

  // sorting
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {collection ? collection : category}
      </h1>

      <div className="flex gap-4 mb-6 items-center">

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2"
        >
          <option value="latest">Latest</option>
          <option value="low">Price low-high</option>
          <option value="high">Price high-low</option>
        </select>

        <input
          type="range"
          min="0"
          max="2000"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-48"
        />

      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filteredProducts.length} products
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  );
}