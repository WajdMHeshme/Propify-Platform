// components/sections/HeroFilterSection.tsx
import { useState } from "react";
import { FaCity, FaDollarSign, FaHome } from "react-icons/fa";
import type { FilterProps } from "../../types/ui";

const cities = ["Lattakia", "Aleppo", "Homs", "Damascus"];
const prices = ["< $1000", "$1000 - $3000", "$3000 - $5000", "> $5000"];
const statuses = ["available", "rented"]; // استبدلنا types بـ statuses

type Props = FilterProps & {
  hidden?: boolean; //
};

const HeroFilterSection = ({ onFilterChange, hidden = false }: Props) => {
  if (hidden) return null;

  const [filters, setFilters] = useState({ city: "", price: "", status: "" });

  const handleChange = (key: "city" | "price" | "status", value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
      {/* City */}
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

      {/* Price */}
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

      {/* Status (replaced Type) */}
      <div className="flex items-center gap-2 flex-1">
        <FaHome className="text-primary text-lg" />
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">Select Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

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