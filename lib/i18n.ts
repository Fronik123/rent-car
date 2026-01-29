import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "@/locales/en";
import uk from "@/locales/uk";

const translations = { en, uk };

export const i18n = new I18n(translations);

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? "en";
const supportedLocales = ["en", "uk"] as const;
export type Locale = (typeof supportedLocales)[number];

const normalizeLocale = (code: string): Locale =>
  supportedLocales.includes(code as Locale) ? (code as Locale) : "en";

i18n.defaultLocale = "en";
i18n.locale = normalizeLocale(deviceLocale);
i18n.enableFallback = true;

export const getDeviceLocale = (): Locale =>
  normalizeLocale(deviceLocale);

export const setLocale = (locale: Locale) => {
  i18n.locale = locale;
};

export const getLocale = (): Locale => (i18n.locale as Locale) ?? "en";
