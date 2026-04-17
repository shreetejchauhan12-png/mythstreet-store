"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts, Product } from "@/app/data/products";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // ✅ STATE
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ FETCH DATA
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // ✅ FILTER PRODUCTS BY CATEGORY
  const categoryProducts = products.filter(
    (p) => p.category === category
  );

  // ✅ UNIQUE TYPES
  const types: string[] = Array.from(
    new Set(categoryProducts.map((p) => p.type))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {category}
      </h1>

      {/* tabs */}
      <div className="flex gap-4 mb-8 border-b pb-3 overflow-x-auto">

        <Link
          href={`/shop/${category}`}
          className="font-medium whitespace-nowrap border-b-2 border-[#680000] pb-1"
        >
          All
        </Link>

        {types.map((type) => (
          <Link
            key={type}
            href={`/shop/${category}/${type}`}
            className="capitalize text-gray-600 hover:text-black whitespace-nowrap"
          >
            {type}
          </Link>
        ))}

      </div>

      <p className="text-sm text-gray-500 mb-6">
        {categoryProducts.length} products
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <img src={product.image} className="w-full" />
          </Link>
        ))}
      </div>

    </main>
  );
}