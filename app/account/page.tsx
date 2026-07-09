"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/auth";
import { apiFetch } from "@/app/lib/api";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const authUser = useAuth((state) => state.user);
  const loadUser = useAuth((state) => state.loadUser);
  const login = useAuth((state) => state.login);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const updateName = async () => {
    const name = prompt("Enter your name");
    if (!name) return;

    try {
  setLoading(true);

  const res = await apiFetch("/api/auth/update-name", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  if (!data.success) {
    alert("Failed to update name");
    return;
  }

  // Keep existing token
  const token = localStorage.getItem("token") || "";

  login(data.user, token);

  setUser(data.user);

  alert("Name updated ✅");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
          <p className="font-medium">
            {user.name || "Not set"}
          </p> 
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">
            {user.phone}
          </p>
        </div>

        <button
          onClick={updateName}
          disabled={loading}
          className="mt-4 px-5 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Edit Name"}
        </button>

      </div>

    </div>
  );
}