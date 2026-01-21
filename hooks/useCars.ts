import { getCarById, getCars, searchCars } from "@/services/car.service";
import { ICar } from "@/types/car.types";
import { useQuery } from "@tanstack/react-query";

export function useCars() {
  return useQuery<ICar[], Error>({
    queryKey: ["cars"],
    queryFn: getCars,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCar(id: string) {
  return useQuery<ICar | null, Error>({
    queryKey: ["cars", id],
    queryFn: () => getCarById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchCars(query: string) {
  return useQuery<ICar[], Error>({
    queryKey: ["cars", "search", query],
    queryFn: () => searchCars(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
}