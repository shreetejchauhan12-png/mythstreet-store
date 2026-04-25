"use client";

import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      name: "Oversized T-Shirts",
      type: "oversized",
      image: "/pd4.jpg",
    },
    {
      name: "T-Shirts",
      type: "tshirt",
      image: "/pd2.jpg",
    },
    {
      name: "Hoodies",
      type: "hoodie",
      image: "/pd1.jpg",
    },
    {
      name: "Sweatshirts",
      type: "sweatshirt",
      image: "/pd3.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* title */}
      <div className="text-center mb-4">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">
          SHOP BY
        </p>

        <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
          CATEGORIES
        </h2>

        <span className="block w-8 h-px bg-[#680000] mx-auto mt-2"></span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <Link key={i} href={`/shop/all/${cat.type}`}>
            <div className="group cursor-pointer">

              {/* card */}
              <div className="relative overflow-hidden rounded-2xl pt-[125%] shadow-sm hover:shadow-xl transition">

                {/* image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition"></div>

                {/* text inside image (premium look) */}
                <div className="absolute bottom-3 left-3 text-white text-sm font-semibold tracking-wide">
                  {cat.name}
                </div>

              </div>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}