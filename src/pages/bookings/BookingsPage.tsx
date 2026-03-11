// src/pages/profile/PreviousBookingsPage.tsx
import { useBookings } from "../../hooks/useBookings";
import { FiInbox, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BookingsSkeleton from "../../components/ui/loaders/BookingsSkeleton";
import { useTranslation } from "react-i18next";

export default function BookingsPage() {
  const { bookings, loading, error } = useBookings();
  const navigate = useNavigate();
  const { t } = useTranslation("bookings");

  const formatDate = (iso?: string) => {
    if (!iso) return t("na");
    return new Date(iso).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 mt-12" data-aos="fade-down">
          {t("previousBookingsTitle")}
        </h1>

        {loading && <BookingsSkeleton />}

        {error && String(error).toLowerCase().includes("unauthenticated") ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border-dashed border-3 border-gray-300">
            <MdOutlinePrivacyTip className="text-primary text-6xl mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {t("mustBeLoggedInTitle")}
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
              {t("mustBeLoggedInDesc")}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-primary  text-white px-6 py-2"
              >
                {t("login")}
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white border border-primary text-primary px-6 py-2"
              >
                {t("register")}
              </button>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 font-semibold text-center py-8">
            {String(error)}
          </p>
        ) : null}

        {!loading && !error && bookings?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border-2 border-dashed border-primary">
            <FiInbox className="text-primary text-6xl mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {t("noBookingsTitle")}
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              {t("noBookingsDesc")}
            </p>
          </div>
        )}

        {!loading && !error && bookings && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking: any) => {
              const status = (booking.status ?? "").toLowerCase();
              const statusColor =
                status === "approved" || status === "completed"
                  ? "bg-green-100 text-green-800"
                  : status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800";

              return (
                <div
                  key={booking.id}
                  className="flex justify-between items-center bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition"
                >
                  {/* Booking Content */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar / Initial */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                      {booking.property?.title ? booking.property.title.charAt(0) : "P"}
                    </div>

                    {/* Booking Info */}
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <span className="font-semibold text-gray-800">
                          {booking.property?.title ?? t("property")}
                        </span>
                        <span className="text-gray-400">|</span>
                        {booking.property?.city && (
                          <span className="flex items-center gap-1 text-gray-500">
                            <FiMapPin className="inline-block" /> {booking.property.city}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {t("scheduled")}: {formatDate(booking.scheduled_at)}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                      >
                        {booking.status
                          ? t(`status.${status}`, booking.status.charAt(0).toUpperCase() + booking.status.slice(1))
                          : ""}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {status === "pending" && (
                      <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
                        {t("makePayment")}
                      </button>
                    )}

                    {/* Message Icon */}
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}/messages`)}
                      className="shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/40 transition"
                      title={t("viewMessages")}
                    >
                      <FiMessageCircle size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}