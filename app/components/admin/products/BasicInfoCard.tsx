"use client";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function BasicInfoCard({
  form,
  setForm,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Design Name */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Design Name
          </label>

          <input
            type="text"
            value={form.name || ""}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Collection */}

        <div>

          <label className="block text-sm font-medium mb-2">
            Collection
          </label>

          <input
            type="text"
            value={form.collection || ""}
            className="w-full border rounded-lg px-4 py-3"
            readOnly
          />

        </div>

      </div>

      {/* Description */}

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Description
        </label>

        <textarea
          rows={6}
          value={form.description || ""}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-3 resize-none"
        />

      </div>

    </div>
  );
}