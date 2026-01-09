import { ThemedText } from "@/components/ThemedText";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuth();

  const handleLogOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
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
          <ThemedText>John Doe</ThemedText>
          <ThemedText>john.doe@example.com</ThemedText>
        </View>

        <Image
          source={require("../../assets/images/profile/edit.png")}
          style={{ width: 40, height: 40 }}
        />
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
