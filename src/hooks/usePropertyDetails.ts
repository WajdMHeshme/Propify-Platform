// src/hooks/usePropertyDetails.ts
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import { getPropertyById } from "../services/property.service";
import type { Property } from "../types/properties";

const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export const usePropertyDetails = (id?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id!),
    enabled: !!id,
  });

  const prop: Property | undefined = data; 

const gallery = prop
  ? [
      `${BASE_URL}/storage/${prop.main_image}`,
      ...(prop.images ?? []).map((img) => `${BASE_URL}/storage/${img}`),
    ]
  : [];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      });
    }
  }, []);

  const formatPrice = (price?: string | number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price ?? 0));

  // reset index if property changes
  useEffect(() => setActiveIdx(0), [prop?.main_image]);

  return {
    prop,
    gallery,
    activeIdx,
    setActiveIdx,
    lightboxOpen,
    setLightboxOpen,
    dateInputRef,
    formatPrice,
    isLoading,
    isError,
  };
};