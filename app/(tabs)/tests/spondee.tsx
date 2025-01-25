import Card from "@/components/spondee/Card";
import { SessionControls } from "@/components/spondee/SessionControls";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {EmojiRain} from "@/components/testing/EmojiRain";

let data: { id: string; title: string }[] = [];

export default function TestScreen({
  numCards,
  totalPages,
}: {
  numCards: number;
  totalPages: number;
}) {
  const [pageNum, setPageNum] = useState(1);

  numCards = 4;
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
      {/*TODO: Emoji rain*/}
      <EmojiRain emoji="😘" count={30}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spondee Cards</Text>
        <SessionControls />
      </View>
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
      <TouchableOpacity style={styles.footer}>  
        <FontAwesome name="volume-up" size={36} />
      </TouchableOpacity>
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
