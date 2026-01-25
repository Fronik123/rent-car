import { SupabaseClient, createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import "react-native-url-polyfill/auto";

import { SupabaseSecureStore } from "./storage";

// Получаем URL и ключ из переменных окружения
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  Constants.expoConfig?.extra?.supabaseUrl ||
  "";

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  "";

// Проверяем наличие обязательных переменных
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase URL или ключ не найдены. Убедитесь, что вы установили EXPO_PUBLIC_SUPABASE_URL и EXPO_PUBLIC_SUPABASE_ANON_KEY в .env файле или app.config.js",
  );
} else {
  // Проверяем формат ключа
  if (supabaseAnonKey.startsWith("sb_publishable_")) {
    console.log("✅ Используется Publishable key (новый формат)");
  } else if (supabaseAnonKey.startsWith("eyJ")) {
    console.log("✅ Используется anon key (JWT формат)");
  } else {
    console.warn(
      "⚠️ Необычный формат ключа. Ожидается ключ начинающийся с 'eyJ' (JWT) или 'sb_publishable_' (новый формат)",
    );
  }
}

// Создаем клиент Supabase с адаптером для SecureStore
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      storage: SupabaseSecureStore,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
