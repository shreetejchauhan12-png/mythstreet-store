"use client";

import type { Variant } from "@/app/product/[id]/types/variant";

type Props = {
  form: Variant;
  setForm: React.Dispatch<
  React.SetStateAction<Variant>
>;
};

export default function VariantImagesCard({
  form,
  setForm,
}: Props) {

  function updateImage(
  key: keyof Pick<
  Variant,
    | "main_image"
    | "image_2"
    | "image_3"
    | "image_4"
    | "image_5"
    | "image_6"
    | "banner_image"
  >,
  value: string
) {

    setForm({
      ...form,
      [key]: value,
    });

  }

  return (

    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Images
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Main */}

        <div>

          <label className="block text-sm mb-2">
            Main Image
          </label>

          <input
            type="text"
            value={form.main_image || ""}
            onChange={(e)=>
              updateImage(
                "main_image",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Image 2 */}

        <div>

          <label className="block text-sm mb-2">
            Image 2
          </label>

          <input
            type="text"
            value={form.image_2 || ""}
            onChange={(e)=>
              updateImage(
                "image_2",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Image 3 */}

        <div>

          <label className="block text-sm mb-2">
            Image 3
          </label>

          <input
            type="text"
            value={form.image_3 || ""}
            onChange={(e)=>
              updateImage(
                "image_3",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Image 4 */}

        <div>

          <label className="block text-sm mb-2">
            Image 4
          </label>

          <input
            type="text"
            value={form.image_4 || ""}
            onChange={(e)=>
              updateImage(
                "image_4",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Image 5 */}

        <div>

          <label className="block text-sm mb-2">
            Image 5
          </label>

          <input
            type="text"
            value={form.image_5 || ""}
            onChange={(e)=>
              updateImage(
                "image_5",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Image 6 */}

        <div>

          <label className="block text-sm mb-2">
            Image 6
          </label>

          <input
            type="text"
            value={form.image_6 || ""}
            onChange={(e)=>
              updateImage(
                "image_6",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      <div className="mt-6">

        <label className="block text-sm mb-2">
          Banner Image
        </label>

        <input
          type="text"
          value={form.banner_image || ""}
          onChange={(e)=>
            updateImage(
              "banner_image",
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

    </div>

  );

}