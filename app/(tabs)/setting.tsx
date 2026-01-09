import { ThemedText } from "@/components/ThemedText";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <SafeAreaView>
      <ThemedText type="subtitle" style={styles.title}>
        Settings
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title="Notifications"
          icon={require("../../assets/images/profile/support.png")}
        />
        <ButtonIcon
          title="Language"
          icon={require("../../assets/images/profile/support.png")}
        />
        <ButtonIcon
          title="Privacy Policy"
          icon={require("../../assets/images/profile/support.png")}
        />
        <ButtonIcon
          title="Term Conditions"
          icon={require("../../assets/images/profile/support.png")}
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
