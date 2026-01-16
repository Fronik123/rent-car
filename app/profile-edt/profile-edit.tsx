import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const { mutate: updateProfile } = useUpdateProfile(user?.id || "");

  const [name, setName] = useState(profile?.first_name);
  const [secondName, setSecondName] = useState(profile?.last_name);

  const handleSave = () => {
    updateProfile({
      first_name: name || "",
      last_name: secondName,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            Edit my profile information
          </ThemedText>

          <View style={styles.profileContainer}>
            {/* <Image */}
            <ThemedText type="subtitle">{profile?.first_name}</ThemedText>
            <ThemedText colorName="secondaryGray">{user?.email}</ThemedText>
          </View>

          <View style={styles.inputsContainer}>
            <Input
              placeholder="First name"
              text="First name:"
              value={name}
              onChangeText={setName}
            />

            <Input
              value={secondName}
              onChangeText={setSecondName}
              placeholder="Second name:"
              text="Second name:"
            />
            <Input placeholder="Email:" type="email" text="Email" />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button option="primary" title={"Save"} onPress={handleSave} />

          <Button option="outline" title={"Cancel"} onPress={handleCancel} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    display: "flex",
    flexDirection: "column",
  },
  inputsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});
