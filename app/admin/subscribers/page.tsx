"use client";

import { useEffect, useState } from "react";

export default function SubscribersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscribers")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Subscribers
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && (
        <p>No subscribers yet</p>
      )}

      {!loading && data.length > 0 && (
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
                <tr key={item.id} className="border-t">

                  <td className="p-3">{item.id}</td>

                  <td className="p-3">{item.email}</td>

                  <td className="p-3">
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