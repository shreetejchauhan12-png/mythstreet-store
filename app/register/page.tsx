"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      alert("Account created successfully");

      router.push("/login");

    } catch (error) {
      console.error(error);
      alert("Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-3 mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-3 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-3 mb-4 rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Register"}
      </button>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="underline cursor-pointer"
        >
          Login
        </span>
      </p>

    </div>
  );
}