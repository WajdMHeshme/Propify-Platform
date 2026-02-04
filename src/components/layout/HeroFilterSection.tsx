import { useState } from "react";
import { FaCity, FaDollarSign, FaHome } from "react-icons/fa";
import type { FilterProps } from "../../types/ui";



const cities = ["New York", "Los Angeles", "Chicago", "Miami"];
const prices = ["< $1000", "$1000 - $3000", "$3000 - $5000", "> $5000"];
const types = ["Apartment", "House", "Villa", "Studio"];

const HeroFilterSection = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState({ city: "", price: "", type: "" });

  const handleChange = (key: "city" | "price" | "type", value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-white  bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 max-w-5xl mx-auto mt-8">
      
      {/* City Filter */}
      <div className="flex items-center gap-2 flex-1">
        <FaCity className="text-primary text-lg" />
        <select
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="flex items-center gap-2 flex-1">
        <FaDollarSign className="text-primary text-lg" />
        <select
          value={filters.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">Select Price</option>
          {prices.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2 flex-1">
        <FaHome className="text-primary text-lg" />
        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Button */}
      <button
        className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition transform hover:-translate-y-0.5"
        onClick={() => onFilterChange?.(filters)}
      >
        Filter
      </button>
    </div>
  );
};

export default HeroFilterSection;
