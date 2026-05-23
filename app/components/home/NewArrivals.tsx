"use client";

import Link from "next/link";
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
    <section className="max-w-7xl mx-auto px-4 pt-0 md:pt-2 pb-4 md:pb-8">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-5 md:mb-8">

        <div>

          <p className="text-[11px] tracking-[0.35em] text-gray-400 uppercase mb-2">
            Latest
          </p>

          <h2 className="text-[34px] md:text-5xl font-black tracking-tight leading-none uppercase">
            NEW ARRIVALS
          </h2>

          <div className="w-14 h-px bg-[#680000] mt-4"></div>

        </div>

        {/* VIEW ALL */}
        <Link
          href="/shop/all/all"
          className="
            hidden md:block
            text-sm tracking-[0.2em]
            uppercase
            border-b border-black
            hover:opacity-60
            transition
          "
        >
          View All
        </Link>

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