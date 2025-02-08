import Settings from "@/app/(tabs)/settings";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "../THIText";
import {Dispatch, SetStateAction} from "react";
import {Trial} from "@/app/(tabs)/tests/spondee";

type SessionControlProps = {
  totalTrials: number;
  numCorrect: number;
  attempts: Trial[];
  //setTotalTrials: (update: (prev: number) => number) => void;
  //setNumCorrect: (update: (prev: number) => number) => void;
  numCards: number;
  setNumCards: Dispatch<SetStateAction<number>>;
};

export function SessionControls({
  totalTrials,
  numCorrect,
  numCards,
  setNumCards,
  attempts
}: SessionControlProps) {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        onPress={() => {
            console.log("End Session");
            console.log(numCorrect, totalTrials, "End Session");
            router.push({
                pathname: "/(tabs)/inputSessionNotes",
                params: { attempts: JSON.stringify(attempts) },
            });
        }}
        style={styles.button}
      >
        <THIText style={styles.buttonText}>End Session</THIText>
      </TouchableOpacity>
      <Settings numCards={numCards} setNumCards={setNumCards}/>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#95D0E7",
    borderRadius: 15,
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 27,
  },
});
