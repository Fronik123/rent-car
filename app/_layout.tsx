import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LocaleProvider } from "@/hooks/useLocale";
import { ThemeProvider } from "@/hooks/useTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <NavThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="language" />
        <Stack.Screen name="profile-edit" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavThemeProvider>
  );
}
