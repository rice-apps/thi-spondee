import { THIText } from "@/components/THIText";
import { SessionControls } from "@/components/spondee/SessionControls";
import { SpondeeCard } from "@/components/spondee/SpondeeCardDefinitions";
import TestGrid from "@/components/spondee/TestGrid";
import { EmojiRain } from "@/components/testing/EmojiRain";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SpondeeCards from "../../../components/spondee/SpondeeCardDefinitions";
import { userData } from "../../../lib/currentProfile";

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

export interface Trial {
  prompt: string;
  response: string;
}

export default function TestScreen() {
  const [totalTrials, setTotalTrials] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  // Emoji rain trigger / reward mechanism. Just do setRainTrigger(true)
  const [rainTrigger, setRainTrigger] = useState(false);
  // Store selected cards in state
  const [selectedCards, setSelectedCards] = useState<SpondeeCard[]>([]);
  const [correctCard, setCorrectCard] = useState("");
  const [attempts, setAttempts] = useState<Trial[]>([]);
  const [numCards, setNumCards] = useState(4);
  const [data, setData] = useState<any>();

  /**
   * Randomizes cards shown, updates state, and returns that list (not limited by set size)
   */
  function randomizeSelectedCards(numberOfCards: number) {
    numberOfCards = numberOfCards ? numberOfCards : 4;
    const initialSelectedCards = shuffleArray(SpondeeCards).slice(
      0,
      numberOfCards
    );
    setSelectedCards(initialSelectedCards);
    return initialSelectedCards;
  }

  // Initialize selected cards and first correct card
  useEffect(() => {
    const initialSelectedCards = randomizeSelectedCards(numCards);

    const initialCorrectCard =
      initialSelectedCards[Math.floor(Math.random() * numCards)].word;
    setCorrectCard(initialCorrectCard);
  }, []); // Empty dependency array means this only runs once on mount

  // Generate a new random card and updates state from the specified list of selected cards
  const generateNewCard = (list: SpondeeCard[]) => {
    const randomIdx = Math.floor(Math.random() * list.length);
    setCorrectCard(list[randomIdx].word);
  };

  console.log("correct: ", correctCard);
  console.log("total ", totalTrials, " numCorrect: ", numCorrect);

  // Callback after a card is tapped
  const callback = (item: { id: number; title: string }) => {
    console.log(item.title, correctCard);
    if (correctCard === item.title) {
      setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
    }
    setTotalTrials((prevTotalTrials) => prevTotalTrials + 1);

    setRainTrigger(true);
  };

  useEffect(() => {
    console.log("triggered");
    speakCorrectCard(correctCard);
  }, [correctCard]);

  useEffect(() => {
    const newData = selectedCards.map((card, i) => ({
      id: i,
      title: card.word,
    }));
    setData(newData);
  }, [selectedCards]);

  useEffect(() => {
    const list = randomizeSelectedCards(numCards);
    generateNewCard(list);
  }, [numCards]);

  return (
    <View style={styles.page}>
      <EmojiRain
        emoji={userData.EMOJI}
        count={30}
        trigger={rainTrigger}
        onRainComplete={() => {
          // Callback when rain finishes
          console.log("Rain completed");
          // Generate new list
          let list = randomizeSelectedCards(numCards);
          generateNewCard(list);
          setRainTrigger(false);
        }}
      />
      <View style={styles.titleContainer}>
        <THIText style={styles.title}>Spondee Cards</THIText>
        <SessionControls
          totalTrials={totalTrials}
          numCorrect={numCorrect}
          numCards={numCards}
          setNumCards={setNumCards}
          attempts={attempts}
        />
      </View>
      <TestGrid
        numCards={numCards}
        data={data}
        correctCard={correctCard}
        attempts={attempts}
        setAttempts={setAttempts}
        callback={callback}
      />
      <TouchableOpacity
        style={styles.footer}
        onPress={() => speakCorrectCard(correctCard)}
      >
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
    aspectRatio: 1,
    backgroundColor: "#95D0E7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
