import { Pressable, StyleSheet, View, type PressableProps } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";

export type ButtonIconProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  title: string;
  option?: "grayLight" | "secondary" | "outline";
  icon?: string;
};

export function ButtonIcon({
  style,
  lightColor,
  darkColor,
  lightTextColor,
  darkTextColor,
  title,
  option = "grayLight",
  icon,
  ...rest
}: ButtonIconProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    option === "grayLight"
      ? "grayLight"
      : option === "secondary"
        ? "background"
        : "background"
  );
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    option === "grayLight" ? "text" : option === "outline" ? "tint" : "text"
  );
  const borderColor = option === "outline" ? textColor : undefined;

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor },
        option === "outline" && {
          borderColor,
          borderWidth: 1,
          backgroundColor: "transparent",
        },
      ]}
      {...rest}
    >
      <View style={styles.buttonIcon}>
        <Image source={icon} style={{ width: 24, height: 24 }} />

        <ThemedText style={{ color: textColor }}>{title}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    height: 48,
  },
  buttonIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
