// src/pages/profile/FavoritesPage.tsx
import { useFavorites } from "../../hooks/useFavorites";
import { FiInbox, FiMessageCircle } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BookingsSkeleton from "../../components/ui/loaders/BookingsSkeleton";
import PropertyCard from "../../components/cards/PropertyCard";
import { useState } from "react";

export default function FavoritesPage() {
  const { favorites, loading, error, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  // message: { type: 'success' | 'error', text: string }
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    // clear after 3s
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 mt-12">
          My Favorite Properties
        </h1>

        {/* inline toast / message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm font-medium ${
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading && <BookingsSkeleton />}

        {error && error.toString().toLowerCase().includes("unauthenticated") ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border-dashed border-3 border-gray-300">
            <MdOutlinePrivacyTip className="text-primary text-6xl mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              You should be logged in!
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Please log in to view your favorite properties.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white px-6 py-2 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white border border-primary text-primary px-6 py-2 rounded-lg"
              >
                Register
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
              No Favorites Found
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              You did not add any properties to favorites yet. Browse properties and add the ones you like!
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
                      // call removeFavorite with the fav.id (favorite entry id)
                      const resp = await removeFavorite(fav.property.id);
                      console.log("removeFavorite response:", resp)
                      // show server message if available
                      const text =
                        (resp && (resp.message || resp.data || JSON.stringify(resp))) ||
                        "Removed from favorites";
                      showMessage("success", String(text));
                    } catch (err: any) {
                      console.error("Failed to remove favorite:", err);
                      showMessage("error", err?.message || "Failed to remove favorite");
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