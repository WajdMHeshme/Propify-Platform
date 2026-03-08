// src/hooks/useFavorites.ts
import { useState, useEffect } from "react";
import * as favoritesService from "../services/favorites.service";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoritesService.getFavorites();
      setFavorites(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (propertyId: number | string) => {
    const tempId = `tmp-${Date.now()}`;
    const tempFav = {
      id: tempId,
      property: { id: propertyId },
      created_at: new Date().toISOString(),
    };
    setFavorites((prev) => [tempFav, ...prev]);

    try {
      const created = await favoritesService.addFavorite(propertyId);
      setFavorites((prev) => prev.map((f) => (f.id === tempId ? created : f)));
      return created;
    } catch (err: any) {
      setFavorites((prev) => prev.filter((f) => f.id !== tempId));
      setError(err?.message || "Failed to add favorite");
      throw err;
    }
  };

  const removeFavoriteByFavId = async (favId: number | string) => {
    const prev = favorites;
    setFavorites((curr) => curr.filter((f) => String(f.id) !== String(favId)));

    try {
      // return the actual server response so callers can use it
      const res = await favoritesService.removeFavorite(favId);
      return res;
    } catch (err: any) {
      // revert optimistic change
      setFavorites(prev);
      setError(err?.message || "Failed to remove favorite");
      throw err;
    }
  };

  const toggleFavorite = async (propertyId: number | string) => {
    const existing = favorites.find((f) => String(f.property?.id) === String(propertyId));
    if (existing) {
      return removeFavoriteByFavId(existing.id);
    } else {
      return addFavorite(propertyId);
    }
  };

  return {
    favorites,
    loading,
    error,
    refetch: fetchFavorites,
    addFavorite,
    removeFavorite: removeFavoriteByFavId, // returns server resp
    toggleFavorite,
  };
};