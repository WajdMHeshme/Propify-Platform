// src/hooks/useProperties.ts
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { getProperties } from "../services/property.service";
import type {  PropertiesFilters, PropertiesResponse } from "../types/properties";

export const useProperties = (
  filters: PropertiesFilters
): UseQueryResult<PropertiesResponse, Error> => {
  const key = ["properties", JSON.stringify(filters ?? {})];

  const options: UseQueryOptions<PropertiesResponse, Error, PropertiesResponse> = {
    queryKey: key,
    queryFn: async () => {
      const data = await getProperties(filters);
      return data;
    },
    staleTime: 1000 * 30,
    //@ts-ignore
    keepPreviousData: true,
  };

  return useQuery(options);
};