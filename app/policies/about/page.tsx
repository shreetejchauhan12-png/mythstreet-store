export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        About MythStreet
      </h1>

      <div className="space-y-6 text-gray-700 leading-7">

        <p>
          MythStreet is a premium streetwear brand focused on delivering
          unique designs with high quality materials. Our goal is to bring
          fresh culture-driven fashion inspired by anime, streetwear and
          modern aesthetics.
        </p>

        <p>
          Every piece is designed to stand out while maintaining comfort
          and durability. We believe clothing should represent personality,
          creativity and individuality.
        </p>

        <p>
          At MythStreet, we focus on providing the finest designs with
          the best material so customers receive both style and quality
          in every product.
        </p>

      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Premium Quality
          </h3>
          <p className="text-sm text-gray-600">
            High quality fabric and long lasting prints.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Unique Designs
          </h3>
          <p className="text-sm text-gray-600">
            Exclusive drops inspired by modern culture.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Fast Support
          </h3>
          <p className="text-sm text-gray-600">
            Quick customer support within 24 hours.
          </p>
        </div>

      </div>

    </main>
  );
}