import { supabase } from "@/lib/supabase";

import { IProfile } from "@/types/profile.types";

export async function getProfile(id: string): Promise<IProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message || "Failed to fetch profile");
  }

  return data || null;
}

export async function updateProfile(
  id: string,
  profileData: IProfile,
): Promise<IProfile | null> {
  const { id: _, created_at: __, ...dataToUpdate } = profileData;
  console.log("dataToUpdate", dataToUpdate);
  const { data, error } = await supabase
    .from("profiles")
    .update(dataToUpdate)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update profile");
  }
  return data || null;
}
