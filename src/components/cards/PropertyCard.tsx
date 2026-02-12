import type { PropertyCardProps } from "../../types/properties";
import { FaBed, FaRulerCombined, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={property.main_image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
