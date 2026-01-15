import { ThemedText } from "@/components/ThemedText";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
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
        My Profile
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

        <Pressable onPress={() => router.push("/profile-edt/profile-edit")}>
          <Image
            source={require("../../assets/images/profile/edit.png")}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title="Payment & Currency"
          icon={require("../../assets/images/profile/payment.png")}
        />

        <ButtonIcon
          title="Documents"
          icon={require("../../assets/images/profile/documents.png")}
        />

        <ButtonIcon
          title="Support & Help center"
          icon={require("../../assets/images/profile/support.png")}
        />

        <ButtonIcon
          onPress={handleLogOut}
          title="Log Out"
          icon={require("../../assets/images/profile/logout.png")}
          lightTextColor={Colors.light.error}
          darkTextColor={Colors.dark.error}
        />
      </View>

      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
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
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
});
