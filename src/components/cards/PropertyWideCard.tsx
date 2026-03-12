// src/components/cards/PropertyCardVariant.tsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaBed, FaRulerCombined, FaPhoneAlt, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { Property } from "../../types/properties";
import { getImageUrl } from "../../utils/getImageUrl";

const FALLBACK = "/placeholder.png";

// صور تجريبية محلية (من public/assets/images)
const LOCAL_IMAGES = [
  "/assets/images/property.webp",
  "/assets/images/imageSlideCard2.webp",
  "/assets/images/prop1.webp",
  "/assets/images/prop2.webp",
  "/assets/images/prop3.webp",
];

export default function PropertyCardVariant({
  property,
  dir = "ltr",
}: {
  property: Property;
  dir?: "ltr" | "rtl";
}) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation("properties");

  const statusKey = property.status?.toLowerCase().trim();

  // اختيار 3 صور مختلفة بطريقة deterministic بناءً على property.id
  // هذا يمنع تكرار نفس الصورة ثلاث مرات ويعطي كل عقار مزيج مختلف
  const images = useMemo(() => {
    const len = LOCAL_IMAGES.length;
    if (len === 0) return [];

    // لو عندنا id نستخدمه كبداية، وإلا نستخدم رقم عشوائي لمرة واحدة
    const start = typeof property.id === "number" ? (property.id % len) : Math.floor(Math.random() * len);

    // نأخذ ثلاث قيم متتابعة مع الدوران (wrap)
    const a = LOCAL_IMAGES[start];
    const b = LOCAL_IMAGES[(start + 1) % len];
    const c = LOCAL_IMAGES[(start + 2) % len];

    return [a, b, c];
  }, [property.id]);

  const mainImage = images[0] ?? FALLBACK;
  const smallThumbs = images.slice(1);

  const priceDisplay = property.price
    ? new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(Number(property.price))
    : "—";

  const priceWeekly = property.price_weekly ? `£${Number(property.price_weekly)} pw` : null;

  return (
    <article dir={dir} className="w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Images */}
        <div className="md:w-1/2 p-4">
          <div className="flex gap-3 items-start">
            {/* Main Image */}
            <div className="shrink-0 rounded-xl overflow-hidden shadow-sm w-[60%] md:w-3/5 h-56 md:h-52">
              <div className="relative h-full w-full bg-gray-100">
                <img
                  src={getImageUrl(mainImage) || FALLBACK}
                  alt={property.title ?? "property"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Status */}
                {property.status && (
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {statusKey ? t(`status.${statusKey}`) : "—"}
                  </div>
                )}

                {/* Featured */}
                {property?.featured && (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-yellow-400 text-xs font-semibold text-gray-900 px-2 py-0.5 rounded-md shadow">
                    {t("featured")}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-[40%] md:w-2/5">
              {smallThumbs.map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden h-16 shadow-sm">
                  <img
                    src={getImageUrl(img) || FALLBACK}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {smallThumbs.length === 0 &&
                Array(2)
                  .fill(null)
                  .map((_, idx) => (
                    <div key={idx} className="h-16 bg-gray-100 rounded-lg" />
                  ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-5 md:pl-6 md:pr-8 flex flex-col justify-between">
          <div>
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-[65%] md:max-w-[70%]">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{property.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{property.address ?? property.city ?? "—"}</p>
              </div>

              <div className="text-right">
                <div className="text-xl md:text-3xl font-bold text-primary">{priceDisplay}</div>
                {priceWeekly && <div className="text-xs text-gray-500 mt-0.5">{priceWeekly}</div>}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 text-gray-700 text-sm md:text-base">
              <div className="font-semibold text-gray-800 mb-1">{t("aboutProperty")}</div>
              <p className="text-gray-600">
                {property.description
                  ? expanded
                    ? property.description
                    : property.description.length > 280
                    ? property.description.slice(0, 280) + "..."
                    : property.description
                  : t("noDescription")}
                {property.description && property.description.length > 280 && (
                  <button onClick={() => setExpanded((s) => !s)} className="text-indigo-600 hover:underline text-sm ml-2">
                    {expanded ? t("readLess") : t("readMore")}
                  </button>
                )}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaBed className="text-indigo-600" />
                <span>{property.rooms ?? "—"} {t("rooms")}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-indigo-600" />
                <span>{property.area ?? "—"} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-600" />
                <span className="capitalize">{statusKey ? t(`status.${statusKey}`) : "—"}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a href={`tel:+000000000`} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white shadow hover:bg-primary-700 text-sm">
                <FaPhoneAlt /> {t("call")}
              </a>
              <Link to={`/properties/${property.id}`} className="inline-flex items-center gap-2 px-4 py-2 border border-primary-200 text-primary hover:bg-indigo-50 text-sm">
                {t("viewDetails")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}