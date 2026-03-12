// src/components/layout/PropertyImages.tsx
import React from "react";

export const PropertyImages: React.FC<{
  main_image?: string | null;
  images?: string[];
}> = ({ main_image, images }) => {
  const allImages = [main_image, ...(images ?? [])].filter(Boolean) as string[];
  const MAX = 4;
  const displayImages = allImages.slice(0, MAX);
  const extraCount = allImages.length - MAX;
  const FALLBACK_IMAGE = "/placeholder.png";

  // Base URL من env
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  const getImageUrl = (path?: string | null) => {
    if (!path) return FALLBACK_IMAGE;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/storage/${path}`;
  };

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-56 md:h-full">
      {/* Main Image */}
      {displayImages[0] && (
        <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl shadow-sm group">
          <img
            src={getImageUrl(displayImages[0])}
            alt="main-property"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Small Images */}
      {displayImages.slice(1).map((img, idx) => {
        const isLast = idx === 2 && extraCount > 0;
        return (
          <div key={idx} className="relative overflow-hidden rounded-xl shadow-sm group">
            <img
              src={getImageUrl(img)}
              alt={`property-${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {isLast && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                +{extraCount}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};