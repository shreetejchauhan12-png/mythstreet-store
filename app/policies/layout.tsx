import Link from "next/link";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid md:grid-cols-[240px_1fr] gap-10">

        {/* sidebar */}
        <aside className="border rounded-xl p-4 h-fit">

          <h2 className="font-semibold mb-4">
            Policies
          </h2>

          <nav className="space-y-2 text-sm">

            <Link
              href="/policies/about"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              About
            </Link>

            <Link
              href="/policies/contact"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Contact
            </Link>

            <Link
              href="/policies/support"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Support
            </Link>

            <Link
              href="/policies/returns"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Returns
            </Link>

            <Link
              href="/policies/privacy"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Privacy
            </Link>

            <Link
              href="/policies/terms"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Terms
            </Link>

          </nav>

        </aside>

        {/* content */}
        <div>
          {children}
        </div>

      </div>

    </main>
  );
}