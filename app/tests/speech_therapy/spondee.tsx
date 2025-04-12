import {THIText} from "@/components/THIText";
import {SessionControls} from "@/components/spondee/SessionControls";
import {SpondeeCard} from "@/components/spondee/SpondeeCardDefinitions";
import TestGrid from "@/components/spondee/TestGrid";
import {EmojiRain} from "@/components/testing/EmojiRain";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, TouchableOpacity, View, Text, Platform} from "react-native";
import SpondeeCards from "@/components/spondee/SpondeeCardDefinitions";
import {userData} from "@/lib/currentProfile.ts";
import {rewardSets} from "@/constants/RewardSets.tsx";
import {useFonts} from "expo-font";
import {Audio} from 'expo-av';
import * as Speech from 'expo-speech';

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
  // Play an empty sound so that TTS can bypass silent mode on iOS
  if (Platform.OS === "ios") {
    Audio.Sound.createAsync(require("@/assets/audio/empty_sound.mp3"))
      .then(async (result) => {
        // console.log(`Playing ${audioMap[correctCard]} 2`)
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
        await result.sound.playAsync();
        Speech.speak(correctCard, {
          language: "en", // Language code (e.g., 'en' for English)
          pitch: 0.8, // Pitch of the voice (1.0 is normal)
          rate: 0.8, // Speed of the speech (1.0 is normal)
        });
      })
      .catch((error) => {
        console.error('Error playing sound:', error);
      });
  } else {
    Speech.speak(correctCard, {
      language: "en", // Language code (e.g., 'en' for English)
      pitch: 0.8, // Pitch of the voice (1.0 is normal)
      rate: 0.8, // Speed of the speech (1.0 is normal)
    });
  }
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
  const [emojiPopupTrigger, setEmojiPopupTrigger] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [numCards, setNumCards] = useState(4);
  const [data, setData] = useState<any>();
  const [answerEnabled, setAnswerEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastAnswerCorrect, setlastAnswerCorrect] = useState(false);

  useFonts({
    'Fredoka': require('@/assets/fonts/fredoka.ttf'),
  });

  function updateNumberOfCards(num: number) {
    setNumCards(num);
    // Generate new list
    let list = randomizeSelectedCards(num);
    generateNewCard(list);
  }


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

  const buildRandomCorrectText = () => {
    const correctRandomIdx = Math.floor(Math.random() * rewardSets.correct.length);

    return <View style={{zIndex: 3, paddingRight: 300, paddingBottom: 200, transform: [{rotate: '-10deg'}]}}>
      <Text style={[styles.emojiText, {
        color: rewardSets.correct[correctRandomIdx].bg,
        textShadowOffset: {width: 2, height: 2},
        textShadowColor: rewardSets.correct[correctRandomIdx].fg
      }]}>
        {rewardSets.correct[correctRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.correct[correctRandomIdx].bg,
        textShadowOffset: {width: -2, height: -2},
        textShadowColor: rewardSets.correct[correctRandomIdx].fg
      }]}>
        {rewardSets.correct[correctRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.correct[correctRandomIdx].bg,
        textShadowOffset: {width: -2, height: 2},
        textShadowColor: rewardSets.correct[correctRandomIdx].fg
      }]}>
        {rewardSets.correct[correctRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.correct[correctRandomIdx].bg,
        textShadowOffset: {width: 2, height: -2},
        textShadowColor: rewardSets.correct[correctRandomIdx].fg
      }]}>
        {rewardSets.correct[correctRandomIdx].phrase}
      </Text>
    </View>
  }

  const buildRandomIncorrectText = () => {
    const incorrectRandomIdx = Math.floor(Math.random() * rewardSets.incorrect.length);

    // TODO: Full outline for incorrect (copy from above)

    return <View style={{zIndex: 3, paddingLeft: 50, paddingBottom: 200, transform: [{rotate: '10deg'}]}}>
      <Text style={[styles.emojiText, {
        color: rewardSets.incorrect[incorrectRandomIdx].bg,
        textShadowOffset: {width: 2, height: 2},
        textShadowColor: rewardSets.incorrect[incorrectRandomIdx].fg
      }]}>
        {rewardSets.incorrect[incorrectRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.incorrect[incorrectRandomIdx].bg,
        textShadowOffset: {width: -2, height: -2},
        textShadowColor: rewardSets.incorrect[incorrectRandomIdx].fg
      }]}>
        {rewardSets.incorrect[incorrectRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.incorrect[incorrectRandomIdx].bg,
        textShadowOffset: {width: -2, height: 2},
        textShadowColor: rewardSets.incorrect[incorrectRandomIdx].fg
      }]}>
        {rewardSets.incorrect[incorrectRandomIdx].phrase}
      </Text>
      <Text style={[styles.emojiText, {
        color: rewardSets.incorrect[incorrectRandomIdx].bg,
        textShadowOffset: {width: 2, height: -2},
        textShadowColor: rewardSets.incorrect[incorrectRandomIdx].fg
      }]}>
        {rewardSets.incorrect[incorrectRandomIdx].phrase}
      </Text>
    </View>;
  }

  console.log("correct: ", correctCard);
  console.log("total ", totalTrials, " numCorrect: ", numCorrect);

  // Callback after a card is tapped
  const callback = (item: { id: number; title: string }) => {
    console.log(item.title, correctCard);
    if (correctCard === item.title) {
      setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
      setlastAnswerCorrect(true);
    } else {
      setlastAnswerCorrect(false);
    }
    setTotalTrials((prevTotalTrials) => prevTotalTrials + 1);

    if (answerEnabled) {
      setEmojiPopupTrigger(true);
    } else {
      setRainTrigger(true);
    }
  };

  useEffect(() => {
    console.log("triggered");
    if (soundEnabled) {
      speakCorrectCard(correctCard);
    }
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

  const scale = useRef(new Animated.Value(0)).current;

  const popIn = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const popOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Generate new list
      let list = randomizeSelectedCards(numCards);
      generateNewCard(list);
      setEmojiPopupTrigger(false);
    });
  };


  useEffect(() => {
    if (emojiPopupTrigger) {
      popIn();
      const timeoutId = setTimeout(popOut, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [emojiPopupTrigger]);

  console.log(soundEnabled);

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
          answerEnabled={answerEnabled}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
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
      {emojiPopupTrigger && (
        <Animated.View style={[styles.emojiContainer, {opacity: fadeAnim, transform: [{scale}]}]}>
          {lastAnswerCorrect ? (
            buildRandomCorrectText()
          ) : (
            buildRandomIncorrectText()
          )}
          <Text style={styles.emoji}>
            {userData.EMOJI}
          </Text>
        </Animated.View>
      )}

      {soundEnabled &&
          <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                if (soundEnabled) {
                  speakCorrectCard(correctCard);
                }
              }}
          >
              <FontAwesome name="volume-up" size={36}/>
          </TouchableOpacity>}
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
  emojiContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  emojiText: {
    fontFamily: "Fredoka",
    fontWeight: "bold",
    fontSize: 40,
    position: "absolute",
    textShadowRadius: 0,
  },
  emoji: {
    fontSize: 200,
    position: "absolute",
    zIndex: 2,
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
