"use client";

import ProductCard from "@/app/components/ui/ProductCard";

export default function NewArrivals({
  products,
}: {
  products: any[];
}) {

  // HERO PRODUCTS ONLY
  const featured = [...products]
    .filter((p) => p.is_hero)
    .slice(0, 4);

  if (!featured.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 md:pt-8 pb-2 md:pb-6">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-5 md:mb-8">

        <div>

          <p className="text-[11px] tracking-[0.35em] text-gray-400 uppercase mb-2">
            Curated
          </p>

          <h2 className="text-[32px] md:text-5xl font-semibold leading-none tracking-wide">
            EDITOR’S PICKS
          </h2>

        </div>

        <button
          className="
            hidden md:block
            text-sm tracking-widest
            border-b border-black
            hover:opacity-60
            transition
          "
        >
          VIEW ALL
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}