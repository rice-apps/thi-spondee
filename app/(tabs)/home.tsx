import Card from "@/components/home/Card";
import TopBar from "@/components/home/TopBar";
import profilePicker from "../profilePicker";
import { THIText } from "@/components/THIText";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {supabase} from "@/lib/supabase";

export default function Home() {

  async function fetchTestSessions(childId: string) {
    const { data, error } = await supabase
      .from("test_session")
      .select("id")
      .eq('child_id', childId);
  
    if (error) {
      console.error('Error fetching test sessions:', error);
      return null;
    }
  
    return data; // Returns an array of sessions
  }
  

return (
  <View style={styles.container}>
    <TopBar />
    <View>
      <THIText
        style={{
          fontSize: 22,
          textAlign: "left",
          marginTop: 50,
        }}
      >
        Recent Sessions 
      </THIText>
    </View>
    {/* rectangle that contains all the cards*/}
    <View style={styles.cardsContainer}>
      
      <Card testId="1" />
      <Card testId="2" />
      <Card testId="3" />
    </View>
    <View style={styles.footer}>
      {/* need to add on click */}
      <AntDesign name="plus" size={24} color="black" />
      <THIText style={{ fontSize: 22 }}>New Test</THIText>
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
  buttonStyle: {
    width: 140,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
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
});
