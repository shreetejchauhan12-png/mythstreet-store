"use client";

type Props = {
  product?: any;
};

const fields = [
  { label: "Main Image", key: "main_image" },
  { label: "Back Image", key: "image_2" },
  { label: "Model Front", key: "image_3" },
  { label: "Model Back", key: "image_4" },
  { label: "Extra Image", key: "image_5" },
  { label: "Extra Image 2", key: "image_6" },
  { label: "Banner Image", key: "banner_image" },
];

export default function ImagesCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Product Images
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {fields.map((field) => (
          <div key={field.key}>

            <label className="block text-sm font-medium mb-2">
              {field.label}
            </label>

            <input
              type="text"
              defaultValue={product?.[field.key] || ""}
              placeholder={`${field.label} filename`}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>
        ))}

      </div>

    </div>
  );
}