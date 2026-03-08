import { api } from "./api/api";

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data.data;
};

export const addFavorite = async (propertyId: number | string) => {
  const response = await api.post("/favorites/add", {
    property_id: propertyId,
  });
  return response.data;
};

export const removeFavorite = async (propertyId: number | string) => {
  const response = await api.delete("/favorites/remove", {
    data: { property_id: propertyId },
  });

  return response.data;
};