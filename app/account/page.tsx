"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("myth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return null;

  return (
    <div>

      <h2 className="text-xl font-semibold mb-6">
        Profile
      </h2>

      <div className="border p-6 max-w-xl">

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Name
          </p>
          <p className="font-medium">
            {user.name}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Email
          </p>
          <p className="font-medium">
            {user.email}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Account Created
          </p>
          <p className="font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

    </div>
  );
}