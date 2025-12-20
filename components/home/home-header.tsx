import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function HomeHeader() {
  const name = "Mi";
  const email = "askolya@gmail.com";
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/home/notification.png")}
        style={{ width: 48, height: 48 }}
      />

      <View>
        <ThemedText>Hello, {name}</ThemedText>
        <ThemedText>{email}</ThemedText>
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
    backgroundColor: "red",
  },
  notification: {
    marginLeft: "auto",
  },
});
