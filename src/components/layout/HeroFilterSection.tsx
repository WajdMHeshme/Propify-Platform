import { useState } from "react";
import { FaCity, FaDollarSign, FaHome } from "react-icons/fa";
import type { HeroFilterProps } from "../../types/ui";
import { useTranslation } from "react-i18next";

type Option = {
  value: string;
  label: string;
};

const HeroFilterSection = ({ onFilterChange, hidden = false }: HeroFilterProps) => {
  const { t } = useTranslation("filter");

  if (hidden) return null;

  const [filters, setFilters] = useState({
    city: "",
    price: "",
    status: "",
  });

  const handleChange = (key: "city" | "price" | "status", value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  // Cities
  const cities = (t("heroFilter.cities", { returnObjects: true }) as Option[]) || [];

  // Prices (string)
  const prices = (t("heroFilter.prices", { returnObjects: true }) as string[]) || [];

  // Status
  const statuses = (t("heroFilter.statuses", { returnObjects: true }) as Option[]) || [];

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
          <option value="">{t("heroFilter.placeholders.city")}</option>

          {cities.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
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
          <option value="">{t("heroFilter.placeholders.price")}</option>

          {prices.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 flex-1">
        <FaHome className="text-primary text-lg" />

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">{t("heroFilter.placeholders.status")}</option>

          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Button */}
      <button
        className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition transform hover:-translate-y-0.5"
        onClick={() => onFilterChange?.(filters)}
      >
        {t("heroFilter.button")}
      </button>
    </div>
  );
};

export default HeroFilterSection;