"use client";

import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="bg-[#680000] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 text-center">
        
        <div className="flex flex-col items-center gap-2">
          <Truck className="w-5 h-5 text-white" />
          <p className="text-sm font-medium">
            Free Shipping
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-white" />
          <p className="text-sm font-medium">
            Premium Quality
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <RotateCcw className="w-5 h-5 text-white" />
          <p className="text-sm font-medium">
            Easy Returns
          </p>
        </div>

      </div>
    </section>
  );
}