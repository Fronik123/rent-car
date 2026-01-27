import { supabase } from "@/lib/supabase";

import { IRentalWithCar } from "@/types/rental.types";

export async function getRentals(userId: string): Promise<IRentalWithCar[]> {
  const { data, error } = await supabase
    .from("rentals")
    .select(
      `
      *,
      cars (*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to fetch rentals");
  }

  return data || [];
}