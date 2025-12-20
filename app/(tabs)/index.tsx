import CardCar from "@/components/card-car";
import HomeHeader from "@/components/home/home-header";
import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const mockCars = [
  {
    id: "1",
    name: "BMW",
    consumeFuel: "11.2",
    price: "300",
    rating: "3.2",
    image: require("../../assets/images/card-car/car1.png"),
  },
  {
    id: "2",
    name: "AUDI",
    consumeFuel: "11.2",
    price: "240",
    rating: "3.2",
    image: require("../../assets/images/card-car/car2.png"),
  },
  {
    id: "4",
    name: "Mersedes",
    consumeFuel: "16.2",
    price: "300",
    rating: "3.2",
    image: require("../../assets/images/card-car/car3.png"),
  },
  {
    id: "5",
    name: "Renault",
    consumeFuel: "21.2",
    price: "100",
    rating: "4.2",
    image: require("../../assets/images/card-car/car1.png"),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <HomeHeader />

      <FlatList
        data={mockCars}
        renderItem={({ item }) => (
          <View style={styles.containerCard}>
            <CardCar
              name={item.name}
              consumeFuel={item.consumeFuel}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
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
});
