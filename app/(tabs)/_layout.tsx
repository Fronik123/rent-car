import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { TabIcon } from "@/components/ui/tab-icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [isAuth, setIsAuth] = useState(true);

  // if (!isAuth) {
  //   return <Redirect href="/sign-in" />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarItemStyle: TAB_BAR_ITEM_STYLE,
        tabBarStyle: TAB_BAR_STYLE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <TabIcon name="index" color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <TabIcon name="profile" color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <TabIcon name="calendar" color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <TabIcon name="setting" color={color} focused={focused} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const TAB_BAR_STYLE = {
  marginBottom: 42,
  marginLeft: 8,
  marginRight: 8,
  borderWidth: 1,
  borderRadius: 100,
  height: 56,
};

const TAB_BAR_ITEM_STYLE = {
  paddingVertical: 10,
  justifyContent: "center",
  alignItems: "center",
} as const;
