declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "@/locales/en" {
  const translations: Record<string, unknown>;
  export default translations;
}

declare module "@/locales/uk" {
  const translations: Record<string, unknown>;
  export default translations;
}
