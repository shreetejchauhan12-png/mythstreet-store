"use client";

import { useEffect, useState } from "react";

import BasicInfoCard from "./BasicInfoCard";
import VariantsCard from "./VariantsCard";
import SeoCard from "./SeoCard";

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

  const [loading, setLoading] = useState(true);

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
        design={design}
      />

      <SeoCard
        design={design}
      />

      <VariantsCard
        design={design}
      />

    </div>
  );
}