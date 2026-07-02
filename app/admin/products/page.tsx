"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  collection: string;
  type: string;
  color_name: string;
  price: number;
  is_hero: boolean;
  main_image: string;
};

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/api/products`);

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
          p.title.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.color_name.toLowerCase().includes(q)
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
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your MythStreet catalog
          </p>

        </div>

        <button
          className="
          bg-[#680000]
          text-white
          px-5
          py-3
          rounded-xl
          hover:opacity-90
          "
        >
          + Add Product
        </button>

      </div>

      <input
        placeholder="Search products..."
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
                Product
              </th>

              <th className="text-left p-4">
                Collection
              </th>

              <th className="text-left p-4">
                Garment
              </th>

              <th className="text-left p-4">
                Color
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Hero
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <Image
                    src={`/${product.main_image}`}
                    alt={product.title}
                    width={60}
                    height={70}
                    className="rounded-lg object-cover"
                  />

                </td>

                <td className="p-4 font-medium">
                  {product.title}
                </td>

                <td className="p-4">
                  {product.collection}
                </td>

                <td className="p-4">
                  {product.type}
                </td>

                <td className="p-4">
                  {product.color_name}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  {product.is_hero ? (
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