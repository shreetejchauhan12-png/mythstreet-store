"use client";

type Props = {
  product?: any;
};

export default function VariantsCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Variant Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Garment Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Garment Type
          </label>

          <input
            type="text"
            defaultValue={product?.type || ""}
            placeholder="Oversized T-Shirt"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Color
          </label>

          <input
            type="text"
            defaultValue={product?.color_name || ""}
            placeholder="Black"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Variant Code */}
        <div>
          <label className="block text-sm font-medium mb-2">
            SKU
          </label>

          <input
            type="text"
            defaultValue={product?.sku || ""}
            placeholder="CHAOS-OV-BLK"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Qikink Product ID */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Qikink Product ID
          </label>

          <input
            type="text"
            defaultValue={product?.qikink_product_id || ""}
            placeholder="123456"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

      </div>

    </div>
  );
}