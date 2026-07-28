"use client";

import type { CreateVariantForm } from "@/app/types/createVariant";
import type { VariantSize } from "@/app/product/[id]/types/variant";

type Props = {
  form: CreateVariantForm;
  setForm: React.Dispatch<
    React.SetStateAction<CreateVariantForm>
  >;
};

const ALL_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];

export default function VariantSizesCard({
  form,
  setForm,
}: Props) {

  const selectedSizes =
  form.sizes?.map(
    (size: VariantSize) => size.name
  ) || [];

  function toggleSize(
    sizeName: string
  ) {

    const exists =
      selectedSizes.includes(sizeName);

    let updated;

    if (exists) {

      updated = form.sizes.filter(
        (size: VariantSize) =>
  size.name !== sizeName
      );

    } else {

      updated = [
        ...form.sizes,
        {
  name: sizeName,
  stock: 0,
},
      ];

    }

    setForm({
      ...form,
      sizes: updated,
    });

  }

  return (

    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Sizes
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">

        {ALL_SIZES.map((size) => (

          <label
            key={size}
            className="
              flex
              items-center
              gap-2
              cursor-pointer
            "
          >

            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() =>
                toggleSize(size)
              }
            />

            {size}

          </label>

        ))}

      </div>

    </div>

  );

}