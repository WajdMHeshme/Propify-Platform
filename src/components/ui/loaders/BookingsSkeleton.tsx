import React from "react";

const BookingsSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white shadow-sm rounded-xl p-4"
        >
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-200" />

            {/* Text */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-28 bg-gray-200 rounded-lg" />
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsSkeleton;