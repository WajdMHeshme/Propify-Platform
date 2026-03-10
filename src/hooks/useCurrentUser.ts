import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api/api";
import type { CurrentUser } from "../types/auth";



export const useCurrentUser = () => {
  return useQuery<CurrentUser | null, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};