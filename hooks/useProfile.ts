import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IProfile } from "@/types/profile.types";

import { getProfile, updateProfile } from "@/services/profile.service";

export function useProfile(id: string | undefined) {
  return useQuery<IProfile | null, Error>({
    queryKey: ["profile", id],
    queryFn: async () => {
      if (!id) return null;
      return getProfile(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: IProfile) => updateProfile(id, profileData),
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.setQueryData(["profile", id], data);
    },
  });
}
