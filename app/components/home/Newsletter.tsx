"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    if (!email) {
      setError("Please enter email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      setEmail("");

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#680000] text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          Join The MythStreet
        </h2>

        <p className="text-white/80 mb-8 text-sm md:text-base">
          Get early access to new drops & exclusive offers
        </p>

        {/* INPUT GROUP */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full sm:w-80
              px-4 py-3
              rounded-md
              text-black
              bg-white
              outline-none
              focus:ring-2 focus:ring-white/60
              transition
            "
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="
              w-full sm:w-auto
              px-6 py-3
              rounded-md
              bg-white text-[#680000]
              font-semibold
              transition
              hover:bg-gray-100
              active:scale-95
              disabled:opacity-70
            "
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>

        </div>

        {/* 🔥 SUCCESS / ERROR MESSAGE (ANIMATED) */}
        <div className="mt-5 h-6">

          <p
            className={`
              text-sm transition-all duration-500
              ${success ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
            `}
          >
            ✅ You're subscribed!
          </p>

          <p
            className={`
              text-sm text-red-300 transition-all duration-500
              ${error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
            `}
          >
            {error}
          </p>

        </div>

      </div>
    </section>
  );
}