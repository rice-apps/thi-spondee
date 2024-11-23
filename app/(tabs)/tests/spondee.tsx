import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Card from "@/components/spondee/Card";
import { ProgressBar } from "@/components/spondee/ProgressBar";
import { SessionControls } from "@/components/spondee/SessionControls";

export default function Index({
  numCards,
  totalPages,
}: {
  numCards: number;
  totalPages: number;
}) {
  const [pageNum, setPageNum] = useState(1);

  numCards = 6;
  totalPages = 20;

  const data: { id: number; title: string }[] = Array.from(
    { length: numCards },
    (_, i) => ({
      id: i,
      title: `Item ${i}`,
    })
  );

  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spondee Cards</Text>
        <SessionControls />
      </View>
      <ProgressBar numerator={pageNum} denominator={totalPages} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={data}
          renderItem={({ item }) => <Card text={item.title} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={Math.min(Math.trunc((numCards + 1) / 2), 4)}
          horizontal={false}
        />
      </View>
    </View>
  );
}

let grayColor = "#e6e6e6";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  flatlist: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    marginTop: "5%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 50,
    gap: 20,
  },
  title: {
    fontSize: 32,
    flex: 8,
  },
  page: {
    backgroundColor: "#ffffff",
    paddingTop: "3%",
  },
  button: {
    backgroundColor: grayColor,
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: 25,
  },
});
