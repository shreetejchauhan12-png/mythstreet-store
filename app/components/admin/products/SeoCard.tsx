"use client";

type Props = {
  design: any;
};

export default function SeoCard({
  design,
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
            defaultValue={design?.seo_title || ""}
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
            defaultValue={design?.seo_description || ""}
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />

        </div>

      </div>

    </div>
  );
}