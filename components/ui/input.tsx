import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

import { ThemedText } from "../ThemedText";

export type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
  text?: string;
  type?: string;
};

export function Input({
  style,
  lightColor,
  darkColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  type,
  text,
  ...rest
}: InputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor({}, "background");
  const placeholderTextColor = useThemeColor(
    { light: lightPlaceholderColor, dark: darkPlaceholderColor },
    "icon",
  );

  return (
    <>
      <ThemedText style={styles.text}>{text}</ThemedText>
      <TextInput
        style={[styles.input, { color, backgroundColor }, style]}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    height: 40,
    padding: 12,
    fontSize: 16,
  },
  text: {
    marginLeft: 16,
  },
});
