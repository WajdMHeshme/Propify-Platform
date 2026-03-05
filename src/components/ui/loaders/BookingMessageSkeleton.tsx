import React from "react";

const BookingMessagesSkeleton: React.FC = () => {
  return (
    <div className="px-6 py-6 space-y-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-start">
          <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl bg-gray-200 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-32" />
            <div className="h-3 bg-gray-300 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingMessagesSkeleton;
