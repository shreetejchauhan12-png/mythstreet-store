"use client";

type Props = {
  designId: number;
};

export default function VariantsCard({
  designId,
}: Props) {
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

        <button
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
        </button>

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

            <tr>

              <td
                colSpan={5}
                className="text-center py-10 text-gray-500"
              >
                No variants created yet.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}