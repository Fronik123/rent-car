import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const THEME_STORAGE_KEY = "app_theme";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  colorScheme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<Theme>("light");

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
        if (saved === "dark" || saved === "light") {
          setColorSchemeState(saved);
        }
      } catch { }
    })();
  }, []);

  const setTheme = useCallback(async (theme: Theme) => {
    setColorSchemeState(theme);
    await SecureStore.setItemAsync(THEME_STORAGE_KEY, theme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ colorScheme, setTheme }),
    [colorScheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
