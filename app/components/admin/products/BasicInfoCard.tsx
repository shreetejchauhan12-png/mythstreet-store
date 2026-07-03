"use client";

type Props = {
  design: any;
};

export default function BasicInfoCard({
  design,
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
            defaultValue={design?.name || ""}
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
            defaultValue={design?.collection || ""}
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
          defaultValue={design?.description || ""}
          className="w-full border rounded-lg px-4 py-3 resize-none"
        />

      </div>

    </div>
  );
}