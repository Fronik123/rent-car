import { Pressable, type PressableProps, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  title: string;
  option?: "primary" | "secondary" | "outline";
};

export function Button({
  style,
  lightColor,
  darkColor,
  lightTextColor,
  darkTextColor,
  title,
  option = "primary",
  ...rest
}: ButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    option === "primary"
      ? "primary"
      : option === "secondary"
        ? "background"
        : "background",
  );
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    option === "primary" ? "text" : option === "outline" ? "tint" : "text",
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
      {title && <ThemedText style={{ color: textColor }}>{title}</ThemedText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
