"use client";

import { useEffect, useState } from "react";

export default function SubscribersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSubscribers() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/subscribe");

      if (!res.ok) throw new Error("Failed to fetch");

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Subscribers
        </h1>

        <button
          onClick={fetchSubscribers}
          className="px-4 py-2 bg-black text-white rounded text-sm hover:opacity-80"
        >
          Refresh
        </button>
      </div>

      {/* STATES */}
      {loading && (
        <p className="text-gray-500">Loading...</p>
      )}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500">No subscribers yet</p>
      )}

      {/* TABLE */}
      {!loading && !error && data.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">

          <table className="w-full text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{item.id}</td>

                  <td className="p-3 font-medium">
                    {item.email}
                  </td>

                  <td className="p-3 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}