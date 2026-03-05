// src/types/api.ts
export interface Booking {
  id: number;
  property_name: string;
  date_from: string;
  date_to: string;
  status: "pending" | "confirmed" | "canceled";
  created_at: string;
}

export interface Message {
  id: number;
  booking_id: number;
  sender_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  sender: {
    id: number;
    name: string;
  };
}