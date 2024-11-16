import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function StartingPointPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/thi-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => console.log("Start new test")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start new test</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>OR</Text>
          </View>

          <TouchableOpacity
            onPress={() => console.log("Select child profile")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Select child profile</Text>
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
    borderRadius: 25,
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
