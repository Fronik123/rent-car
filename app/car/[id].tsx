import CarDetailsInfo from "@/components/car/car-details-info";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { useCar } from "@/hooks/useCars";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
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
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText>{car.name}</ThemedText>

        <Image />

        <CarDetailsInfo
          top
          descriptionFirst={car.max_speed || "N/A"}
          descriptionSecond={car.engine_type || "N/A"}
          descriptionThird={car.fuel_type || "N/A"}
        />

        <CarDetailsInfo
          top={false}
          descriptionFirst={car.car_seats || "N/A"}
          descriptionSecond={car.max_speed || "N/A"}
          descriptionThird={car.consume_fuel}
        />
      </View>

      <View style={styles.priceInfo}>
        <ThemedText type="defaultSemiBold" style={styles.priceInfoTextTitle}>
          Rent Price
        </ThemedText>
        <View style={styles.priceInfoText}>
          <ThemedText type="subtitle" colorName="primary">
            ${car.price_per_day}
          </ThemedText>

          <ThemedText>/per day</ThemedText>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button option="primary" title="Book Now"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },

  containerInfo: {
    flexDirection: "row",
  },

  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  priceInfoTextTitle: {
    fontSize: 18,
  },

  priceInfoText: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
