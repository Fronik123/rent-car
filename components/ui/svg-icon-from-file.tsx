import { useThemeColor } from "@/hooks/useThemeColor";
import { Asset } from "expo-asset";
import { SvgUri } from "react-native-svg";

type SvgIconFromFileProps = {
  source: any;
  size?: number;
  lightColor?: string;
  darkColor?: string;
};

export function SvgIconFromFile({
  source,
  size = 24,
  lightColor,
  darkColor,
}: SvgIconFromFileProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");

  return (
    <SvgUri uri={Asset.fromModule(source).uri} width={size} height={size} />
  );
}
