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
  filteredProducts = filteredProducts.filter((p) => {
    const productType = p.type
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const urlType = decodeURIComponent(type)
      .toLowerCase()
      .trim();

    return productType === urlType;
  });
}

  if (collection) {
  filteredProducts = filteredProducts.filter((p) => {
    return (
      p.collection
        ?.toLowerCase()
        .trim() ===
      collection.toLowerCase().trim()
    );
  });
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

      <div className="grid md:grid-cols-[260px_1fr] gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="space-y-6 md:sticky md:top-28 h-max bg-white border rounded-2xl p-5 shadow-md">

          {/* CATEGORY */}
<div>
  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Category
  </h3>

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => router.push("/shop/men/all")}
      className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        category === "men"
          ? "bg-black text-white border-black"
          : "text-gray-600 border-gray-300 hover:border-black"
      }`}
    >
      Men
    </button>

    <button
      onClick={() => router.push("/shop/women/all")}
      className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        category === "women"
          ? "bg-black text-white border-black"
          : "text-gray-600 border-gray-300 hover:border-black"
      }`}
    >
      Women
    </button>

  </div>
</div>

          {/* TYPE */}
<div>
  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Product Type
  </h3>

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => router.push(`/shop/${category}/all`)}
      className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        type === "all"
          ? "bg-black text-white border-black"
          : "text-gray-600 border-gray-300 hover:border-black"
      }`}
    >
      All
    </button>

    {types.map((t) => {
  const slug = t
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const active =
    decodeURIComponent(type)
      .toLowerCase()
      .trim() === slug;

  return (
    <button
      key={t}
      onClick={() =>
        router.push(`/shop/${category}/${slug}`)
      }
        className={`capitalize px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
  active
    ? "bg-black text-white border-black"
    : "text-gray-600 border-gray-300 hover:border-black"
}`}
      >
        {t}
      </button>
      );
})}

  </div>
</div>

          {/* COLLECTION */}
<div>
  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Collection
  </h3>

  <div className="flex flex-wrap gap-2">

    {collections.map((c) => (
      <button
        key={c}
        onClick={() =>
          router.push(`/shop/${category}/${type}?collection=${c}`)
        }
        className={`capitalize px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
          collection === c
            ? "bg-black text-white border-black"
            : "text-gray-600 border-gray-300 hover:border-black"
        }`}
      >
        {c}
      </button>
    ))}

  </div>
</div>

          {/* PRICE */}
<div>
  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Price
  </h3>

  <div className="space-y-3">

    <input
      type="range"
      min="0"
      max="2000"
      value={price}
      onChange={(e) =>
        setPrice(Number(e.target.value))
      }
      className="w-full accent-black cursor-pointer"
    />

    <div className="flex justify-between text-xs text-gray-500">
      <span>₹0</span>
      <span>₹{price}</span>
    </div>

  </div>
</div>

        </aside>

        {/* ================= RIGHT SIDE ================= */}
        <div>

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