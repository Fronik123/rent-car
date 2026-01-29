import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getLocale,
  i18n,
  setLocale as setI18nLocale,
  type Locale,
} from "@/lib/i18n";

const LOCALE_STORAGE_KEY = "app_locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: (key: string) => string;
  isLoading: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocale());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(LOCALE_STORAGE_KEY);
        if (saved && (saved === "en" || saved === "uk")) {
          setI18nLocale(saved as Locale);
          setLocaleState(saved as Locale);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const setLocale = useCallback(async (newLocale: Locale) => {
    setI18nLocale(newLocale);
    setLocaleState(newLocale);
    await SecureStore.setItemAsync(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string) => i18n.t(key),
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, isLoading }),
    [locale, setLocale, t, isLoading]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
