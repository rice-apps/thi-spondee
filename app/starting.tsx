import { THIText } from "@/components/THIText";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchGuestData } from "../lib/currentProfile";

export default function StartingPointPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/thi-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              fetchGuestData();
              router.push("/selection");
            }}
            style={styles.button}
          >
            <THIText style={styles.buttonText}>Start new test</THIText>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <THIText style={styles.dividerText}>OR</THIText>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/profilePicker")}
            style={styles.button}
          >
            <THIText style={styles.buttonText}>Select child profile</THIText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 14,
    color: "#666",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 256,
    height: 96,
    marginBottom: 65,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: 326,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#95D0E7",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
    marginVertical: 35,
  },
  buttonText: {
    textAlign: "center",
    color: "#17262B",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "inter",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerText: {
    color: "#17262B",
    fontSize: 18,
    fontFamily: "inter",
  },
});
