"use client";

import type { Design } from "@/app/types/design";

type Props = {
  form: Design;
  setForm: React.Dispatch<
    React.SetStateAction<Design | null>
  >;
};

export default function SeoCard({
  form,
  setForm,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        SEO
      </h2>

      <div className="space-y-6">

        {/* SEO Title */}

        <div>

          <label className="block text-sm font-medium mb-2">
            SEO Title
          </label>

          <input
            type="text"
            value={form.seo_title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                seo_title: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* SEO Description */}

        <div>

          <label className="block text-sm font-medium mb-2">
            SEO Description
          </label>

          <textarea
            rows={4}
            value={form.seo_description || ""}
            onChange={(e) =>
              setForm({
                ...form,
                seo_description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />

        </div>

      </div>

    </div>
  );
}