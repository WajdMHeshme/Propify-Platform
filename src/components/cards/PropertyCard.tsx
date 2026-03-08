// src/components/cards/PropertyCard.tsx
import type { PropertyCardProps } from "../../types/properties";
import { FaBed, FaRulerCombined, FaDollarSign, FaHeart as FaHeartSolid } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = PropertyCardProps & {
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: number | string) => void;
};

const PropertyCard = ({ property, isFavorite, onToggleFavorite }: Props) => {
  const [fav, setFav] = useState<boolean>(!!isFavorite);

  useEffect(() => {
    if (typeof isFavorite !== "undefined") {
      setFav(!!isFavorite);
    }
  }, [isFavorite]);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    // stop link navigation
    e.stopPropagation();
    // MouseEvent has preventDefault, KeyboardEvent too — cast to any to be safe
    (e as any).preventDefault?.();

    const newVal = !fav;
    setFav(newVal);

    if (onToggleFavorite) {
      onToggleFavorite(property?.id );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleToggle(e);
    }
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group relative block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={`http://127.0.0.1:8000/storage/${property.main_image}`}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite button (top-right on image) */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-pressed={fav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          title={fav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition 
            ${fav ? "bg-primary text-white hover:opacity-90" : "bg-white text-primary hover:bg-primary/10"}`}
          // prevent the button itself from being focused as a link when tabbing the Link
        >
          {fav ? <FaHeartSolid size={16} /> : <FiHeart size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500">{property.city}</p>
        </div>

        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <FaBed className="text-primary" />
            <span>{property.rooms} Rooms</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-primary" />
            <span>{property.area} m²</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign className="text-primary" />
            <span>{property.price}</span>
          </div>
        </div>

        <div className="mt-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg py-2 text-center transition-colors duration-300">
          View Details →
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;