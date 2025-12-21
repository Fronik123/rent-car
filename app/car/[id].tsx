import CarDetailsInfo from "@/components/car/car-details-info";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { mockCars } from "@/constants/mockCar";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  // const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const car = mockCars.find((item) => item.id === id);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!car) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Car not found</Text>
      </View>
    );
  }

  return (
    <View>
      <ThemedText>{car.name}</ThemedText>

      <Image />

      <CarDetailsInfo
        top
        descriptionFirst={car.tankCapacity}
        descriptionSecond={car.maxSpeed}
        descriptionThird={car.consumeFuel}
      />

      <CarDetailsInfo
        top={false}
        descriptionSecond={car.maxSpeed}
        descriptionFirst={car.tankCapacity}
        descriptionThird={car.consumeFuel}
      />

      <View style={styles.priceInfo}>
        <ThemedText>Rent Price</ThemedText>
        <View>
          <ThemedText type="subtitle" colorName="primary">
            {car.price}
          </ThemedText>
          <ThemedText>/per day</ThemedText>
        </View>
      </View>
      <Button option="primary" title="Book Now"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: "row",
  },

  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
