"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Collection = {
  id: number;
  name: string;
  slug: string;
};

export default function NewDesignPage() {
    const router = useRouter();

  const [name, setName] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const res = await fetch("/api/collections");

      const json = await res.json();

      setCollections(json.data ?? []);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveDesign() {
  if (!name.trim()) {
    alert("Please enter Design Name");
    return;
  }

  if (!collection) {
    alert("Please select Collection");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/designs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        collection_id: Number(collection),
        description,
        seo_title: seoTitle,
        seo_description: seoDescription,
      }),
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.message);
    }

    router.push(`/admin/products/${json.data.id}`);

  } catch (error) {
    console.error(error);
    alert("Failed to create design.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold">
        Create New Design
      </h1>

      <p className="mt-2 mb-8 text-gray-500">
        Create the design first. Variants, colors, images and sizes will be added later.
      </p>

      <div className="bg-white rounded-xl border p-6 space-y-6">

        {/* Design Name */}

        <div>
          <label className="block font-medium mb-2">
            Design Name
          </label>

          <input
            type="text"
            placeholder="Example: Chaos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* Collection */}

        <div>
          <label className="block font-medium mb-2">
            Collection
          </label>

          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          >
            <option value="">
              Select Collection
            </option>

            {collections.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>
        </div>

        {/* Description */}

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Describe this design..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none resize-none"
          />
        </div>

        {/* SEO Title */}

        <div>
          <label className="block font-medium mb-2">
            SEO Title
          </label>

          <input
            type="text"
            placeholder="Example: Chaos | MythStreet"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* SEO Description */}

        <div>
          <label className="block font-medium mb-2">
            SEO Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter SEO description..."
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none resize-none"
          />
        </div>

        {/* Save Button */}

        <div className="pt-4">

          <button
  onClick={saveDesign}
  disabled={loading}
  className="
    bg-[#680000]
    text-white
    px-6
    py-3
    rounded-lg
    hover:opacity-90
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading ? "Saving..." : "Save & Continue"}
</button>

        </div>

      </div>

    </div>
  );
}