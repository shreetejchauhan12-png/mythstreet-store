"use client";

import { useEffect, useState } from "react";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("myth_addresses") || "[]");
    setAddresses(saved);
  }, []);

  const save = (list: any[]) => {
    setAddresses(list);
    localStorage.setItem("myth_addresses", JSON.stringify(list));
  };

  const addAddress = () => {
    if (!form.name || !form.phone || !form.line1) return;

    save([...addresses, { ...form, id: Date.now() }]);

    setForm({
      name: "",
      phone: "",
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
          placeholder="Full name"
          className="w-full border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="w-full border p-3"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

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
            <p className="font-medium">{a.name}</p>
            <p className="text-sm">{a.phone}</p>
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