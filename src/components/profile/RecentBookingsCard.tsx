// src/components/profile/RecentBookingsCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";
import { getImageUrl } from "../../utils/getImageUrl";

type Props = {
  bookings: any[];
  loading?: boolean;
};

const RecentBookingsCard: React.FC<Props> = ({ bookings = [], loading = false }) => {
  const items = Array.isArray(bookings) ? bookings.slice(0, 5) : [];

  return (
    <div className="bg-white shadow rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">Recent Bookings</h3>
        <Link to="/bookings" className="text-sm text-primary hover:underline">View All</Link>
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
        <p className="text-sm text-gray-500">No recent bookings found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((b: any) => (
            <li key={b.id ?? `${b.property?.id}-${b.date_time ?? Math.random()}`} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-md bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                {b.property?.images?.[0] ? (
                  <img
                    src={getImageUrl(b.property.images[0])}
                    alt={b.property?.title ?? "property"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaCalendarCheck className="text-primary text-xl" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate text-gray-900">{b.property?.title ?? "Property"}</p>
                  <span className="text-xs text-gray-400">{b.status ?? ""}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {b.date_time ? new Date(b.date_time).toLocaleString()
                    : b.created_at ? new Date(b.created_at).toLocaleString()
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