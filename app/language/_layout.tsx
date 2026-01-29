import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocale } from "@/hooks/useLocale";
import { SafeAreaView } from "react-native-safe-area-context";

function LanguageHeader() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t } = useLocale();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.header, { backgroundColor: colors.background }]}
    >
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        hitSlop={12}
      >
        <ThemedText style={{ color: colors.primary }}>← Back</ThemedText>
      </Pressable>
      <ThemedText type="subtitle" style={styles.title}>
        {t("language.title")}
      </ThemedText>
      <View style={styles.placeholder} />
    </SafeAreaView>
  );
}

export default function LanguageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <LanguageHeader />,
        contentStyle: { paddingTop: 0 },
      }}
    >
      <Stack.Screen name="language" options={{ headerShown: true }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  backButton: {
    padding: 4,
    minWidth: 60,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    minWidth: 60,
  },
});
