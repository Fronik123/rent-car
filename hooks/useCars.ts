import { getCars } from "@/services/car.service";
import { ICar } from "@/types/car.types";
import { useQuery } from "@tanstack/react-query";

export function useCars() {
  return useQuery<ICar[], Error>({
    queryKey: ["cars"],
    queryFn: getCars,
    staleTime: 5 * 60 * 1000,
  });
}
