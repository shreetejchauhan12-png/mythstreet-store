"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!otp || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔥 backend will come next step
      alert("Password reset flow coming next");

      router.push("/login");

    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Reset Password
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        OTP sent to {email}
      </p>

      <input
        placeholder="Enter OTP"
        className="w-full border p-3 mb-3 rounded"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
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
        onClick={handleReset}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

    </div>
  );
}
