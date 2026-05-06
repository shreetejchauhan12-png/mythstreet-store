"use client";

import { useEffect, useState } from "react";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState({
  line1: "",
  city: "",
  state: "",
  pincode: "",
});

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.id) return;

  const saved = JSON.parse(
    localStorage.getItem(`myth_addresses_${user.id}`) || "[]"
  );

  setAddresses(saved);
}, []);

  const save = (list: any[]) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.id) return;

  setAddresses(list);

  localStorage.setItem(
    `myth_addresses_${user.id}`,
    JSON.stringify(list)
  );
};

  const addAddress = () => {
    if (!form.line1 || !form.city || !form.state || !form.pincode) return;

    save([...addresses, { ...form, id: Date.now() }]);

    setForm({
  line1: "",
  city: "",
  state: "",
  pincode: "",
});
  };

  const remove = (id: number) => {
    save(addresses.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Addresses
      </h2>

      {/* ADD FORM */}
      <div className="border p-5 mb-8 max-w-xl space-y-3">

        <input
          placeholder="Address line"
          className="w-full border p-3"
          value={form.line1}
          onChange={(e) =>
            setForm({ ...form, line1: e.target.value })
          }
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="City"
            className="border p-3"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <input
            placeholder="State"
            className="border p-3"
            value={form.state}
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
          />

          <input
            placeholder="Pincode"
            className="border p-3"
            value={form.pincode}
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
          />
        </div>

        <button
          onClick={addAddress}
          className="bg-black text-white px-6 py-3"
        >
          Add Address
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="border p-5 max-w-xl"
          >
            <p className="text-sm">{a.line1}</p>
            <p className="text-sm">
              {a.city}, {a.state} {a.pincode}
            </p>

            <button
              onClick={() => remove(a.id)}
              className="text-red-500 text-sm mt-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}