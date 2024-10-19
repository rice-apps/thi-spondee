import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, Image } from "react-native";

type CardProps = {
  title: string;
  message: string;
  imageUri: string;
};

export function Card({ title, message, imageUri }: CardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
      </View>
      <View style={styles.messageContainer}>
        <ThemedText type="default" style={styles.message}>
          {message}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 400,
    backgroundColor: "lightblue",
    borderRadius: 25,
    margin: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
  },
  imageContainer: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "90%",
    borderRadius: 15,
  },
});
