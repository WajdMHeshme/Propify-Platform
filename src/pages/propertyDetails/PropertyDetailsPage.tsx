// src/pages/propertyDetails/PropertyDetailsPage.tsx
import { useEffect, type JSX } from "react";
import {
  FaBed,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCouch,
  FaTree,
  FaArrowUp,
  FaCar,
} from "react-icons/fa";
import {
  FiPhone,
  FiShare2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";
import { RiHeartAdd2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { usePropertyDetails } from "../../hooks/usePropertyDetails";
import "flatpickr/dist/flatpickr.min.css";
import PropertyDetailsSkeleton from "../../components/ui/loaders/PropertyDetailsSkeleton";

const amenityIcons: Record<string, JSX.Element> = {
  Furnished: <FaCouch className="text-indigo-500" />,
  Garden: <FaTree className="text-green-500" />,
  Elevator: <FaArrowUp className="text-gray-600" />,
  Parking: <FaCar className="text-yellow-500" />,
};

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    prop,
    gallery,
    activeIdx,
    setActiveIdx,
    lightboxOpen,
    setLightboxOpen,
    dateInputRef,
    formatPrice,
    isLoading,
    isError,
  } = usePropertyDetails(id!);

  useEffect(() => setActiveIdx(0), [prop?.main_image, setActiveIdx]);

  if (isLoading)
    if (isLoading) return <PropertyDetailsSkeleton />;

  if (isError || !prop)
    return (
      <div className="p-10 text-center text-red-500 font-semibold text-lg">
        Property Not Found
      </div>
    );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Property Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src={gallery[activeIdx]}
              alt={prop.title}
              className="w-full h-96 object-cover cursor-zoom-in rounded-xl"
              onClick={() => setLightboxOpen(true)}
            />
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto mt-3 py-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-20 w-28 rounded-lg overflow-hidden border-2 focus:outline-none transition-transform transform hover:scale-105 ${
                    activeIdx === idx
                      ? "border-indigo-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${prop.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="space-y-5 mt-4">
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                prop.status === "booked"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {prop.status.toUpperCase()}
            </span>

            <h1 className="text-4xl font-bold text-gray-800">{prop.title}</h1>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <FaMapMarkerAlt /> <span className="text-sm">{prop.city}</span>
            </div>

            <div className="text-3xl font-extrabold text-indigo-600 mt-2">
              {formatPrice(prop.price)}
            </div>

            <p className="mt-4 text-gray-700 text-base leading-relaxed">{prop.description}</p>

            {/* Property Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaBed className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">{prop.rooms} Rooms</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaRulerCombined className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">{prop.area} m²</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaMapMarkerAlt className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">{prop.address}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h2>
              {/* Grid for large screens */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {prop.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-tr from-white to-white/95 border border-gray-100 shadow-sm hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    title={amenity}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 text-xl shrink-0">
                      {amenityIcons[amenity] || <FaMapMarkerAlt />}
                    </div>
                    <span className="text-gray-800 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
              {/* Horizontal scroll for small screens */}
              <div className="sm:hidden flex gap-3 overflow-x-auto py-2 -ml-1">
                {prop.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 min-w-30 flex items-center gap-2 p-3 rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm hover:shadow-md hover:scale-105 transition-transform cursor-pointer"
                    title={amenity}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 text-lg">
                      {amenityIcons[amenity] || <FaMapMarkerAlt />}
                    </div>
                    <span className="text-sm font-medium truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Booking Form */}
{/* RIGHT: Booking Form */}
<div className="relative ">
  <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-4 border-2 border-gray-200 rounded-2xl p-6">
    <div className="bg-white rounded-2xl  p-6 space-y-4">
      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform">
        <FiPhone /> Request a Visit
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-red-50 transition-colors">
          <RiHeartAdd2Line /> Save
        </button>
        <button className="py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl hover:bg-blue-50 transition-colors">
          <FiShare2 /> Share
        </button>
      </div>

      <hr className="border-gray-200 my-4" />

      <h3 className="font-semibold text-lg text-gray-800">Request Booking</h3>
      <div className="relative">
        <input
          ref={dateInputRef}
          type="text"
          placeholder="Choose date & time"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          readOnly
        />
        <FiCalendar className="absolute right-3 top-3 text-gray-400" />
      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-3 hover:scale-105 transition-transform">
        Send Booking Request
      </button>
    </div>
  </div>
</div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <img
              src={gallery[activeIdx]}
              className="w-full h-[70vh] object-contain rounded-lg"
              alt={`${prop.title} fullscreen`}
            />

            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <FiX />
            </button>

            <button
              onClick={() =>
                setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length)
              }
              className="absolute left-4 top-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Previous"
            >
              <FiChevronLeft />
            </button>

            <button
              onClick={() =>
                setActiveIdx((i) => (i + 1) % gallery.length)
              }
              className="absolute right-4 top-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Next"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}