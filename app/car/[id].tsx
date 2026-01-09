import CarDetailsInfo from "@/components/car/car-details-info";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { useCar } from "@/hooks/useCars";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  // const { data: car, isLoading, error } = useCar(id as string);
  const { data: car, isLoading, error } = useCar(id as string);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error loading car: {error.message}</Text>
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
        descriptionFirst={car.tank_capacity || "N/A"}
        descriptionSecond={car.max_speed || "N/A"}
        descriptionThird={car.consume_fuel}
      />

      <CarDetailsInfo
        top={false}
        descriptionSecond={car.max_speed || "N/A"}
        descriptionFirst={car.tank_capacity || "N/A"}
        descriptionThird={car.consume_fuel}
      />

      <View style={styles.priceInfo}>
        <ThemedText>Rent Price</ThemedText>
        <View>
          <ThemedText type="subtitle" colorName="primary">
            ${car.price_per_day}
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
