"use client";

import { useEffect, useState } from "react";

import BasicInfoCard from "./BasicInfoCard";
import VariantsCard from "./VariantsCard";
import SeoCard from "./SeoCard";
import PublishingCard from "./PublishingCard";

type Props = {
  designId: number;
};

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export default function ProductForm({
  designId,
}: Props) {

  const [design, setDesign] = useState<any>(null);

  const [form, setForm] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDesign();
  }, [designId]);

  async function fetchDesign() {

    try {

      const res = await fetch(
        `${API}/api/designs/${designId}`
      );

      const json = await res.json();

      setDesign(json.data);

      setForm({
  status: "draft",
  featured: false,
  trending: false,
  latest_drop: false,
  best_seller: false,
  ...json.data,
});

      console.log("DESIGN:", json.data);

    } catch (error) {

      console.error(
        "FETCH DESIGN ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  async function saveDesign() {

  try {

    console.log("SAVE BUTTON CLICKED");
console.log(form);

    setSaving(true);

    const res = await fetch(
      `${API}/api/designs/${designId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      }
    );

    const json = await res.json();

    console.log("UPDATED:", json);

    alert("Design updated successfully ✅");

  } catch (error) {

    console.error(
      "SAVE ERROR:",
      error
    );

    alert("Failed to update design ❌");

  } finally {

    setSaving(false);

  }

}

  if (loading) {

    return (
      <div className="text-center py-10">
        Loading Design...
      </div>
    );

  }

  return (
    <div className="space-y-6">

      <BasicInfoCard
  form={form}
  setForm={setForm}
/>

      <SeoCard
  form={form}
  setForm={setForm}
/>

<PublishingCard
  form={form}
  setForm={setForm}
/>

<VariantsCard
  design={design}
/>

      <div className="flex justify-end">

  <button
    onClick={saveDesign}
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