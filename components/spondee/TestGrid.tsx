import Card from "@/components/spondee/Card";
import { useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";

export default function TestGrid({
  numCards,
  data,
  correctCard,
  setTotalTrials,
  setNumCorrect,
  setSelectedCorrect,
}: {
  numCards: number;
  data: { id: number; title: string }[];
  correctCard: string;
  setTotalTrials: (update: (prev: number) => number) => void;
  setNumCorrect: (update: (prev: number) => number) => void;
  setSelectedCorrect: (correct: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<number>();

  const renderCard = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? "#6D88B433" : "#FFFFFF";
    const submitButton = item.id === selectedId ? true : false;

    const handlePress = () => {
      console.log(item.title, correctCard);
      if (correctCard === item.title) {
        setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
        setSelectedCorrect(true);

      }
      setTotalTrials((prevTotalTrials) => prevTotalTrials + 1);
      setSelectedId(-1);

    };

    return (
      <Card
        text={item.title}
        backgroundColor={backgroundColor}
        button={submitButton}
        onPress={() => setSelectedId(item.id)}
        onSubmit={handlePress}
        correct={correctCard}
        setTotalTrials={setTotalTrials}
        setNumCorrect={setNumCorrect}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={Math.min(Math.trunc((numCards + 1) / 2), 4)}
        horizontal={false}
      />
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
    height: "90%",
  },
  flatlist: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    marginTop: "2%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
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
  footer: {
    position: "absolute",
    right: 50,
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    aspectRatio: 1 / 1,
    backgroundColor: "#95D0E7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
