export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Terms & Conditions
      </h1>

      <div className="space-y-6 text-gray-700 leading-7">

        <p>
          By using MythStreet, you agree to the following terms and
          conditions. Please read them carefully before placing an order.
        </p>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Orders
          </h3>

          <p className="text-sm text-gray-600">
            All orders are processed after successful payment confirmation.
            We reserve the right to cancel or refuse any order if necessary.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Payments
          </h3>

          <p className="text-sm text-gray-600">
            We accept prepaid and Cash on Delivery (COD) orders. Orders
            will be processed once payment or confirmation is received.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Shipping
          </h3>

          <p className="text-sm text-gray-600">
            Orders are shipped within 4–6 working days. Delivery time
            may vary depending on location and courier services.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Cancellation
          </h3>

          <p className="text-sm text-gray-600">
            Orders cannot be cancelled once placed. Please review your
            order carefully before confirming.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Replacement
          </h3>

          <p className="text-sm text-gray-600">
            We only provide replacement for damaged, defective, or
            incorrect items. No returns are accepted.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Contact
          </h3>

          <p className="text-sm text-gray-600">
            Email: mythstreetstore@gmail.com  
            <br />
            WhatsApp: 9021943839
          </p>
        </div>

      </div>

    </main>
  );
}