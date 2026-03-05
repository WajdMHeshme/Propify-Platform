// services/auth.service.ts
import { api } from "./api/api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const login = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const res = await api.post("/login", data);
  return res.data;
};

export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await api.post("/register", data);
  return res.data;
};