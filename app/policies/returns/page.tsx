export default function ReturnsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Returns & Replacement
      </h1>

      <div className="space-y-6 text-gray-700 leading-7">

        <p>
          MythStreet does not offer returns. We only provide replacement
          in case of damaged, defective, or incorrect products.
        </p>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Replacement Conditions
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
            <li>Product received damaged</li>
            <li>Wrong product delivered</li>
            <li>Manufacturing defect</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Replacement Process
          </h3>

          <p className="text-sm text-gray-600">
            Contact us with your order ID and product images.
            Our team will verify and process replacement quickly.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Important Notes
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
            <li>No returns accepted</li>
            <li>No cancellations once order is placed</li>
            <li>Replacement only after verification</li>
            <li>Product must be unused</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Contact
          </h3>

          <p className="text-sm text-gray-600">
            mythstreetstore@gmail.com  
            <br/>
            WhatsApp: 9021943839
          </p>
        </div>

      </div>

    </main>
  );
}