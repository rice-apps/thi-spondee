import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function Profiles() {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("./sample.mp3"));
    await sound.playAsync();
  }

  return (
    <View>
      <Text style={{ color: "green", fontSize: 50 }}>Profiles Page</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={playSound}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "normal",
            textAlign: "center",
          }}
        >
          Play Sound
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 140,
    height: 50,
    padding: 8,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
  },
});
