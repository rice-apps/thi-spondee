/*
 * This screen allows an audiologist to choose a set size, change some options, and then
 * it will generate a code for them to enter at ____.com — the answer key website.
 */

import { THIText } from "@/components/THIText";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";


export default function AudiologySettings() {
  const [size, setSize] = useState(4);
  const [maintainSameCards, setMaintainSameCards] = useState(false);
  const [code, setCode] = useState([0, 0, 0, 0, 0, 0]);
  const [showCode, setShowCode] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);

  const generateCode = () => {
    let newCode: number[] = [];
    newCode.push(size);
    if (maintainSameCards) {
      newCode.push(1);
    } else {
      newCode.push(0);
    }
    for (let i = 0; i < 4; i++) {
      newCode.push(Math.floor(Math.random() * 10));
    }
    setCode(newCode);
    setShowCode(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.heading}>Set Size</Text>

        <View style={styles.sliderContainer}>
          {/*----SET SIZE----*/}
          <View>
            <THIText style={styles.textStyle}>Set Size</THIText>
            <Slider
              style={{ width: 334, height: 40 }}
              lowerLimit={4}
              minimumValue={4}
              upperLimit={12}
              maximumValue={12}
              minimumTrackTintColor="#6D88B480"
              maximumTrackTintColor="#6D88B480"
              thumbTintColor="#95D0E7"
              step={2}
              value={size}
              onValueChange={(newValue) => setSize(newValue)}
            />
            {/* Slider label "4 -- 8 -- 12" */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 334,
              }}
            >
              <THIText> 4</THIText>
              <THIText> 8</THIText>
              <THIText>12 </THIText>
            </View>
          </View>
        </View>

        <Text style={styles.heading}>Maintain Same Cards</Text>
        <Switch
          value={maintainSameCards}
          onValueChange={setMaintainSameCards}
          trackColor={{ false: "#d3d3d3", true: "#a0d5e3" }}
          thumbColor={maintainSameCards ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#d3d3d3"
          style={styles.switch}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            generateCode();
            setDisableContinue(false);
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Save the settings to generate the code
        </Text>

        <View style={styles.codeBoxesContainer}>
          {code.map((box, i) => (
            <View key={i} style={styles.codeBox}>
              {showCode ? <THIText style={{}}>{box}</THIText> : <></>}
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
          router.push({
            pathname: "/tests/audiology/spondee",
            params: { code: JSON.stringify({ testCode: code.join("") }) },
          });
        }}
      >
        <FontAwesome name="angle-right" size={36} disabled={disableContinue} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-around",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    width: "40%",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderPlaceholder: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  sliderHandle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "#87ceeb",
    position: "absolute",
    left: 0,
    top: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#d3d3d3",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderMark: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
    marginTop: -2,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    color: "#555",
  },
  switch: {
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: "#87ceeb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  codeBoxesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 48,
    flexWrap: "wrap",
    gap: 16,
  },
  codeBox: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    marginTop: 15,
    marginBottom: 15,
    color: "black",
    textAlign: "left",
  },
  footer: {
    position: "absolute",
    right: 50,
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: "#95D0E7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  backButton: {
    marginRight: 15,
    marginTop: 5,
  },
});
