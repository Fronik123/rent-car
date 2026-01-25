import { User } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import { IProfile } from "@/types/profile.types";

import { ThemedText } from "../ThemedText";

export type HomeHeaderProps = {
  user: User | null;
  profile: IProfile | null;
};

export default function HomeHeader({ profile, user }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/home/notification.png")}
        style={{ width: 48, height: 48 }}
      />

      <View style={styles.info}>
        <ThemedText>Hello, {profile?.first_name}</ThemedText>
        <ThemedText colorName="secondaryGray">{user?.email}</ThemedText>
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
