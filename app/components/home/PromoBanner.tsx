export default function PromoBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="relative overflow-hidden rounded-xl group">

          <img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1974&auto=format&fit=crop"
            className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <div>

              <p className="tracking-[4px] text-sm mb-2">
                LIMITED DROP
              </p>

              <h2 className="text-4xl font-bold mb-4">
                STREETWEAR COLLECTION
              </h2>

              <button className="bg-[#680000] px-8 py-3 font-semibold hover:bg-black transition">
                SHOP NOW
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}