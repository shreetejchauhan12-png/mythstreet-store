"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  if (!user) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        My Account
      </h1>

      <div className="border p-6 rounded-lg space-y-4">

        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{user.name || "Not set"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{user.phone}</p>
        </div>

      </div>

    </div>
  );
}