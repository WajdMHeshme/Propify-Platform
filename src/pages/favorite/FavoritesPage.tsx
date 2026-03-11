// src/pages/profile/FavoritesPage.tsx
import { useFavorites } from "../../hooks/useFavorites";
import { FiInbox } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropertyCardSkeleton from "../../components/ui/loaders/PropertyCardSkeleton";
import { useState } from "react";
import PropertyCard from "../../components/cards/PropertyCard";
import { useTranslation } from "react-i18next";

export default function FavoritesPage() {
  const { favorites, loading, error, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation("properties");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 mt-12" data-aos="fade-down">
          {t("favorites.title")}
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && error.toString().toLowerCase().includes("unauthenticated") ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border-dashed border-3 border-gray-300">
            <MdOutlinePrivacyTip className="text-primary text-6xl mb-6" />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {t("favorites.loginRequired")}
            </h2>

            <p className="text-gray-500 text-center max-w-md mb-6">
              {t("favorites.loginMessage")}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white px-6 py-2 rounded-lg"
              >
                {t("auth.login")}
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-white border border-primary text-primary px-6 py-2 rounded-lg"
              >
                {t("auth.register")}
              </button>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 font-semibold text-center py-8">{error}</p>
        ) : null}

        {!loading && !error && favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border-2 border-dashed border-primary">
            <FiInbox className="text-primary text-6xl mb-6" />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {t("favorites.emptyTitle")}
            </h2>

            <p className="text-gray-500 text-center max-w-md">
              {t("favorites.emptyMessage")}
            </p>
          </div>
        )}

        {!loading && !error && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative group">
                <PropertyCard
                  property={fav.property}
                  isFavorite={true}
                  onToggleFavorite={async () => {
                    try {
                      const resp = await removeFavorite(fav.property.id);

                      const text =
                        (resp &&
                          (resp.message ||
                            resp.data ||
                            JSON.stringify(resp))) ||
                        t("favorites.removed");

                      showMessage("success", String(text));
                    } catch (err: any) {
                      showMessage(
                        "error",
                        err?.message || t("favorites.removeError")
                      );
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}