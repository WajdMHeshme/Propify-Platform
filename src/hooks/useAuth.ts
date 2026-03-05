// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "../services/auth.service";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      authService.login(data),

    onSuccess: (data) => {
      localStorage.setItem("token", data?.token);

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      authService.register(data),
  });
};