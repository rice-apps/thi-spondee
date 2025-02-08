import {SessionControls} from "@/components/spondee/SessionControls";
import {SpondeeCard} from "@/components/spondee/SpondeeCardDefinitions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Speech from "expo-speech";
import {useEffect, useState} from "react";
import SpondeeCards from "../../../components/spondee/SpondeeCardDefinitions";

import TestGrid from "@/components/spondee/TestGrid";
import {THIText} from "@/components/THIText";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {EmojiRain} from "@/components/testing/EmojiRain";
import {userData} from "@/app/currentProfile";

// let data: { id: string; title: string}[] = [];

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function speakCorrectCard(correctCard: string) {
  Speech.speak(correctCard, {
    language: "en", // Language code (e.g., 'en' for English)
    pitch: 1.0, // Pitch of the voice (1.0 is normal)
    rate: 1.0, // Speed of the speech (1.0 is normal)
  });
}

export default function TestScreen() {
  const [totalTrials, setTotalTrials] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);

  const numCards = 4;

  // Emoji rain trigger / reward mechanism. Just do setRainTrigger(true)
  const [rainTrigger, setRainTrigger] = useState(false);

  // Callback after a card is tapped
  const callback = (item: { id: number; title: string; }) => {
    console.log(item.title, correctCard);
    if (correctCard === item.title) {
      setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
    }
    setTotalTrials((prevTotalTrials) => prevTotalTrials + 1);

    setRainTrigger(true);
  };

  // Select random numCards from shuffled set of spondee cards
  const selectedCards: SpondeeCard[] = shuffleArray(SpondeeCards).slice(
    0,
    numCards
  );

  // Randomly choose correct card
  const randomIdx: number = Math.floor(Math.random() * selectedCards.length);
  const correctCard: string = selectedCards[randomIdx].word;
  console.log("correct: ", correctCard);
  console.log("total ", totalTrials, " numCorrect: ", numCorrect);

  useEffect(() => {
    speakCorrectCard(correctCard);
  }, [correctCard]);

  const data = selectedCards.map((card, i) => ({
    id: i,
    title: card.word,
  }));

  return (
    <View style={styles.page}>
      <EmojiRain
        emoji={userData.EMOJI}
        count={30}
        trigger={rainTrigger}
        onRainComplete={() => {
          // Optional callback when rain finishes
          console.log('Rain completed');
          setRainTrigger(false);
        }}
      />
      <View style={styles.titleContainer}>
        <THIText style={styles.title}>Spondee Cards</THIText>
        <SessionControls totalTrials={totalTrials} numCorrect={numCorrect}/>
      </View>
      <TestGrid
        numCards={numCards}
        data={data}
        correctCard={correctCard}
        setTotalTrials={setTotalTrials}
        setNumCorrect={setNumCorrect}
        callback={callback}
      />
      <TouchableOpacity
        style={styles.footer}
        onPress={() => speakCorrectCard(correctCard)}
      >
        <FontAwesome name="volume-up" size={36}/>
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
