import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

export default function HomeHeader() {
  const name = "Mi";
  const email = "askolya@gmail.com";
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/home/notification.png")}
        style={{ width: 48, height: 48 }}
      />

      <View style={styles.info}>
        <ThemedText>Hello, {name}</ThemedText>
        <ThemedText colorName="secondaryGray">{email}</ThemedText>
      </View>

      <Pressable style={styles.notification}>
        <Image
          source={require("../../assets/images/home/notification.png")}
          style={{ width: 48, height: 48 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  notification: {
    marginLeft: "auto",
  },
  info: {
    marginLeft: 16,
  },
});
