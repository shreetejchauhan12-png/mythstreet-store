"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);

      // ✅ INSTANT REDIRECT (NO ALERT BLOCK)
      router.push("/");

    } catch (error) {
      console.error(error);
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white py-2 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>
  );
}