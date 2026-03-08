import React, { useState, useCallback } from "react";
import SharedHero from "../../sections/contact/SharedHero";
import PropertiesSection from "../../sections/properties/PropertiesSection";
import type { PropertiesFilters } from "../../hooks/useProperties";
import CallToAction from "../../sections/contact/call/CallToAction";

const PropertiesPage: React.FC = () => {
  // central filters state (parent)
  const [filters, setFilters] = useState<PropertiesFilters>({
    page: 1,
    limit: 4,
    city: undefined,
    min_price: undefined,
    max_price: undefined,
    status: undefined,
  });

  // callback passed to SharedHero
  const handleFilterChange = useCallback((f: { city?: string; price?: string; type?: string; status?: string }) => {
    // map price text to min/max (if your UI uses ranges like "< $1000", "$1000 - $3000", etc)
    let min_price: number | undefined = undefined;
    let max_price: number | undefined = undefined;

    if (f.price) {
      const p = f.price.trim();
      if (p.startsWith("<")) {
        max_price = Number(p.replace(/[^\d]/g, "")) || undefined;
      } else if (p.startsWith(">")) {
        min_price = Number(p.replace(/[^\d]/g, "")) || undefined;
      } else if (p.includes("-")) {
        const parts = p.replace(/\$/g, "").split("-").map(s => Number(s.replace(/[^\d]/g,"")));
        min_price = parts[0] || undefined;
        max_price = parts[1] || undefined;
      }
    }

    setFilters(prev => ({
      ...prev,
      page: 1, // reset to first page on new filter
      city: f.city || undefined,
      status: f.status || prev.status,
      min_price,
      max_price,
    }));
  }, []);

  // page change handler (passed to section)
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    // optionally scroll or do other side effects
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SharedHero
        smallTitle="Properties"
        title="Find your next home"
        desc="Browse properties by city, price and type"
        showFilter={true}
        onFilterChange={handleFilterChange}
      />

      <PropertiesSection filters={filters} onPageChange={handlePageChange} />

      <CallToAction />
    </>
  );
};

export default PropertiesPage;