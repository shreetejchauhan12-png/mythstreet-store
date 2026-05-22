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

      {/* heading */}
      <div className="text-center mb-6 md:mb-10">

        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-1">
          Shop By
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          COLLECTIONS
        </h2>

        <div className="w-10 h-px bg-[#680000] mx-auto mt-2"></div>

      </div>

      {/* mobile horizontal scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 w-max pb-1">

          {collections.map((item, i) => (
            <Link
              key={i}
              href={`/shop/all/all?collection=${item.slug}`}
            >
              <div className="group cursor-pointer w-23.75 shrink-0">

                {/* image */}
                <div className="relative overflow-hidden rounded-2xl aspect-square shadow-sm">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/10"></div>

                </div>

                {/* text */}
                <p className="mt-2 text-[11px] font-medium text-center tracking-wide">
                  {item.name}
                </p>

              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* desktop grid */}
      <div className="hidden md:grid grid-cols-5 gap-6">

        {collections.map((item, i) => (
          <Link
            key={i}
            href={`/shop/all/all?collection=${item.slug}`}
          >
            <div className="group cursor-pointer">

              <div className="relative overflow-hidden rounded-2xl shadow-sm">

                <div className="pt-[125%]" />

                <img
                  src={item.image}
                  alt={item.name}
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