import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const handleSignUp = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Log In to</ThemedText>

      <ThemedText style={styles.description}>Rent a BMW Luxury Car</ThemedText>

      <Input text="Email" />

      <Input text="Password" />

      <Pressable>
        <ThemedText>Forgot your password?</ThemedText>
      </Pressable>

      <Button option="primary" title="Log In" />

      <Pressable onPress={handleSignUp} style={styles.singUp}>
        <ThemedText>
          Don’t have an account?
          <ThemedText type="link"> Sign Up.</ThemedText>
        </ThemedText>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    marginTop: 48,
    textAlign: "center",
    fontSize: 20,
  },
  description: {
    marginTop: 24,
    textAlign: "center",
  },
  singUp: {
    alignItems: "center",
    marginTop: "auto",
  },
  bottom: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "space-between",
  },
});
