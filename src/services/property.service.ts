// src/services/property.service.ts
import { api } from "./api/api";
import type { PropertiesResponse } from "../types/properties";
import type { PropertiesFilters } from "../hooks/useProperties";
export interface PropertiesQuery {
  page?: number;
  limit?: number;
  min_price?: number | string;
  max_price?: number | string;
  city?: string;
  status?: string;
}


export const getProperties = async (filters: PropertiesFilters): Promise<PropertiesResponse> => {
  const { data } = await api.get("/properties", {
    params: filters, // نرسل كل الفلاتر للـ backend
  });
  return data;
};

export const getPropertyById = async (id: string | number): Promise<PropertiesResponse["data"][0]> => {
  const { data } = await api.get(`/properties/${id}`);
  return data.data;
};

interface BookingData {
  property_id: number | string;
  date_time: string;
}

export const bookProperty = async (data: BookingData) => {
  try {
    const payload = {
      property_id: data.property_id,
      scheduled_at: data.date_time,
    };
    const res = await api.post("/bookings", payload);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Booking failed");
  }
};