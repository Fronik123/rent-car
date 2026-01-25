import { Image, ImageSource } from "expo-image";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "./ThemedText";

export type CardCarProps = {
  rating: number;
  name: string;
  consumeFuel: string;
  price: string;
  image?: ImageSource;
};

export default function CardCar({
  rating,
  name,
  price,
  image,
  consumeFuel,
}: CardCarProps) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/card-car/rating.png")}
            style={{ width: 14, height: 14 }}
          />
          <ThemedText>{rating}</ThemedText>
        </View>

        <ThemedText>{name}</ThemedText>

        <ThemedText colorName="secondaryGray">Fuel consumption in</ThemedText>

        <View style={styles.description}>
          <ThemedText colorName="secondaryGray">100km - </ThemedText>
          <ThemedText colorName="secondaryGray">{consumeFuel}</ThemedText>
        </View>

        <View style={styles.bottom}>
          <ThemedText type="subtitle" colorName="primary">
            ${price}
          </ThemedText>
          <ThemedText>/per day</ThemedText>
        </View>
      </View>

      <View style={styles.rightBlock}>
        <Image
          source={image}
          style={{ width: 200, height: 100, marginTop: 40 }}
        />

        <View style={styles.wrapperOpen}>
          <Image
            source={require("../assets/images/card-car/open-details.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8C8C8C40",
    paddingLeft: 15,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginVertical: 16,
  },
  bottom: {
    flexDirection: "row",
    marginBottom: 23,
    marginTop: 16,
  },
  description: {
    flexDirection: "row",
  },
  wrapperOpen: {
    backgroundColor: "black",
    paddingTop: 5,
    paddingLeft: 10,
    borderTopLeftRadius: 10,
  },
  rightBlock: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
