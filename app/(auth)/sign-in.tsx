import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { signInSchema, type SignInFormData } from "@/lib/auth-schema";

export default function SignIn() {
  const { t } = useLocale();
  const { signIn, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const email = "test1@gmai.com";
  // const password = "12345";

  const handleSignUp = () => { };

  const onLogIn = async (data: SignInFormData) => {
    console.log("data", data);
    const { user, session, error } = await signIn(data.email, data.password);

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

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              text={t("auth.email")}
              placeholder={t("auth.email")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />
          )}
        />
        {errors.email?.message && (
          <ThemedText style={styles.error}>{t(errors.email.message)}</ThemedText>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              text={t("auth.password")}
              placeholder={t("auth.password")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
            />
          )}
        />
        {errors.password?.message && (
          <ThemedText style={styles.error}>{t(errors.password.message)}</ThemedText>
        )}
      </View>


      <Pressable style={styles.forgotPassword}>
        <ThemedText>{t("auth.forgotPassword")}</ThemedText>
      </Pressable>

      <Button
        option="primary"
        title={isLoading ? t("common.loading") : t("auth.logIn")}
        onPress={handleSubmit(onLogIn)}
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
  form: {
    gap: 5,
  },
  error: {
    marginLeft: 16,
    marginTop: 4,
    fontSize: 12,
    color: "#c00",
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 5,
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
