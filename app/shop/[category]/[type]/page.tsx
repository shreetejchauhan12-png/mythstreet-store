"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { getProducts, Product } from "@/app/data/products";

export default function TypePage({
  params,
}: {
  params: Promise<{ category: string; type: string }>;
}) {
  const { category, type } = use(params);

  const router = useRouter();
  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");

  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("latest");
  const [price, setPrice] = useState(2000);

  // fetch products
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // ===== FILTER LOGIC (same as before) =====
  let filteredProducts = products;

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  if (type !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.type === type
    );
  }

  if (collection) {
    filteredProducts = filteredProducts.filter(
      (p) => p.collection === collection
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price <= price
  );

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

  // ===== UNIQUE FILTER VALUES =====
  const types = Array.from(new Set(products.map((p) => p.type)));
  const collections = Array.from(
    new Set(products.map((p) => p.collection))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-6">
        Welcome to Street Homie
      </h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="space-y-6 sticky top-24 h-fit">

          {/* CATEGORY */}
          <div>
            <h3 className="font-semibold mb-2 text-sm tracking-wide text-gray-700">Category</h3>
            <div className="flex flex-col gap-2 text-sm">

              <button
  onClick={() => router.push("/shop/men/all")}
  className={`text-left hover:text-black transition ${
    category === "men" ? "font-semibold text-black" : "text-gray-500"
  }`}
>
  Men
</button>

<button
  onClick={() => router.push("/shop/women/all")}
  className={`text-left hover:text-black transition ${
    category === "women" ? "font-semibold text-black" : "text-gray-500"
  }`}
>
  Women
</button>

            </div>
          </div>

          {/* TYPE */}
          <div>
            <h3 className="font-semibold mb-2 text-sm tracking-wide text-gray-700">Product Type</h3>
            <div className="flex flex-col gap-2 text-sm">

              <button
  onClick={() => router.push(`/shop/${category}/all`)}
  className={`text-left hover:text-black transition ${
    type === "all" ? "font-semibold text-black" : "text-gray-500"
  }`}
>
  All
</button>

              {types.map((t) => (
                <button
  key={t}
  onClick={() => router.push(`/shop/${category}/${t}`)}
  className={`capitalize text-left hover:text-black transition ${
    type === t ? "font-semibold text-black" : "text-gray-500"
  }`}
>
  {t}
</button>
              ))}

            </div>
          </div>

          {/* COLLECTION */}
          <div>
            <h3 className="font-semibold mb-2 text-sm tracking-wide text-gray-700">Collection</h3>
            <div className="flex flex-col gap-2 text-sm">

              {collections.map((c) => (
                <button
  key={c}
  onClick={() =>
    router.push(`/shop/${category}/${type}?collection=${c}`)
  }
  className={`capitalize text-left hover:text-black transition ${
    collection === c ? "font-semibold text-black" : "text-gray-500"
  }`}
>
  {c}
</button>
              ))}

            </div>
          </div>

          {/* PRICE */}
          <div>
            <h3 className="font-semibold mb-2 text-sm tracking-wide text-gray-700">Price</h3>

            <input
              type="range"
              min="0"
              max="2000"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
              className="w-full"
            />

            <p className="text-sm mt-1">Up to ₹{price}</p>
          </div>

        </aside>

        {/* ================= RIGHT SIDE ================= */}
        <div>
{/* FILTER CHIPS */}
<div className="flex gap-2 overflow-x-auto mb-6">

  <button
    onClick={() => router.push(`/shop/${category}/all`)}
    className={`px-4 py-1 border rounded-full text-sm whitespace-nowrap ${
      type === "all"
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    All
  </button>

  {types.map((t) => (
    <button
      key={t}
      onClick={() => router.push(`/shop/${category}/${t}`)}
      className={`px-4 py-1 border rounded-full text-sm whitespace-nowrap capitalize ${
        type === t
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {t}
    </button>
  ))}

</div>
          {/* SORT */}
          <div className="flex justify-between items-center mb-6">

            <p className="text-sm text-gray-500">
              {filteredProducts.length} products
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 text-sm"
            >
              <option value="latest">Latest</option>
              <option value="low">Price low-high</option>
              <option value="high">Price high-low</option>
            </select>

          </div>

          {/* GRID */}
          {filteredProducts.length === 0 ? (
  <div className="col-span-full text-center py-20">

    <h2 className="text-xl font-semibold mb-2">
      Nothing here yet 👀
    </h2>

    <p className="text-gray-500 mb-4">
      Try changing filters or explore other collections
    </p>

    <button
      onClick={() => router.push("/shop/all/all")}
      className="bg-black text-white px-6 py-2 rounded"
    >
      View All Products
    </button>

  </div>
) : (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}

        </div>

      </div>

    </main>
  );
}