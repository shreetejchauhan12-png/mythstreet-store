export default function Newsletter() {
  return (
    <section className="bg-[#680000] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl font-bold mb-3">
          Join The MythStreet
        </h2>

        <p className="mb-6">
          Get early access to new drops & exclusive offers
        </p>

        <div className="flex justify-center">
          
          <input
            placeholder="Enter your email"
            className="px-4 py-3 w-80 text-black outline-none"
          />

          <button className="bg-white text-[#680000] px-6 font-semibold">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}