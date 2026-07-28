"use client";

import type { Design } from "@/app/types/design";

type Props = {
  form: Design;
  setForm: React.Dispatch<
    React.SetStateAction<Design | null>
  >;
};

export default function PublishingCard({
  form,
  setForm,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Publishing
      </h2>

      {/* Status */}

      <div className="mb-8">

        <label className="block text-sm font-medium mb-2">
          Status
        </label>

        <select
          value={form.status || "draft"}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>

          <option value="archived">
            Archived
          </option>

        </select>

      </div>

      {/* Switches */}

      <div className="grid grid-cols-2 gap-6">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.featured || false}
            onChange={(e) =>
              setForm({
                ...form,
                featured: e.target.checked,
              })
            }
          />

          Featured

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.trending || false}
            onChange={(e) =>
              setForm({
                ...form,
                trending: e.target.checked,
              })
            }
          />

          Trending

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.latest_drop || false}
            onChange={(e) =>
              setForm({
                ...form,
                latest_drop: e.target.checked,
              })
            }
          />

          Latest Drop

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.best_seller || false}
            onChange={(e) =>
              setForm({
                ...form,
                best_seller: e.target.checked,
              })
            }
          />

          Best Seller

        </label>

      </div>

    </div>
  );
}