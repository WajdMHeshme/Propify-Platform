const PropertyCardSkeleton = () => {
  return (
    <div className="block bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
      
      {/* Image */}
      <div className="h-56 bg-gray-200 rounded-t-2xl" />

      {/* Content */}
      <div className="p-5 space-y-4">
        
        {/* Title + City */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Features */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;