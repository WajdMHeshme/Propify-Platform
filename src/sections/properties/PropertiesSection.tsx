import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProperties, type PropertiesFilters } from "../../hooks/useProperties";
import PropertyWideCard from "../../components/cards/PropertyWideCard";
import { CardSkeleton } from "../../components/ui/loaders/CardSkeleton";
import type { Property } from "../../types/properties";

type Props = {
  filters: PropertiesFilters;
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<{
  current: number;
  last: number;
  onChange: (page: number) => void;
}> = ({ current, last, onChange }) => {
  const { t } = useTranslation("properties");

  const pages = useMemo(() => {
    const result: (number | "…")[] = [];
    if (last <= 7) {
      for (let i = 1; i <= last; i++) result.push(i);
      return result;
    }
    const left = Math.max(2, current - 1);
    const right = Math.min(last - 1, current + 1);
    result.push(1);
    if (left > 2) result.push("…");
    for (let i = left; i <= right; i++) result.push(i);
    if (right < last - 1) result.push("…");
    result.push(last);
    return result;
  }, [current, last]);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="px-3 py-1 rounded-md border shadow-sm bg-white disabled:opacity-50"
      >
        {t("prev")}
      </button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`dot-${idx}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(Number(p))}
            aria-current={p === current ? "page" : undefined}
            className={`px-3 py-1 rounded-md border shadow-sm ${p === current ? "bg-primary text-white" : "bg-white"}`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(last, current + 1))}
        disabled={current === last}
        className="px-3 py-1 rounded-md border shadow-sm bg-white disabled:opacity-50"
      >
        {t("next")}
      </button>
    </nav>
  );
};

export const PropertiesSection: React.FC<Props> = ({ filters, onPageChange }) => {
  const { t } = useTranslation("properties");

  const { data, isLoading, isError, isFetching } = useProperties(filters);

  const properties: Property[] = data?.data ?? [];
  const meta = data?.meta ?? (data as any) ?? {};
  const currentPage = meta?.current_page ?? meta?.current ?? (filters.page ?? 1);
  const lastPage = meta?.last_page ?? meta?.last ?? 1;

  return (
    <section className="py-12 w-full px-6 lg:px-16 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          {t("title")}
        </h2>

        <div className="text-sm text-gray-500">
          {isFetching
            ? t("updating")
            : t("pageInfo", { current: currentPage, total: lastPage })}
        </div>
      </div>

      {isError && (
        <div className="text-center py-10 text-red-500">
          {t("loadError")}
        </div>
      )}

      <div className="flex flex-col space-y-6">
        {isLoading && !properties.length
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : properties.map((property: Property) => (
              <PropertyWideCard key={property.id} property={property} />
            ))}
      </div>

      {!isLoading && properties.length > 0 && (
        <PaginationControls
          current={Number(currentPage)}
          last={Number(lastPage)}
          onChange={(p) => onPageChange(p)}
        />
      )}
    </section>
  );
};

export default PropertiesSection;