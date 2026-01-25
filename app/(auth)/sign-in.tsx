import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { signIn, isLoading } = useAuth();

  const handleSignUp = () => {};

  const handleLogIn = async () => {
    console.log("Log In");
    const email = "test1@gmai.com";
    const password = "12345";

    const { user, session, error } = await signIn(email, password);

    if (error) {
      alert(`Error: ${error.message}`);
    } else if (user && session) {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Log In to</ThemedText>

      <ThemedText style={styles.description}>Rent a BMW Luxury Car</ThemedText>

      <Input text="Email" />

      <Input text="Password" />

      <Pressable>
        <ThemedText>Forgot your password?</ThemedText>
      </Pressable>

      <Button
        option="primary"
        title={isLoading ? "Loading..." : "Log In"}
        onPress={handleLogIn}
        disabled={isLoading}
      />

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
