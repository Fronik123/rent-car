import { ImagesComponent } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export type CarDetailsInfoProps = {
  top: boolean;
  descriptionFirst: string;
  descriptionSecond: string;
  descriptionThird: string;
};

export default function CarDetailsInfo({
  top,
  descriptionFirst,
  descriptionSecond,
  descriptionThird,
}: CarDetailsInfoProps) {
  return (
    <View style={styles.containerInfo}>
      <View>
        {top ? (
          <Image
            source={ImagesComponent.carDetailsInfo.maxSpeed}
            style={styles.img}
          />
        ) : (
          <Image
            source={ImagesComponent.carDetailsInfo.seats}
            style={styles.img}
          />
        )}

        <ThemedText>{top ? "Max speed" : "Car seats"}</ThemedText>
        <ThemedText>{descriptionFirst}</ThemedText>
      </View>

      <View>
        {top ? (
          <Image
            source={ImagesComponent.carDetailsInfo.engine}
            style={styles.img}
          />
        ) : (
          <Image
            source={ImagesComponent.carDetailsInfo.wheelDrive}
            style={styles.img}
          />
        )}
        <ThemedText>{top ? "Engine" : "Wheel drive"} </ThemedText>
        <ThemedText>{descriptionSecond}</ThemedText>
      </View>

      <View>
        {top ? (
          <Image
            source={ImagesComponent.carDetailsInfo.fuelType}
            style={styles.img}
          />
        ) : (
          <Image
            source={ImagesComponent.carDetailsInfo.tank}
            style={styles.img}
          />
        )}
        <ThemedText>{top ? "Fuel type " : "Tank capacity"}</ThemedText>
        <ThemedText>{descriptionThird}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: "row",
  },
  img: {
    width: 40,
    height: 40,
  },
});
