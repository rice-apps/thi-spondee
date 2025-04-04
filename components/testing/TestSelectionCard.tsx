import { Test } from "@/components/testing/TestingTypeDef";
import { Href, router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { THIText } from "../THIText";

export function TestSelectionCard({ test }: { test: Test }) {
  return (
    <Pressable
      onPress={() => {
        router.push(test.route as Href);
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={test.img} />
        </View>
        <View style={styles.titleContainer}>
          <THIText style={styles.title}>{test.title}</THIText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 158,
    width: 215,
    backgroundColor: "#7B9CCF",
    borderRadius: 10,
    margin: 10,
    marginRight: 25,
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  titleContainer: {
    flex: 1.1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  imageContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
