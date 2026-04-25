"use client";

import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      name: "Oversized T-Shirts",
      type: "oversized",
      image:
        "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "T-Shirts",
      type: "tshirt",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Hoodies",
      type: "hoodie",
      image:
        "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Sweatshirts",
      type: "sweatshirt",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* premium title */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest text-gray-500 mb-2">
          SHOP BY
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold">
          CATEGORIES
        </h2>

        <span className="block w-12 h-0.5 bg-[#680000] mx-auto mt-3"></span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <Link key={i} href={`/shop/all/${cat.type}`}>
            <div className="group cursor-pointer">

              {/* ratio container */}
              <div className="relative overflow-hidden rounded-2xl aspect-4/5">

  <img
    src={cat.image}
    alt={cat.name}
    className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
  />

  {/* gradient overlay */}
  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition"></div>

</div>

              <p className="mt-3 text-sm md:text-base font-medium text-center">
                {cat.name}
              </p>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}