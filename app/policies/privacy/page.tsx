export default function PrivacyPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-7">

        <p>
          At MythStreet, we respect your privacy and are committed to
          protecting your personal information. This policy explains how
          we collect and use your data.
        </p>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Information We Collect
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
            <li>Name and contact details</li>
            <li>Shipping address</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Order details</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            How We Use Your Information
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
            <li>To process your orders</li>
            <li>To provide customer support</li>
            <li>To improve our services</li>
            <li>To send order updates</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Data Protection
          </h3>

          <p className="text-sm text-gray-600">
            Your personal information is kept secure and is never sold
            or shared with third parties except for shipping and payment
            processing.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Cookies
          </h3>

          <p className="text-sm text-gray-600">
            We may use cookies to enhance your browsing experience
            and improve our website performance.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-medium mb-2">
            Contact
          </h3>

          <p className="text-sm text-gray-600">
            If you have any questions regarding privacy, contact us at
            mythstreetstore@gmail.com
          </p>
        </div>

      </div>

    </main>
  );
}
