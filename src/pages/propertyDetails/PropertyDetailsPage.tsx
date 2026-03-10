// src/pages/propertyDetails/PropertyDetailsPage.tsx
import { useEffect, useRef, type JSX } from "react";
import {
  FaBed,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCouch,
  FaTree,
  FaArrowUp,
  FaCar,
} from "react-icons/fa";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { usePropertyDetails } from "../../hooks/usePropertyDetails";
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from "flatpickr";
import PropertyDetailsSkeleton from "../../components/ui/loaders/PropertyDetailsSkeleton";
import BookingForm from "../../components/layout/BookingForm";
import { useTranslation } from "react-i18next";

const amenityIcons: Record<string, JSX.Element> = {
  Furnished: <FaCouch className="text-indigo-500" />,
  Garden: <FaTree className="text-green-500" />,
  Elevator: <FaArrowUp className="text-gray-600" />,
  Parking: <FaCar className="text-yellow-500" />,
};

export default function PropertyDetailsPage() {
  const { t } = useTranslation("properties");
  const { id } = useParams<{ id: string }>();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const {
    prop,
    gallery,
    activeIdx,
    setActiveIdx,
    lightboxOpen,
    setLightboxOpen,
    formatPrice,
    isLoading,
    isError,
  } = usePropertyDetails(id!);

  useEffect(() => setActiveIdx(0), [prop?.main_image, setActiveIdx]);

  useEffect(() => {
    if (dateInputRef.current) {
      Flatpickr(dateInputRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      });
    }
  }, []);

  if (isLoading) return <PropertyDetailsSkeleton />;
  if (isError || !prop)
    return (
      <div className="p-10 text-center text-red-500 font-semibold text-lg">
        {t("propertyNotFound")}
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
              className="w-full h-[450px] md:h-[500px] object-cover cursor-zoom-in rounded-xl"
              onClick={() => setLightboxOpen(true)}
            />
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-20 w-full rounded-lg overflow-hidden border-2 focus:outline-none transition-transform transform hover:scale-105 ${
                    activeIdx === idx
                      ? "border-indigo-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`${t("showImage")} ${idx + 1}`}
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
              {t(`status.${prop.status.toLowerCase()}`)}
            </span>

            <h1 className="text-4xl font-bold text-gray-800">{prop.title}</h1>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <FaMapMarkerAlt /> <span className="text-sm">{prop.city}</span>
            </div>

            <div className="text-3xl font-extrabold text-indigo-600 mt-2">
              {formatPrice(prop.price)}
            </div>

            <p className="mt-4 text-gray-700 text-base leading-relaxed">
              {prop.description ?? t("noDescription")}
            </p>

            {/* Property Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaBed className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">
                  {prop.rooms ?? "—"} {t("rooms")}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaRulerCombined className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">
                  {prop.area ?? "—"} m²
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition">
                <FaMapMarkerAlt className="text-indigo-500 w-6 h-6" />
                <span className="text-gray-700 font-medium">{prop.address}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t("amenities")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {prop.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    title={amenity}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 text-xl shrink-0">
                      {amenityIcons[amenity] || <FaMapMarkerAlt />}
                    </div>
                    <span className="text-gray-800 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <BookingForm dateInputRef={dateInputRef} propertyId={prop.id} />
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl">
            <img
              src={gallery[activeIdx]}
              className="w-full h-[70vh] object-contain rounded-lg mb-3"
              alt={`${prop.title} fullscreen`}
            />

            {/* Thumbnails in Lightbox */}
            <div className="flex gap-2 overflow-x-auto mt-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-16 w-24 rounded-lg overflow-hidden border-2 ${
                    activeIdx === idx ? "border-indigo-500" : "border-transparent"
                  }`}
                  aria-label={`${t("showImage")} ${idx + 1}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`thumb-${idx}`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label={t("close")}
            >
              <FiX />
            </button>
            <button
              onClick={() =>
                setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length)
              }
              className="absolute left-4 top-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label={t("previous")}
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i + 1) % gallery.length)}
              className="absolute right-4 top-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label={t("next")}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}