"use client";

type Props = {
  product?: any;
};

export default function BasicInfoCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Product Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Title
          </label>

          <input
            type="text"
            defaultValue={product?.title || ""}
            placeholder="Chaos Oversized T-Shirt"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Collection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Collection
          </label>

          <input
            type="text"
            defaultValue={product?.collection || ""}
            placeholder="Streetwear"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Description
        </label>

        <textarea
          rows={6}
          defaultValue={product?.description || ""}
          placeholder="Write product description..."
          className="w-full border rounded-lg px-4 py-3 resize-none"
        />

      </div>

    </div>
  );
}