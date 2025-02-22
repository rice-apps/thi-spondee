import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "../THIText";

const TopBar = ({ emoji, username }: { emoji: string; username: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <THIText style={styles.emoji}>{emoji}</THIText>
        </View>
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
          {username}
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
};

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
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 100,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
  },
  name: {
    flex: 5,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 60,
  },
});

export default TopBar;
