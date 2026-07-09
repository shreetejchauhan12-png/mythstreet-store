"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  design: any;
};

export default function VariantsCard({
  design,
}: Props) {

  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {

    if (!design?.id) return;

    fetchVariants();

  }, [design]);

  async function fetchVariants() {

    try {

      const res = await fetch(
  `/api/products/design/${design.id}`
);

      const json = await res.json();

      console.log("VARIANTS:", json.data);

      setVariants(json.data);

    } catch (error) {

      console.error(
        "FETCH VARIANTS ERROR:",
        error
      );

    }

  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold">
            Variants
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage all product variants for this design.
          </p>

        </div>

        <Link
  href={`/admin/designs/${design.id}/variants/new`}
  className="
    bg-[#680000]
    text-white
    px-5
    py-2.5
    rounded-lg
    hover:opacity-90
  "
>
  + Add Variant
</Link>

      </div>

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-4 py-3">
                Garment
              </th>

              <th className="text-left px-4 py-3">
                Color
              </th>

              <th className="text-left px-4 py-3">
                Hero
              </th>

              <th className="text-left px-4 py-3">
                Status
              </th>

              <th className="text-right px-4 py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

  {variants.length === 0 ? (

    <tr>

      <td
        colSpan={5}
        className="text-center py-10 text-gray-500"
      >
        No variants created yet.
      </td>

    </tr>

  ) : (

    variants.map((variant: any) => (

      <tr
        key={variant.id}
        className="border-t"
      >

        <td className="px-4 py-4">
          {variant.garment_type}
        </td>

        <td className="px-4 py-4">
          {variant.color_name}
        </td>

        <td className="px-4 py-4">

          {variant.is_hero
            ? "✅ Hero"
            : "-"}

        </td>

        <td className="px-4 py-4">

          <span className="text-green-600">
            Active
          </span>

        </td>

        <td className="px-4 py-4 text-right">

          <Link
  href={`/admin/variants/${variant.id}`}
  className="text-blue-600 hover:underline"
>
  Edit
</Link>

        </td>

      </tr>

    ))

  )}

</tbody>

        </table>

      </div>

    </div>
  );
}