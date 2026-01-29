import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";


export default function Language() {

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Test</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
});