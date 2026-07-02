"use client";

type Props = {
  product?: any;
};

export default function PriceCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Pricing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price
          </label>

          <input
            type="number"
            defaultValue={product?.price || ""}
            placeholder="699"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Display Order
          </label>

          <input
            type="number"
            defaultValue={product?.display_order || ""}
            placeholder="1"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Hero Product */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Hero Product
          </label>

          <select
            defaultValue={String(product?.is_hero)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

        </div>

      </div>

    </div>
  );
}