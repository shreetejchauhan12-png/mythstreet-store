"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VariantBasicCard from "@/app/components/admin/variants/VariantBasicCard";
import VariantImagesCard from "@/app/components/admin/variants/VariantImagesCard";
import VariantSizesCard from "@/app/components/admin/variants/VariantSizesCard";
import type { Variant } from "@/app/product/[id]/types/variant";


export default function VariantEditorPage() {

  const params = useParams();

  const variantId = Number(params.id);

  const [form, setForm] = useState<Variant>({
  id: 0,
  design_id: 0,

  title: "",
  design: "",
  design_slug: "",

  garment_type_id: 0,
  garment_type: "",
  garment_slug: "",
  gender_visibility: "",
  hero_type: "",

  color_id: 0,
  color_name: "",
  color_slug: "",
  hex_code: "",

  sku: "",
  variant_code: "",
  price: 0,

  qikink_product_id: null,

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

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    fetchVariant();

  }, [variantId]);

  async function fetchVariant() {

    try {

      const res = await fetch(
  `/api/products/${variantId}`
);

      const json = await res.json();

      console.log("VARIANT:", json.data);

      setForm(json.data);

    } catch (error) {

      console.error(
        "FETCH VARIANT ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  async function saveVariant() {

    try {

      setSaving(true);

      const res = await fetch(
  `/api/products/${variantId}`,
  {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(form),
  }
);

      const json = await res.json();

      console.log(
        "UPDATED:",
        json
      );

      if (!res.ok || !json.success) {

        throw new Error(
          json.message || "Update failed"
        );

      }

      alert(
        "Variant updated successfully ✅"
      );

    } catch (error) {

      console.error(
        "SAVE VARIANT ERROR:",
        error
      );

      alert(
        "Failed to update variant ❌"
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading) {

  return (
    <div className="max-w-7xl mx-auto p-8">
      Loading Variant...
    </div>
  );

}
  const variant = form;

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Variant Editor
        </h1>

        <p className="text-gray-500 mt-2">
          Variant ID: {variantId}
        </p>

      </div>

      <VariantBasicCard
  form={variant}
  setForm={setForm}
/>

<VariantImagesCard
  form={variant}
  setForm={setForm}
/>

<VariantSizesCard
  form={variant}
  setForm={setForm}
/>

      <div className="flex justify-end">

        <button
          onClick={saveVariant}
          disabled={saving}
          className="
            bg-[#680000]
            text-white
            px-6
            py-3
            rounded-lg
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>

  );

}