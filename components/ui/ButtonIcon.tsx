import { Image } from "expo-image";
import {
  ImageStyle,
  Pressable,
  type PressableProps,
  StyleProp,
  StyleSheet,
  Switch,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ButtonIconProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  title: string;
  option?: "grayLight" | "secondary" | "outline";
  icon?: string;
  isChecked?: boolean;
  isShowChecked?: boolean;
  styleIcon?: StyleProp<ImageStyle>;
  isShowSwitch?: boolean;
  onValueChange?: (value: boolean) => void;
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
  isChecked = false,
  isShowChecked = false,
  isShowSwitch = false,
  onValueChange,
  styleIcon,
  ...rest
}: ButtonIconProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    option === "grayLight"
      ? "grayLight"
      : option === "secondary"
        ? "background"
        : "background",
  );
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    option === "grayLight" ? "text" : option === "outline" ? "tint" : "text",
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
        <View style={styles.buttonIconImage}>
          <Image source={icon} style={[{ width: 24, height: 24 }, styleIcon]} />

          <ThemedText style={{ color: textColor }}>{title}</ThemedText>
        </View>

        {isShowChecked ? isChecked ?
          <Image source={require("../../assets/images/input/radiobutton.png")} style={styles.buttonIconImageChecked} />
          : <Image source={require("../../assets/images/input/radiobutton-empty.png")} style={styles.buttonIconImageChecked} /> : null}

        {isShowSwitch ? <Switch value={isChecked} onValueChange={onValueChange} /> : null}
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
    justifyContent: "space-between",
  },
  buttonIconImage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonIconImageChecked: {
    width: 16,
    height: 16,
  },
});
