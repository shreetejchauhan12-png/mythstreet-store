export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">

      <div className="grid md:grid-cols-2 gap-10">

        {/* image */}
        <div>
          <div className="bg-gray-200 h-125 rounded-lg" />

          <div className="grid grid-cols-4 gap-3 mt-3">
            <div className="bg-gray-200 h-20" />
            <div className="bg-gray-200 h-20" />
            <div className="bg-gray-200 h-20" />
            <div className="bg-gray-200 h-20" />
          </div>
        </div>

        {/* content */}
        <div>
          <div className="bg-gray-200 h-8 w-2/3 mb-4" />
          <div className="bg-gray-200 h-6 w-32 mb-6" />

          <div className="flex gap-3 mb-6">
            <div className="bg-gray-200 h-10 w-12" />
            <div className="bg-gray-200 h-10 w-12" />
            <div className="bg-gray-200 h-10 w-12" />
            <div className="bg-gray-200 h-10 w-12" />
          </div>

          <div className="bg-gray-200 h-12 mb-3" />
          <div className="bg-gray-200 h-12 mb-6" />

          <div className="bg-gray-200 h-24 rounded-lg" />
        </div>

      </div>
    </div>
  );
}