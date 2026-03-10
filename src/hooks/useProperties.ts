// src/hooks/useProperties.ts
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { getProperties } from "../services/property.service";
import type {  PropertiesFilters, PropertiesResponse } from "../types/properties";



export const useProperties = (
  filters: PropertiesFilters
): UseQueryResult<PropertiesResponse, Error> => {
  // use a stable queryKey by stringifying filters (prevents unstable object identity)
  const key = ["properties", JSON.stringify(filters ?? {})];

  return useQuery<PropertiesResponse, Error>({
    queryKey: key,
    queryFn: () => getProperties(filters),
    keepPreviousData: true,
    staleTime: 1000 * 30,
  });
};