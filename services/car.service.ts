import { supabase } from "@/lib/supabase";
import { ICar } from "@/types/car.types";

export async function getCars(): Promise<ICar[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to fetch cars");
  }

  return data || [];
}
