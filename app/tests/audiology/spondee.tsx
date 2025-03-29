import { THIText } from "@/components/THIText";
import { SessionControls } from "@/components/spondee/SessionControls";
import { SpondeeCard } from "@/components/spondee/SpondeeCardDefinitions";
import TestGrid from "@/components/spondee/TestGrid";
import { EmojiRain } from "@/components/testing/EmojiRain";
import { generateQuiz, QuizQuestion } from "@/lib/quizGeneration";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { userData } from "../../../lib/currentProfile";

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
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [answerEnabled, setAnswerEnabled] = useState(false);

  const { code } = useLocalSearchParams<{ code?: string }>();

  useEffect(() => {
    if (code) {
      try {
        const parsedData: { testCode: string } = JSON.parse(code);
        const testCode = parsedData.testCode;
        // setSize is 2 digits
        let setSize;
        let maintainCards;
        let randomSeed;
        if (testCode.length === 7) {
          setSize = Number(testCode.slice(0, 2));
          maintainCards = testCode[2] === "1" ? true : false;
          randomSeed = testCode.slice(3);
        } else {
          setSize = Number(testCode[0]);
          maintainCards = testCode[2] === "1" ? true : false;
          randomSeed = testCode.slice(2);
        }

        const generatedQuiz = generateQuiz(setSize, randomSeed);
        setNumCards(setSize);
        setQuiz(generatedQuiz);
        setCorrectCard(generatedQuiz[0].correctAnswer);
        setSelectedCards(generatedQuiz[0].choices);
        setIdx(1);
      } catch (e) {
        console.error("Error parsing parsedData: " + e);
      }
    }
  }, []);

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
    const newData = selectedCards.map((card, i) => ({
      id: i,
      title: card.word,
    }));
    setData(newData);
  }, [selectedCards]);

  return (
    <View style={styles.page}>
      <EmojiRain
        emoji={userData.EMOJI}
        count={30}
        trigger={rainTrigger}
        onRainComplete={() => {
          // Callback when rain finishes
          // move to next set of cards
          setCorrectCard(quiz[idx].correctAnswer);
          setSelectedCards(quiz[idx].choices);
          setIdx(idx + 1);
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
          audiology={true}
          answerEnabled={answerEnabled}
          setAnswerEnabled={setAnswerEnabled}
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
