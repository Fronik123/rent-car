import { getRentals } from "@/services/rental.service";
import { IRentalWithCar } from "@/types/rental.types";
import { useQuery } from "@tanstack/react-query";

export function useRentals(userId: string | undefined) {
  return useQuery<IRentalWithCar[], Error>({
    queryKey: ["rentals", userId],
    queryFn: () => getRentals(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}