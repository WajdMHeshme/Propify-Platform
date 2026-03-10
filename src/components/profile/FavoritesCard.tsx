// src/components/profile/FavoritesCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";
import type { FavProps } from "../../types/ui";
import { useTranslation } from "react-i18next";

const FavoritesCard: React.FC<FavProps> = ({ favorites = [], loading = false }) => {
  const { t } = useTranslation("profile"); // namespace "profile"
  const items = Array.isArray(favorites) ? favorites.slice(0, 6) : [];

  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">{t("favorites")}</h3>
        <div className="flex items-center gap-3">
          <Link to="/favorites" className="text-sm text-primary hover:underline">
            {t("viewAll")}
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">{t("noFavorites")}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {items.map((f: any) => {
            const prop = f.property ?? f;
            return (
              <Link
                key={f.id ?? prop.id}
                to={`/properties/${prop.id}`}
                className="block rounded-lg overflow-hidden border border-gray-100 hover:shadow transition"
              >
                <div className="w-full h-28 bg-gray-100">
                  {prop.images?.[0] ? (
                    <img
                      src={getImageUrl(prop.images[0])}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>

                <div className="p-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {prop.title ?? t("property")}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{prop.address ?? ""}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesCard;