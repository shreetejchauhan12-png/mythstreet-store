"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SAVE USER + TOKEN
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // ✅ REDIRECT HOME
      router.push("/");

    } catch (error) {
      console.error(error);
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 🔥 FORGOT PASSWORD LINK */}
      <p
        onClick={() => router.push("/forgot-password")}
        className="text-right text-sm mb-4 cursor-pointer underline"
      >
        Forgot Password?
      </p>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* 🔥 REGISTER LINK */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/register")}
          className="underline cursor-pointer"
        >
          Register
        </span>
      </p>

    </div>
  );
}