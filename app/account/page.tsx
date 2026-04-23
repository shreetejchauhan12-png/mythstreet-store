"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const saved = localStorage.getItem("user");

  console.log("LOCAL STORAGE USER:", saved); // 👈 ADD THIS

  if (saved) {
    const parsed = JSON.parse(saved);
    console.log("PARSED USER:", parsed); // 👈 ADD THIS
    setUser(parsed);
  }
}, []);

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">

      <h2 className="text-xl font-semibold mb-6">
        Profile
      </h2>

      <div className="border p-6 max-w-xl">

        <div className="mb-4">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">
            {user.name || "Not set"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">
            {user.phone}
          </p>
        </div>

      </div>

    </div>
  );
}