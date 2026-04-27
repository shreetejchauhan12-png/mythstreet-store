"use client";

import Link from "next/link";

export default function CollectionSection() {
  const collections = [
  {
    name: "Spiritual",
    slug: "spiritual",
    image: "/ct2.jpg",
  },
  {
    name: "Anime",
    slug: "anime",
    image: "/ct3.jpg",
  },
  {
    name: "Marvel",
    slug: "marvel",
    image: "/ct1.jpg",
  },
  {
    name: "Streetwear",
    slug: "streetwear",
    image: "/ct4.jpg",
  },
  {
    name: "Minimal",
    slug: "minimal",
    image: "/ct5.jpg",
  },
];

  return (
    <section className="max-w-7xl mx-auto px-4 py-5 md:py-8">

      <div className="text-center mb-10">
        <p className="text-xs tracking-[4px] text-gray-500 uppercase">
          Shop By
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold">
          COLLECTIONS
        </h2>

        <div className="w-12 h-px bg-[#680000] mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {collections.map((item, i) => (
          <Link key={i} href={`/shop/all/all?collection=${item.slug}`}>
            <div className="group cursor-pointer">

              <div className="relative overflow-hidden rounded-lg">
                <div className="pt-[125%]" />

                <img
                  src={item.image}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <p className="mt-3 text-sm md:text-base font-medium text-center">
                {item.name}
              </p>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}