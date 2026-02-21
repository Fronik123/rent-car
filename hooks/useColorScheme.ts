import { useTheme } from "./useTheme";

export function useColorScheme() {
  return useTheme().colorScheme;
}
