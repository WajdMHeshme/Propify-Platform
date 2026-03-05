import { api } from "./api/api"
import type { PropertiesResponse } from "../types/properties"

export const getProperties = async (): Promise<PropertiesResponse> => {
  const { data } = await api.get("/properties")
  return data
}

export const getPropertyById = async (
  id: string | number
): Promise<PropertiesResponse> => {
  const response = await api.get(`/properties/${id}`)
  return response.data.data 
}


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