"use client";

import { useParams } from "next/navigation";
import ProductForm from "@/app/components/admin/products/ProductForm";

export default function ProductEditorPage() {
  const params = useParams();

  const designId = Number(params.id);

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Design Editor
        </h1>

        <p className="text-gray-500 mt-2">
          Manage variants, pricing, images, SEO and publish settings.
        </p>

      </div>

      <ProductForm designId={designId} />

    </div>
  );
}