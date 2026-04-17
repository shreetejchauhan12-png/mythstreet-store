export default function SupportPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Support
      </h1>

      <p className="text-gray-600 mb-10">
        Need help with your order? We're here to assist you quickly.
      </p>

      <div className="space-y-6">

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Order Support
          </h3>

          <p className="text-sm text-gray-600">
            For order related queries, contact us with your order ID.
            Our team responds within 24 hours.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Shipping
          </h3>

          <p className="text-sm text-gray-600">
            Orders are shipped within 4–6 working days. You will
            receive tracking details once dispatched.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Replacement
          </h3>

          <p className="text-sm text-gray-600">
            We only provide replacement for damaged or incorrect items.
            Contact us immediately with product images.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Contact
          </h3>

          <p className="text-sm text-gray-600">
            Email: mythstreetstore@gmail.com  
            <br/>
            WhatsApp: 9021943839  
            <br/>
            Instagram: @_myth.street_
          </p>
        </div>

      </div>

    </main>
  );
}