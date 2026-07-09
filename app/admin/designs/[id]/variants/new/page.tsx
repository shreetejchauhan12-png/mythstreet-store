"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import VariantBasicCard from "@/app/components/admin/variants/VariantBasicCard";
import VariantImagesCard from "@/app/components/admin/variants/VariantImagesCard";
import VariantSizesCard from "@/app/components/admin/variants/VariantSizesCard";

import { useLookups } from "@/hooks/useLookups";
import { apiFetch } from "@/app/lib/api";

export default function AddVariantPage() {

  const params = useParams();

  const router = useRouter();

  const designId = Number(params.id);

  const {
    garmentTypes,
    colors,
    sizes,
    loading,
  } = useLookups();

  const [form, setForm] = useState({

    garment_type_id: "",

    color_id: "",

    sku: "",

    price: 0,

    qikink_product_id: "",

    is_hero: false,

    main_image: "",
    image_2: "",
    image_3: "",
    image_4: "",
    image_5: "",
    image_6: "",
    banner_image: "",

    sizes: [],

  });

  if (loading) {

    return (
      <div className="max-w-7xl mx-auto p-8">
        Loading...
      </div>
    );

  }

  async function createVariant() {

  try {

    const response = await apiFetch("/api/products", {
  method: "POST",
  body: JSON.stringify({
    ...form,
    design_id: designId,
  }),
});

    const json = await response.json();

    if (!response.ok || !json.success) {

      throw new Error(
        json.message || "Failed to create variant"
      );

    }

    alert(
      "Variant created successfully ✅"
    );

    router.push(
      `/admin/designs/${designId}`
    );

  } catch (error) {

    console.error(
      "CREATE VARIANT ERROR:",
      error
    );

    alert(
      "Failed to create variant ❌"
    );

  }

}

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add Variant
        </h1>

        <p className="text-gray-500 mt-2">
          Design ID: {designId}
        </p>

      </div>

      <VariantBasicCard
        form={form}
        setForm={setForm}
        garmentTypes={garmentTypes}
        colors={colors}
        createMode
      />

      <VariantImagesCard
        form={form}
        setForm={setForm}
      />

      <VariantSizesCard
        form={form}
        setForm={setForm}
      />

      <div className="flex justify-end">

        <button
  onClick={createVariant}
  className="
    bg-[#680000]
    text-white
    px-6
    py-3
    rounded-lg
    hover:opacity-90
  "
>
  Create Variant
</button>

      </div>

    </div>

  );

}