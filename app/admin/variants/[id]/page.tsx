"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VariantBasicCard from "@/app/components/admin/variants/VariantBasicCard";
import VariantImagesCard from "@/app/components/admin/variants/VariantImagesCard";
import VariantSizesCard from "@/app/components/admin/variants/VariantSizesCard";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function VariantEditorPage() {

  const params = useParams();

  const variantId = Number(params.id);

  const [form, setForm] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    fetchVariant();

  }, [variantId]);

  async function fetchVariant() {

    try {

      const res = await fetch(
        `${API}/api/products/${variantId}`
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

    console.log("PUT URL:", `${API}/api/products/${variantId}`);

const res = await fetch(
  `${API}/api/products/${variantId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }
);

console.log("STATUS:", res.status);
console.log("CONTENT TYPE:", res.headers.get("content-type"));

const text = await res.text();

console.log("RAW RESPONSE:");
console.log(text);

    const json = await res.json();

    console.log(
      "UPDATED:",
      json
    );

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

  if (loading || !form) {

    return (
      <div className="max-w-7xl mx-auto p-8">
        Loading Variant...
      </div>
    );

  }

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
        form={form}
        setForm={setForm}
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