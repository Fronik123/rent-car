import { ImageSource } from "expo-image";

export function getImageSource(imageUrl?: string): ImageSource {
  if (imageUrl) return { uri: imageUrl };
  return require("@/assets/images/card-car/car1.png");
}