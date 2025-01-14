import { Test } from "@/components/testing/TestingTypeDef";
import { Href, Link } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { THIText } from "../THIText";

export function TestSelectionCard({ test }: { test: Test }) {
  return (
    <Link href={test.route as Href<string>} asChild>
      <Pressable>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: test.uri,
              }}
            />
          </View>
          <View style={styles.titleContainer}>
            <THIText style={styles.title}>{test.title}</THIText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 158,
    width: 215,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    margin: 10,
    marginRight: 25,
  },
  titleContainer: {
    flex: 1.1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: "inter",
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
