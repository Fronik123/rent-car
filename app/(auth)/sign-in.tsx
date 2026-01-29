import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export default function SignIn() {
  const { t } = useLocale();
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
      <ThemedText style={styles.title}>{t("auth.signIn")}</ThemedText>

      <ThemedText style={styles.description}>{t("auth.signInSubtitle")}</ThemedText>

      <Input text={t("auth.email")} />

      <Input text={t("auth.password")} />

      <Pressable>
        <ThemedText>{t("auth.forgotPassword")}</ThemedText>
      </Pressable>

      <Button
        option="primary"
        title={isLoading ? t("common.loading") : t("auth.logIn")}
        onPress={handleLogIn}
        disabled={isLoading}
      />

      <Pressable onPress={handleSignUp} style={styles.singUp}>
        <ThemedText>
          Don’t have an account?
          <ThemedText type="link"> {t("auth.signUp")}.</ThemedText>
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
