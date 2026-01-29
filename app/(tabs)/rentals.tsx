import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardCar from "@/components/CardCar";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { useRentals } from "@/hooks/useRentals";
import { getImageSource } from "@/utils/hepler";


export default function MyRental() {
  const { t } = useLocale();
  const { user } = useAuth();
  const { data: rentals = [], isLoading, error, refetch } = useRentals(user?.id);
  const isInitialLoading = isLoading && rentals.length === 0;


  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <ThemedText type="subtitle" style={styles.title}>
          {t("rentals.title")}
        </ThemedText>
        <ThemedText>{t("rentals.errorLoading")}, {error.message}</ThemedText>
      </SafeAreaView>
    );
  }

  if (isInitialLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ThemedText type="subtitle" style={styles.title}>
          {t("rentals.title")}
        </ThemedText>
        <ActivityIndicator size="large" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ThemedText type="subtitle" style={styles.title}>
        {t("rentals.title")}
      </ThemedText>

      <FlatList
        data={rentals}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText>{t("rentals.empty")}</ThemedText>
          </View>
        }
        onRefresh={() => refetch()}
        refreshing={isLoading}
        renderItem={({ item }) => {
          const car = item.cars;
          if (!car) return null;
          return (
            <View style={styles.card}>
              <Link href={`/car/${item.car_id}?from=rentals`}>
                <CardCar
                  name={car.brand}
                  consumeFuel={car.consume_fuel}
                  price={car.price_per_day}
                  rating={car.rating}
                  image={getImageSource(car.image)}
                />
              </Link>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
  },
  card: {
    marginTop: 16,
  },
  loader: {
    marginTop: 24,
  },
});
