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
  return response.data.data   // 👈 هذا هو الحل
}