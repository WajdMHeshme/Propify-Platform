import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SharedHero from "../../sections/contact/SharedHero";
import PropertiesSection from "../../sections/properties/PropertiesSection";
import CallToAction from "../../sections/contact/call/CallToAction";
import type { PropertiesFilters } from "../../types/properties";

const PropertiesPage: React.FC = () => {
  const { t } = useTranslation("sharedHeroProperties");

  const [filters, setFilters] = useState<PropertiesFilters>({
    page: 1,
    limit: 4,
    city: undefined,
    min_price: undefined,
    max_price: undefined,
    status: undefined,
  });

  const handleFilterChange = useCallback(
    (f: { city?: string; price?: string; type?: string; status?: string }) => {
      let min_price: number | undefined;
      let max_price: number | undefined;

      if (f.price) {
        const p = f.price.trim();

        if (p.startsWith("<")) {
          max_price = Number(p.replace(/[^\d]/g, "")) || undefined;
        } else if (p.startsWith(">")) {
          min_price = Number(p.replace(/[^\d]/g, "")) || undefined;
        } else if (p.includes("-")) {
          const parts = p
            .replace(/\$/g, "")
            .split("-")
            .map((s) => Number(s.replace(/[^\d]/g, "")));

          min_price = parts[0] || undefined;
          max_price = parts[1] || undefined;
        }
      }

      setFilters((prev) => ({
        ...prev,
        page: 1,
        city: f.city || undefined,
        status: f.status || undefined,
        min_price,
        max_price,
      }));
    },
    []
  );

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SharedHero
        smallTitle={t("propertiesHero.smallTitle")}
        title={t("propertiesHero.title")}
        desc={t("propertiesHero.desc")}
        showFilter={true}
        onFilterChange={handleFilterChange}
      />

      <PropertiesSection filters={filters} onPageChange={handlePageChange} />

      <CallToAction />
    </>
  );
};

export default PropertiesPage;