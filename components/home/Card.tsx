import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import { THIText } from "../THIText";

export default function Card() {
  return (
    <View style={styles.box}>
      <View style={styles.textContainer}>
        <THIText style={styles.textStyle}>Spondee Cards</THIText>
        <View style={styles.whiteBoxContainer}>
          <View style={styles.whiteBox}>
            <THIText style={{ textAlign: "center", padding: 3, fontSize: 14 }}>
              4 set
            </THIText>
          </View>
          <View style={styles.whiteBox}>
            <THIText style={{ textAlign: "center", padding: 3, fontSize: 14 }}>
              XX dB
            </THIText>
          </View>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Progress.Circle
          indeterminate={false}
          animated={false}
          progress={0.5}
          showsText={true}
          size={60}
          textStyle={{ fontSize: 20 }}
          color={"black"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#D9D9D9",
    width: 275,
    height: 125,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 40,
  },
  textStyle: {
    color: "black",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "400",
  },
  whiteBox: {
    backgroundColor: "white",
    width: 60,
    height: 20,
    borderRadius: 12,
  },
  whiteBoxContainer: {
    // position: "absolute",
    display: "flex",
    flexDirection: "row",
    marginTop: 17,
    gap: 15,
  },
  textContainer: {},
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
});
