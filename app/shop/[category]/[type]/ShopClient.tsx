"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { getProducts } from "@/app/data/products";

import { useParams } from "next/navigation";

export default function TypePage() {

  const params = useParams();

const category =
  (params?.category as string) || "all";

const type =
  (params?.type as string) || "all";

  const router = useRouter();
  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");

 const [products, setProducts] = useState<any[]>([]);
  const [sort, setSort] = useState("latest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [price, setPrice] = useState(2000);
  const [tempCategory, setTempCategory] = useState(category);
const [tempType, setTempType] = useState(type);
const [tempCollection, setTempCollection] = useState(
  collection || ""
);
useEffect(() => {

  setTempCategory(category);
  setTempType(type);
  setTempCollection(collection || "");

}, [category, type, collection]);
  useEffect(() => {

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  loadProducts();

}, []);

  // fetch products

  // ===== FILTER LOGIC (same as before) =====
  const filteredProducts = useMemo(() => {
  let filtered = products;

  if (type === "all") {
    filtered = filtered.filter(
      (p) => p.is_hero
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(
      (p) =>
        p.gender_visibility === category ||
        p.gender_visibility === "unisex"
    );
  }

  if (type !== "all") {
    filtered = filtered.filter((p) => {
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
    filtered = filtered.filter((p) => {
      return (
        p.collection
          ?.toLowerCase()
          .trim() ===
        collection.toLowerCase().trim()
      );
    });
  }

  filtered = filtered.filter(
    (p) => p.price <= price
  );

  if (sort === "low") {
    filtered = [...filtered].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filtered = [...filtered].sort(
      (a, b) => b.price - a.price
    );
  }

  return filtered;

}, [
  products,
  type,
  category,
  collection,
  price,
  sort,
]);

  // ===== UNIQUE FILTER VALUES =====
  const types = useMemo(() => {
  return Array.from(
    new Set(
      products.map((p) =>
        p.type
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
      )
    )
  );
}, [products]);
  const collections = useMemo(() => {
  return Array.from(
    new Set(products.map((p) => p.collection))
  );
}, [products]);

if (!products.length) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 animate-pulse">

      <div className="grid md:grid-cols-[260px_1fr] gap-10">

        {/* SIDEBAR */}
        <div className="hidden md:block bg-gray-200 rounded-2xl h-125" />

        {/* PRODUCTS */}
        <div>

          <div className="h-8 w-40 bg-gray-200 rounded-lg mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>

                <div className="bg-gray-200 rounded-2xl aspect-4/5 mb-3" />

                <div className="h-4 bg-gray-200 rounded mb-2" />

                <div className="h-4 w-20 bg-gray-200 rounded" />

              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}

  return (
  <>
    <main className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-6">
        Welcome to Street Homie
      </h1>

      <div className="grid md:grid-cols-[260px_1fr] gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="hidden md:block space-y-6 md:sticky md:top-28 h-max bg-white border rounded-2xl p-5 shadow-md">

          {/* CATEGORY */}
<div>
  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Category
  </h3>

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => router.push("/shop/men/all")}
      className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        tempCategory === "men"
          ? "bg-black text-white border-black"
          : "text-gray-600 border-gray-300 hover:border-black"
      }`}
    >
      Men
    </button>

    <button
      onClick={() => router.push("/shop/women/all")}
      className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        tempCategory === "women"
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
        tempType === "all"
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
    tempType === slug;

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
  {t
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase())}
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

    {collections.map((c) => {
  const active =
    tempCollection ===
c?.toLowerCase().trim();

  return (
    <button
      key={c}
      onClick={() =>
        router.push(
          `/shop/${category}/${type}?collection=${c.toLowerCase()}`
        )
      }
      className={`capitalize px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ease-out hover:scale-[1.03] ${
        active
          ? "bg-black text-white border-black"
          : "text-gray-600 border-gray-300 hover:border-black"
      }`}
    >
      {c}
    </button>
  );
})}

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

          {/* TOP BAR */}
<div className="sticky top-[72px] z-30 flex items-center justify-between mb-6 gap-3 bg-white/80 backdrop-blur-xl py-3">
  <button
  onClick={() => setMobileFiltersOpen(true)}
  className="
    md:hidden
    border
    rounded-full
    px-4
    h-10
    text-sm
    font-medium
    bg-white
  "
>
  FILTERS
</button>

            <p className="text-sm text-gray-500">
              {filteredProducts.length} products
            </p>

            <div className="relative">

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="
      appearance-none
      rounded-full
      border
      bg-white
      px-4
      h-10
      text-sm
      font-medium
      pr-10
      outline-none
    "
  >
    <option value="latest">Latest</option>
    <option value="low">Price ↑</option>
    <option value="high">Price ↓</option>
  </select>

  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">
    ▼
  </div>

</div>

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
      <ProductCard
  key={product.id}
  product={{
    ...product,

    variant_code:
      type !== "all"
        ? type
            .replace("oversized-t-shirt", "os")
            .replace("hoodie", "hd")
            .replace("sweatshirt", "ss")
            .replace("tshirt", "ts")
        : product.hero_type || product.variant_code,
  }}
/>
    ))}
  </div>
)}

        </div>

      </div>

      

    </main>

    {/* MOBILE FILTER DRAWER */}
{mobileFiltersOpen && (
  <div className="fixed inset-0 z-50 md:hidden">

    {/* BACKDROP */}
    <div
  onClick={() => setMobileFiltersOpen(false)}
  className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"
/>

    {/* DRAWER */}
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-semibold">
          Filters
        </h2>

        <button
          onClick={() =>
            setMobileFiltersOpen(false)
          }
          className="text-sm text-gray-500"
        >
          Close
        </button>

      </div>

      {/* CATEGORY */}
      <div className="mb-6">

        <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
          Category
        </h3>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={() => {
  setTempCategory("men");
}}
            className={`px-4 py-2 rounded-full text-sm border ${
              tempCategory === "men"
                ? "bg-black text-white border-black"
                : "border-gray-300"
            }`}
          >
            Men
          </button>

          <button
            onClick={() => {
  setTempCategory("women");
}}
            className={`px-4 py-2 rounded-full text-sm border ${
              tempCategory === "women"
                ? "bg-black text-white border-black"
                : "border-gray-300"
            }`}
          >
            Women
          </button>

        </div>

      </div>

      {/* PRODUCT TYPE */}
<div className="mb-6">

  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Product Type
  </h3>

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => {
  setTempType("all");
}}
      className={`px-4 py-2 rounded-full text-sm border ${
        tempType === "all"
          ? "bg-black text-white border-black"
          : "border-gray-300"
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
  tempType === slug;

      return (
        <button
          key={t}
          onClick={() => {
  setTempType(slug);
}}
          className={`capitalize px-4 py-2 rounded-full text-sm border ${
            active
              ? "bg-black text-white border-black"
              : "border-gray-300"
          }`}
        >
          {t
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
        </button>
      );
    })}

  </div>

</div>

{/* COLLECTION */}
<div className="mb-6">

  <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
    Collection
  </h3>

  <div className="flex flex-wrap gap-2">

    {collections.map((c) => {
      const active =
  tempCollection ===
  c?.toLowerCase().trim();

      return (
        <button
          key={c}
          onClick={() => {
  setTempCollection(c.toLowerCase());
}}
          className={`capitalize px-4 py-2 rounded-full text-sm border ${
            active
              ? "bg-black text-white border-black"
              : "border-gray-300"
          }`}
        >
          {c}
        </button>
      );
    })}

  </div>

</div> 

      {/* PRICE */}
      <div className="mb-6">

        <h3 className="font-semibold mb-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
          Price
        </h3>

        <input
          type="range"
          min="0"
          max="2000"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full accent-black"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹{price}</span>
        </div>

      </div>

      <button
  onClick={() => {

    const url =
      `/shop/${tempCategory}/${tempType}` +
      (tempCollection
        ? `?collection=${tempCollection}`
        : "");

    router.push(url);

router.refresh();

setMobileFiltersOpen(false);

  }}
  className="
w-full
bg-black
text-white
py-4
rounded-2xl
font-medium
tracking-wide
mt-4
sticky
bottom-0
"
>
  APPLY FILTERS
</button>

    </div>

  </div>
)}

  </>
);
}