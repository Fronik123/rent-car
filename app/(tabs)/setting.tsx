import { useLocale } from "@/hooks/useLocale";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

export default function Setting() {
  const { t } = useLocale();

  return (
    <SafeAreaView>
      <ThemedText type="subtitle" style={styles.title}>
        {t("settings.title")}
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title={t("settings.notifications")}
          icon={require("../../assets/images/settings/notifications.png")}
        />
        <ButtonIcon
          title={t("settings.language")}
          icon={require("../../assets/images/settings/language.png")}
          onPress={() => router.push("/language/language")}
        />
        <ButtonIcon
          title={t("settings.privacyPolicy")}
          icon={require("../../assets/images/settings/privacy-policy.png")}
        />
        <ButtonIcon
          title={t("settings.termsConditions")}
          icon={require("../../assets/images/settings/terms-conditions.png")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    marginTop: 16,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 16,
    marginTop: 16,
  },
});
