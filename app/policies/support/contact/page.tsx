export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Contact Us
      </h1>

      <p className="text-gray-600 mb-10">
        We're here to help. Reach out to us for any questions regarding
        orders, products, or support.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Email
          </h3>
          <p className="text-sm text-gray-600 wrap-break-words">
            mythstreetstore@gmail.com
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            WhatsApp
          </h3>
          <p className="text-sm text-gray-600 wrap-break-words">
            9021943839
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Instagram
          </h3>
          <p className="text-sm text-gray-600 wrap-break-words">
            @_myth.street_
          </p>
        </div>

      </div>

      <div className="mt-10 border rounded-xl p-6">
        <h3 className="font-medium mb-2">
          Support Time
        </h3>

        <p className="text-sm text-gray-600">
          We usually respond within 24 hours. For quick support,
          message us on WhatsApp.
        </p>
      </div>

    </main>
  );
}