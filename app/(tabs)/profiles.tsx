import DropDown from "@/components/profiles/DropDown";
import { THIText } from "@/components/THIText";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { userData } from "../../app/currentProfile";

export default function Profiles() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "Last Month", value: "Last Month" },
    { label: "Last 3 Months", value: "Last 3 Months" },
  ]);
  const [dropdownWidth, setDropdownWidth] = useState(100);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Spondee Cards", value: "Spondee Cards" },
    { label: "LHM-10/Ling Cards", value: "LHM-10/Ling Cards" },
    { label: "Syllable Differentiation", value: "Syllable Differentiation" },
  ]);
  const [dropdownWidth2, setDropdownWidth2] = useState(100);

  // Function to dynamically adjust width based on text size
  const onTextLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const textWidth = event.nativeEvent.layout.width;
    setDropdownWidth(Math.min(Math.max(textWidth + 40, 100), 250)); // Min 100, Max 250
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            <THIText style={styles.emoji}>{userData.EMOJI}</THIText>
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
            {userData.USERNAME}
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
              //onPress={() =>
            >
              <Image
                source={require("../../assets/images/more-button.png")}
                style={{
                  width: 23,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <THIText
          style={{
            fontSize: 22,
            textAlign: "left",
            marginTop: 50,
          }}
        >
          Past Sessions
        </THIText>
      </View>

      <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
        <DropDown
          name="Date"
          values={["Last 7 Days", "Last Month", "Last 3 Months"]}
        />
        <DropDown
          name="Test Type"
          values={[
            "Spondee Cards",
            "LHM-10/Ling Cards",
            "Syllable Differentiation",
            "Minimal Pairs",
            "NU-CHIPS",
            "WIPI",
          ]}
        />
        <DropDown
          name="Accuracy"
          values={["< 90%", "< 70%", "< 50%", "< 20%"]}
        />
      </View>
      {/* rectangle that contains all the cards*/}
      <View style={styles.cardsContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 50,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  buttonStyle: {
    width: 52,
    height: 52,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 22.5,
    backgroundColor: "#F6F6F6",
  },
  dropDownButtonStyle: {
    width: 85,
    height: 52,
    paddingTop: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  dropdown: {
    minWidth: 85, // Minimum width to prevent collapse
    maxWidth: 200, // Maximum width to keep it reasonable
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    minWidth: 100, // Ensure dropdown expands dynamically
    maxWidth: 250,
  },
  hiddenText: {
    position: "absolute",
    opacity: 0,
    fontSize: 16,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    flexWrap: "wrap",
  },
  footer: {
    position: "absolute",
    right: 50,
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    aspectRatio: 1 / 1,
    backgroundColor: "#95D0E7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
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
