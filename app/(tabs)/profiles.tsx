import Card from "@/components/home/Card";
import TopBar from "@/components/home/TopBar";
import { THIText } from "@/components/THIText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View, TouchableOpacity, Image} from "react-native";
import { userData } from "../../app/currentProfile";
import { router } from "expo-router";
import React, { useState } from 'react';



export default function Profiles() {
  const [selectedValue, setSelectedValue] = useState('');

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
                  style={{ width: 23, justifyContent: "center", alignItems: "center" }}
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
      <View style={{flexDirection: "row"}}>
      
      </View>
      {/* rectangle that contains all the cards*/}
      <View style={styles.cardsContainer}>
        
      </View>
      
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
    width: 52,
    height: 52,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#F6F6F6",
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
