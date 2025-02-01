import Card from "@/components/spondee/Card";
import { SessionControls } from "@/components/spondee/SessionControls";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import SpondeeCards from "../../../components/spondee/SpondeeCardDefinitions"
import {SpondeeCard} from "@/components/spondee/SpondeeCardDefinitions";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {EmojiRain} from "@/components/testing/EmojiRain";

let data: { id: string; title: string}[] = [];

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TestScreen({
  numCards,
  totalPages,
}: {
  numCards: number;
  totalPages: number;
}) {
  // Emoji rain trigger / reward mechanism. Just do setRainTrigger(true)
  const [rainTrigger, setRainTrigger] = useState(false);
  const [totalTrials, setTotalTrials] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);

  numCards = 4;
  totalPages = 20;

  // Select random numCards from shuffled set of spondee cards
  const selectedCards: SpondeeCard[] = shuffleArray(SpondeeCards).slice(0, numCards);

  // Randomly choose correct card
  const randomIdx: number = Math.floor(Math.random() * selectedCards.length);
  const correctCard: string = selectedCards[randomIdx].word;

  const data = selectedCards.map((card, i) => ({
    id: i,
    title: card.word,
  }));

  return (
    <View style={styles.page}>
      <EmojiRain
        emoji="😘"
        count={30}
        trigger={rainTrigger}
        onRainComplete={() => {
          // Optional callback when rain finishes
          console.log('Rain completed');
          setRainTrigger(false);
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spondee Cards</Text>
        <SessionControls totalTrials={totalTrials} numCorrect={numCorrect} />
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={data}
          renderItem={({ item }) =>
              <Card text={item.title} correct={correctCard} setTotalTrials={setTotalTrials} setNumCorrect={setNumCorrect}/>}
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
