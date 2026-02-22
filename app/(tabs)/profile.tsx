import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { useProfile } from "@/hooks/useProfile";

export default function Profile() {
  const { t } = useLocale();
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView>
      <ThemedText type="subtitle" style={styles.title}>
        {t("profile.myProfile")}
      </ThemedText>

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/card-car/rating.png")}
          style={{ width: 40, height: 40 }}
        />

        <View style={styles.profileInfo}>
          <ThemedText>{profile?.first_name || "example"}</ThemedText>
          <ThemedText>{user?.email || "example@example.com"}</ThemedText>
        </View>

        <Pressable onPress={() => router.push("/profile-edit/profile-edit")}>
          <Image
            source={require("../../assets/images/profile/edit.png")}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title={t("profile.payment")}
          icon={require("../../assets/images/profile/payment.png")}
        />

        <ButtonIcon
          title={t("profile.documents")}
          icon={require("../../assets/images/profile/documents.png")}
        />

        <ButtonIcon
          title={t("profile.support")}
          icon={require("../../assets/images/profile/support.png")}
        />

        <ButtonIcon
          onPress={handleLogOut}
          title={t("profile.logout")}
          icon={require("../../assets/images/profile/logout.png")}
          lightTextColor={Colors.light.error}
          darkTextColor={Colors.dark.error}
        />
      </View>

      <ConfirmModal
        visible={showLogoutModal}
        title={t("profile.logoutModalTitle")}
        message={t("profile.logoutModalMessage")}
        confirmText={t("profile.logoutConfirm")}
        danger={true}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  buttonsContainer: {
    gap: 16,
    marginHorizontal: 8,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
    marginHorizontal: 8,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
});
