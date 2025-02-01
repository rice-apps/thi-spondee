import Settings from "@/app/(tabs)/settings";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "../THIText";

type SessionControlProps = {
  totalTrials: number;
  numCorrect: number;
  //setTotalTrials: (update: (prev: number) => number) => void;
  //setNumCorrect: (update: (prev: number) => number) => void;
}

export function SessionControls({totalTrials, numCorrect} : SessionControlProps) {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        onPress={() => console.log(numCorrect, totalTrials, "End Session")}
        style={styles.button}
      >
        <THIText style={styles.buttonText}>End Session</THIText>
      </TouchableOpacity>
      <Settings />
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
