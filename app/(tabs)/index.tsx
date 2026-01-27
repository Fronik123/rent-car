import { Colors } from "@/constants/theme";
import { Link } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardCar from "@/components/CardCar";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";

import { useAuth } from "@/hooks/useAuth";
import { useCars, useSearchCars } from "@/hooks/useCars";
import { useProfile } from "@/hooks/useProfile";
import { getImageSource } from "@/utils/hepler";

export default function HomeScreen() {
  const [searchParams, setSearchParams] = useState({ search: "" });
  const { data: AllCars = [], isLoading, error, refetch } = useCars();
  const { user } = useAuth();
  const { data: profile = null } = useProfile(user?.id);
  const {
    data: searchCars = [],
    isLoading: isSearchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = useSearchCars(searchParams.search ? searchParams.search : "");

  const cars = useMemo(() => {
    return searchParams.search ? searchCars : AllCars;
  }, [AllCars, searchCars, searchParams]);

  const handleSearch = useCallback((query: string) => {
    setSearchParams({ search: query });
  }, []);

  if (isLoading || isSearchLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error || searchError) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error loading cars</Text>
        <Text style={styles.errorDetails}>
          {error?.message || searchError?.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <HomeHeader user={user} profile={profile} />

      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <View style={styles.containerCard}>
            <Link href={`/car/${item.id}`}>
              <CardCar
                name={item.brand}
                consumeFuel={item.consume_fuel}
                price={item.price_per_day}
                rating={item.rating}
                image={getImageSource(item.image)}
              />
            </Link>
          </View>
        )}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No available cars</Text>
          </View>
        }
      />

      {/* <CardCar name="s" consumeFuel="s" price="2" rating="3" /> */}
    </SafeAreaView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome !</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{" "}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
    //       to see changes. Press{" "}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: "cmd + d",
    //           android: "cmd + m",
    //           web: "F12",
    //         })}
    //       </ThemedText>{" "}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <Link href="/modal">
    //       <Link.Trigger>
    //         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //       </Link.Trigger>
    //       <Link.Preview />
    //       <Link.Menu>
    //         <Link.MenuAction
    //           title="Action"
    //           icon="cube"
    //           onPress={() => alert("Action pressed")}
    //         />
    //         <Link.MenuAction
    //           title="Share"
    //           icon="square.and.arrow.up"
    //           onPress={() => alert("Share pressed")}
    //         />
    //         <Link.Menu title="More" icon="ellipsis">
    //           <Link.MenuAction
    //             title="Delete"
    //             icon="trash"
    //             destructive
    //             onPress={() => alert("Delete pressed")}
    //           />
    //         </Link.Menu>
    //       </Link.Menu>
    //     </Link>

    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">
    //         npm run reset-project
    //       </ThemedText>{" "}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
    //       directory. This will move the current{" "}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "red",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  containerCard: {
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.light.error,
  },
  errorDetails: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
