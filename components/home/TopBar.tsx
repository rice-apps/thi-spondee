import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "../THIText";
export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}></View>
      </View>
      <View style={styles.name}>
        <THIText
          style={{
            color: "black",
            fontSize: 28,
            fontWeight: "600",
            textAlign: "left",
          }}
        >
          Name's Dashboard
        </THIText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => router.push("/profilePicker")}
          >
            <THIText
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Switch Profile
            </THIText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 140,
    height: 50,
    padding: 8,
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#95D0E7",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    width: 100,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 1,
  },
  name: {
    flex: 5,
    justifyContent: "center",
  },
});
