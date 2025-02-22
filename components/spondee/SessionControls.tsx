import Settings from "@/app/(tabs)/settings";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "../THIText";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Trial} from "@/app/(tabs)/tests/spondee";

type SessionControlProps = {
  totalTrials: number;
  numCorrect: number;
  attempts: Trial[];
  numCards: number;
  setNumCards: Dispatch<SetStateAction<number>>;
};

export interface SessionData {
    attempts: Trial[];
    soundEnabled: boolean;
    numCards: number;
}

export function SessionControls({
  totalTrials,
  numCorrect,
  numCards,
  setNumCards,
  attempts
}: SessionControlProps) {

    const [soundEnabled, setSoundEnabled] = useState(true);

    const sessionData: SessionData = {
        attempts,
        soundEnabled,
        numCards,
    }

  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        onPress={() => {
            console.log("End Session");
            console.log(numCorrect, totalTrials, "End Session");
            router.push({
                pathname: "/(tabs)/inputSessionNotes",
                params: { sessionData: JSON.stringify(sessionData) },
            });
        }}
        style={styles.button}
      >
        <THIText style={styles.buttonText}>End Session</THIText>
      </TouchableOpacity>
      <Settings numCards={numCards} setNumCards={setNumCards} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
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
