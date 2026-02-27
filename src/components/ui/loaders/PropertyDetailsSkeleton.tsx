const PropertyDetailsSkeleton = () => {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Image */}
          <div className="w-full h-96 bg-gray-200 rounded-xl" />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3">
            <div className="h-20 w-28 bg-gray-200 rounded-lg" />
            <div className="h-20 w-28 bg-gray-200 rounded-lg" />
            <div className="h-20 w-28 bg-gray-200 rounded-lg" />
          </div>

          {/* Title */}
          <div className="h-8 w-2/3 bg-gray-200 rounded" />

          {/* Location */}
          <div className="h-4 w-1/3 bg-gray-200 rounded" />

          {/* Price */}
          <div className="h-6 w-1/4 bg-gray-200 rounded" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="h-10 bg-gray-200 rounded-lg" />
          <div className="h-10 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;