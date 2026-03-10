// src/hooks/useBookingMessages.ts
import { useEffect, useState } from "react";
import { getMessages } from "../services/booking.service";
import type { Message } from "../types/api";

export const useBookingMessages = (bookingId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.debug("[useBookingMessages] fetching messages for bookingId:", bookingId);
      const data = await getMessages(bookingId);
      console.debug("[useBookingMessages] received messages:", data);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("[useBookingMessages] fetch error:", err);
      setError(err?.message || "Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId == null || !Number.isFinite(bookingId)) {
      console.warn("[useBookingMessages] invalid bookingId, skipping fetch:", bookingId);
      setLoading(false);
      return;
    }
    fetchMessages();
  }, [bookingId]);

  return { messages, loading, error, refresh: fetchMessages };
};