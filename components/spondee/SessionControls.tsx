import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Feather from '@expo/vector-icons/Feather';

export function SessionControls() {
    return (
        <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={() => console.log("End Session")} style={styles.button}>
                <Text style={styles.buttonText}>End Session</Text>
            </TouchableOpacity>
            <Feather name="settings" size={24} color="black" style={{ flex: 1}} />
        </View>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e6e6e6",
    borderRadius: 15,
    padding: 15,
    flex: 2,
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
    flex: 1.5,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
