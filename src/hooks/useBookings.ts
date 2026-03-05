import { useEffect, useState } from "react";
import type { Booking } from "../types/api";
import { fetchBookings } from "../services/booking.service";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchBookings()
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { bookings, loading, error };
}