import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api/api";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
}

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