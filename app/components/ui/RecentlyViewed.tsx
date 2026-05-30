"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecentlyViewed() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    setProducts(stored.slice(0, 4));
  }, []);

  if (products.length <= 1) {
    return null;
  }

  return (
    <section className="mt-16">

      <h2 className="text-xl font-semibold mb-4">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {products.map((product) => (

          <button
            key={product.id}
            onClick={() =>
              router.push(
                `/product/${product.id}`
              )
            }
            className="
              text-left
              border
              rounded-xl
              overflow-hidden
              hover:border-[#680000]
              transition
            "
          >

            <div className="relative aspect-[4/5]">

              <Image
                src={`/${product.design}-${product.variant_code}-1.webp`}
                alt={product.title}
                fill
                sizes="200px"
                loading="lazy"
                className="object-cover"
              />

            </div>

            <div className="p-3">

              <p className="text-sm font-medium line-clamp-2">
                {product.title}
              </p>

              <p className="text-[#680000] mt-1">
                ₹{product.price}
              </p>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}
