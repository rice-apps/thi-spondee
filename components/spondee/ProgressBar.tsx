import { Button, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";

export function ProgressBar({numerator, denominator} : {numerator: number, denominator: number}) {
    let completedPercent = (numerator / denominator * 100);
    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressCenter}>
                <Text style={styles.progressText}>{numerator}/{denominator}</Text>
                <View style={styles.progressBar}>
                    <View style={{ width: `${completedPercent}%`, height: "100%", backgroundColor: "black", borderRadius: 10, }}></View>
                </View>
            </View>
        </View>
    );
}

let gray = "#e6e6e6";

const styles = StyleSheet.create({
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCenter: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    gap: 30,
    alignItems: 'center',
  },
  progressBar: {
    height: 15,
    width: '60%',
    backgroundColor: gray,
    // borderWidth: 0.5,
    borderRadius: 10,
  },
  progressText: {
    color: "black",
    paddingBottom: 5,
    fontSize: 30,
    height: "auto",
  },
});