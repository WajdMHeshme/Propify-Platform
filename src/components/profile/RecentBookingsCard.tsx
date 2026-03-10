// src/components/profile/RecentBookingsCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { getImageUrl } from "../../utils/getImageUrl";
import type { RecentBookingsProps } from "../../types/ui";
import { useTranslation } from "react-i18next";

const RecentBookingsCard: React.FC<RecentBookingsProps> = ({ bookings = [], loading = false }) => {
  const { t, i18n } = useTranslation("profile"); // profile namespace
  const items = Array.isArray(bookings) ? bookings.slice(0, 5) : [];
  const isRTL = i18n.dir(i18n.language) === "rtl";

  const renderStatusIcon = (status?: string) => {
    const s = (status ?? "").toLowerCase();
    switch (s) {
      case "completed":
      case "done":
        return <FaCalendarCheck className="text-green-500 text-xl" aria-hidden />;
      case "pending":
      case "waiting":
        return <LuCalendarClock className="text-amber-500 text-xl" aria-hidden />;
      case "rejected":
      case "cancelled":
      case "canceled":
        return <FaCalendarTimes className="text-red-500 text-xl" aria-hidden />;
      default:
        return <FaCalendarCheck className="text-gray-400 text-xl" aria-hidden />;
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">{t("recentBookings")}</h3>
        <Link to="/bookings" className="text-sm text-primary hover:underline">
          {t("viewAll")}
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded" />
              <div className="flex-1">
                <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">{t("noRecentBookings")}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((b: any) => (
            <li
              key={b.id ?? `${b.property?.id}-${b.date_time ?? Math.random()}`}
              className="flex items-center gap-3"
            >
              <div className="w-14 h-14 rounded-md bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                {b.property?.images?.[0] ? (
                  <img
                    src={getImageUrl(b.property.images[0])}
                    alt={b.property?.title ?? t("property")}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    className="flex items-center justify-center w-full h-full"
                    aria-label={`booking status ${b.status ?? "unknown"}`}
                  >
                    {renderStatusIcon(b.status)}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`flex items-center justify-between ${
                    isRTL ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <p className="text-sm font-medium truncate text-gray-900">
                    {b.property?.title ?? t("property")}
                  </p>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span>{b.status ? t(`status.${b.status.toLowerCase()}`, b.status) : ""}</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {b.date_time
                    ? new Date(b.date_time).toLocaleString()
                    : b.created_at
                    ? new Date(b.created_at).toLocaleString()
                    : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentBookingsCard;