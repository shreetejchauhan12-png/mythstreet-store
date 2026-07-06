"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  id: number;

  name: string;

  collection: string;

  main_image: string | null;

  total_variants: number;

  starting_price: number;

  has_hero: number;
};

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/api/designs`);

      const json = await res.json();

      const data = json.data ?? [];

      setProducts(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();

    setFiltered(
  products.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q)
    );
  })
);
  }, [search, products]);

  if (loading) {
    return (
      <div className="p-8">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
  Designs
</h1>

          <p className="text-gray-500 mt-1">
  Manage your MythStreet designs
</p>

        </div>

        <button
  onClick={() =>
    router.push("/admin/products/new")
  }
  className="
    bg-[#680000]
    text-white
    px-5
    py-3
    rounded-xl
    hover:opacity-90
  "
>
  + Add Design
</button>

      </div>

      <input
        placeholder="Search designs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        mb-8
        outline-none
        "
      />

      <div className="overflow-x-auto rounded-xl border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Image
              </th>

              <th className="text-left p-4">
                Design
              </th>

              <th className="text-left p-4">
                Collection
              </th>

              <th className="text-left p-4">
  Variants
</th>

              <th className="text-left p-4">
  Starting Price
</th>

              <th className="text-left p-4">
  Hero Design
</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((product) => (

              <tr
  key={product.id}
  onClick={() =>
    router.push(`/admin/products/${product.id}`)
  }
  className="
    border-t
    hover:bg-gray-50
    cursor-pointer
  "
>

                <td className="p-4">

                  <Image
  src={`/${product.main_image}`}
  alt={product.name}
  width={60}
  height={70}
  className="rounded-lg object-cover"
/>

                </td>

                <td className="p-4 font-medium">
  {product.name}
</td>

                <td className="p-4">
                  {product.collection}
                </td>

                <td className="p-4">
  {product.total_variants}
</td>

                <td className="p-4">
  ₹{product.starting_price}
</td>

                <td className="p-4">
  {product.has_hero ? (
    <span className="text-green-600 font-medium">
      Yes
    </span>
  ) : (
    <span className="text-gray-400">
      No
    </span>
  )}
</td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}