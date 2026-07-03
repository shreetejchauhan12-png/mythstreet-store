"use client";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function VariantBasicCard({
  form,
  setForm,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Garment */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Garment Type
          </label>

          <input
            type="text"
            value={form.type || ""}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-50"
          />

        </div>

        {/* Color */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Color
          </label>

          <input
            type="text"
            value={form.color_name || ""}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-50"
          />

        </div>

        {/* SKU */}

        <div>

          <label className="block text-sm font-medium mb-2">
            SKU
          </label>

          <input
            type="text"
            value={form.sku || ""}
            onChange={(e) =>
              setForm({
                ...form,
                sku: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Price */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Price
          </label>

          <input
            type="number"
            value={form.price || ""}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* Hero */}

      <div className="mt-6 flex items-center gap-3">

        <input
          id="hero"
          type="checkbox"
          checked={form.is_hero || false}
          onChange={(e) =>
            setForm({
              ...form,
              is_hero: e.target.checked,
            })
          }
        />

        <label
          htmlFor="hero"
          className="font-medium"
        >
          Hero Variant
        </label>

      </div>

    </div>
  );
}