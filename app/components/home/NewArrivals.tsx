"use client";

import ProductCard from "@/app/components/ui/ProductCard";

export default function NewArrivals({
  products,
}: {
  products: any[];
}) {
  const sorted = [...products].sort(
    (a, b) =>
      new Date(b.created_at || b.createdAt).getTime() -
      new Date(a.created_at || a.createdAt).getTime()
  );

  const latestProducts = sorted.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          New Arrivals
        </h2>
      </div>

      {latestProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestProducts.map((product) => (
            <ProductCard
  key={product.id}
  product={product}
/>
          ))}
        </div>
      )}

      {latestProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}
    </section>
  );
}