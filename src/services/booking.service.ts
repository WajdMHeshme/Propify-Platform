// src/services/api/booking.service.ts
import { api } from "./api/api";
import type { Booking, Message } from "../types/api";

// ===== Fetch bookings =====
export async function fetchBookings(): Promise<Booking[]> {
  try {
    const response = await api.get<{ data: Booking[] }>("/bookings");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch bookings");
  }
}


// src/services/booking.service.ts (جزء getMessages)
export const getMessages = async (bookingId: number): Promise<Message[]> => {
  try {
    const response = await api.get(`/bookings/${bookingId}/messages`);
    const raw = response?.data ?? [];
    if (!Array.isArray(raw)) return [];

    return raw.map((msg: any) => ({
      id: msg.id,
      booking_id: msg.booking_id,
      sender_id: msg.sender_id,
      message: msg.message ?? msg.content ?? "",
      created_at: msg.created_at ?? msg.createdAt ?? null,
      updated_at: msg.updated_at ?? msg.updatedAt ?? null,
      sender: msg.sender ?? { id: msg.sender_id ?? -1, name: msg.sender?.name ?? "Unknown" },
    }));
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch messages");
  }
};

// ===== Send a message for a booking =====
export const sendMessage = async (
  bookingId: number,
  message: string
): Promise<void> => {
  try {
    await api.post(`/bookings/${bookingId}/messages`, { message });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};