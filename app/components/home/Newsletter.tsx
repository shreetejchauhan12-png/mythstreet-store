"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "">("");

  async function handleSubscribe() {
    if (!email) {
      setType("error");
      setMessage("Please enter email");
      return;
    }

    setLoading(true);
    setMessage("");
    setType("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json(); // ✅ IMPORTANT

      if (!res.ok) {
        setType("error");
        setMessage(data.error || "Something went wrong");
        return;
      }

      // ✅ SUCCESS HANDLING
      setType("success");
      setMessage(data.message || "Subscribed successfully");
      setEmail("");

    } catch (err) {
      setType("error");
      setMessage("Server error");
    } finally {
      setLoading(false);

      // auto hide message
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);
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

        {/* 🔥 MESSAGE */}
        <div className="mt-5 h-6">

          <p
            className={`
              text-sm transition-all duration-500
              ${type === "success" ? "opacity-100 translate-y-0 text-green-300" : "opacity-0 -translate-y-2"}
            `}
          >
            {message}
          </p>

          <p
            className={`
              text-sm transition-all duration-500
              ${type === "error" ? "opacity-100 translate-y-0 text-red-300" : "opacity-0 -translate-y-2"}
            `}
          >
            {message}
          </p>

        </div>

      </div>
    </section>
  );
}