import { FlatList, View, Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/Card";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const cardData = [
    {
      id: "1",
      title: "F1 2024 Season",
      message:
        "The 2024 F1 season promises thrilling races and intense rivalries.",
      imageUri:
        "https://www.racefans.net/wp-content/uploads/2024/03/racefansdotnet-7172831_HiRes.jpg",
    },
    {
      id: "2",
      title: "Max Verstappen",
      message:
        "Max Verstappen continues his dominance in the F1 world, aiming for another championship.",
      imageUri:
        "https://www.racefans.net/wp-content/uploads/2024/03/racefansdotnet-7172831_HiRes.jpg",
    },
    {
      id: "3",
      title: "Ferrari's New Car",
      message:
        "Ferrari unveils its new car, aiming for a competitive 2024 season.",
      imageUri:
        "https://www.racefans.net/wp-content/uploads/2024/03/racefansdotnet-7172831_HiRes.jpg",
    },
    {
      id: "4",
      title: "Lewis Hamilton",
      message:
        "Lewis Hamilton is ready to challenge for an 8th World Championship title.",
      imageUri:
        "https://www.racefans.net/wp-content/uploads/2024/03/racefansdotnet-7172831_HiRes.jpg",
    },
    {
      id: "5",
      title: "Monaco Grand Prix",
      message:
        "The iconic Monaco Grand Prix returns, promising high-speed action and glamour.",
      imageUri:
        "https://www.racefans.net/wp-content/uploads/2024/03/racefansdotnet-7172831_HiRes.jpg",
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.cardContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={cardData}
            renderItem={({ item }) => (
              <View>
                <Card
                  title={item.title}
                  message={item.message}
                  imageUri={item.imageUri}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </SafeAreaView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardContainer: {
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
});
