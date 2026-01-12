import { ImagesComponent } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

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
      <View style={styles.item}>
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

        <ThemedText style={styles.text}>
          {top ? "Max speed" : "Car seats"}
        </ThemedText>
        <ThemedText style={styles.text}>{descriptionFirst}</ThemedText>
      </View>

      <View style={styles.item}>
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
        <ThemedText style={styles.text}>
          {top ? "Engine" : "Wheel drive"}{" "}
        </ThemedText>
        <ThemedText style={styles.text}>{descriptionSecond}</ThemedText>
      </View>

      <View style={styles.item}>
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
        <ThemedText style={styles.text}>
          {top ? "Fuel type " : "Tank capacity"}
        </ThemedText>
        <ThemedText style={styles.text}>{descriptionThird}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  item: {
    flexBasis: "33.33%",
    alignItems: "center",
    maxWidth: "33.33%",
  },
  text: {
    textAlign: "center",
  },
  img: {
    width: 40,
    height: 40,
  },
});
