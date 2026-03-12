// src/components/cards/PropertyCard.tsx
import { useEffect, useState, useMemo, useRef } from "react";
import { FaBed, FaRulerCombined, FaDollarSign, FaHeart as FaHeartSolid } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Props } from "../../types/properties";
import { getImageUrl } from "../../utils/getImageUrl";
import { pickRandomImages } from "../../utils/imagePicker";

const FALLBACK = "/placeholder.png";

const PropertyCard = ({ property, isFavorite, onToggleFavorite }: Props) => {
  const [fav, setFav] = useState<boolean>(!!isFavorite);
  const { t } = useTranslation("properties");

  useEffect(() => {
    if (typeof isFavorite !== "undefined") setFav(!!isFavorite);
  }, [isFavorite]);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    (e as any).preventDefault?.();
    const newVal = !fav;
    setFav(newVal);
    if (onToggleFavorite) onToggleFavorite(property?.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleToggle(e);
  };

  const priceDisplay =
    property.price && !isNaN(Number(property.price))
      ? new Intl.NumberFormat(undefined, { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(Number(property.price))
      : "—";

  // لو property.id موجود نستخدمه كـ seed عشان selection ثابت ومختلف لكل كارد
  // لو غير موجود نستخدم useRef(seed) عشان يظل ثابت طوال عمر الكومبوننت
  const fallbackSeedRef = useRef<number>(Math.floor(Math.random() * 1_000_000));
  const seed = typeof property.id === "number" ? property.id : fallbackSeedRef.current;

  const [mainImage, secondImage] = useMemo(() => {
    // **مهم**: لا نستخدم أي صورة قادمة من السيرفر هنا — نأخذ الصور فقط من LOCAL_IMAGES
    const imgs = pickRandomImages(seed, 2); // deterministic per seed
    return [getImageUrl(imgs[0]), imgs[1] ? getImageUrl(imgs[1]) : null];
  }, [seed]);

  return (
    <Link to={`/properties/${property.id}`} className="group relative block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={mainImage ?? FALLBACK}
          alt={property.title}
          onError={(e) => {
            // لو حصل 404 أو مشكلة، نرجع الفالباك المحلي
            (e.currentTarget as HTMLImageElement).src = FALLBACK;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* صورة ثانوية صغيرة */}
        {secondImage && (
          <div className="absolute bottom-3 right-3 w-20 h-12 overflow-hidden rounded-md shadow-md border border-white">
            <img
              src={secondImage}
              alt="thumb"
              onError={(e) => (e.currentTarget as HTMLImageElement).src = FALLBACK}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Favorite */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-pressed={fav}
          aria-label={fav ? t("removeFavorite") : t("addFavorite")}
          title={fav ? t("removeFavorite") : t("addFavorite")}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition ${fav ? "bg-primary text-white hover:opacity-90" : "bg-white text-primary hover:bg-primary/10"}`}
        >
          {fav ? <FaHeartSolid size={16} /> : <FiHeart size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{property.title}</h3>
          <p className="text-sm text-gray-500">{property.city ?? "—"}</p>
        </div>

        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <FaBed className="text-primary" />
            <span>{property.rooms ?? "—"} {t("rooms")}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-primary" />
            <span>{property.area ?? "—"} m²</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign className="text-primary" />
            <span>{priceDisplay}</span>
          </div>
        </div>

        <div className="mt-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg py-2 text-center transition-colors duration-300">{t("viewDetails")} →</div>
      </div>
    </Link>
  );
};

export default PropertyCard;