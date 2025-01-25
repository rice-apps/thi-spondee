import React from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

export default function InputSessionNotes() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.wrapper}>
     
      <View style={styles.sidebar}>
        <View style={styles.item1}>
          <Ionicons name="home" size={40} color="#000" />
          <Text style={styles.sidebarItemText}>Dashboard</Text>
        </View>

        <View style={styles.sidebarItemWrapper}>
          <Ionicons name="headset-outline" size={40} color="#000" />
          <Text style={styles.sidebarItemText}>Testing</Text>
        </View>

        <View style={styles.sidebarItemWrapper}>
          <Ionicons name="person-outline" size={40} color="#000" />
          <Text style={styles.sidebarItemText}>Profiles</Text>
        </View>

        <View style={[styles.sidebarItemWrapper, styles.logOut]}>
          <Ionicons name="log-out-outline" size={40} color="#000" />
          <Text style={styles.sidebarItemText}>Log Out</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Optional Session Notes</Text>
        <Text style={styles.date}>Spondee Cards • {formattedDate}</Text>

        <Text style={styles.label}>Maximum Threshold Level</Text>
        <View style={styles.levelInput}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#C4C4C4"
        />
        <Text style={styles.dB}>dB</Text>
        </View>
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Type any additional notes here"
          placeholderTextColor="#C4C4C4"
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  sidebar: {
    width: 125,
    paddingVertical: 30,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  item1: {
    marginTop: 100,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom: 40, 
  },
  sidebarItemWrapper: {
    alignItems: "center",
    marginBottom: 40, 
  },
  sidebarItemText: {
    fontSize: 14,
    color: "#5B6366",
    marginTop: 10, 
    textAlign: "center",
  },
  logOut:{
    paddingTop: 300,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
  },
  header: {
    color: "#17262B",
    fontSize: 28,
    fontWeight: "500",
    fontFamily: "Inter",
    marginBottom: 13,
    marginTop: 100,
  },
  date: {
    color: "#5B6366",
    fontSize: 16,
    marginBottom: 30,
  },
  label: {
    fontSize: 22,
    color: "#17262B",
    marginBottom: 8,
    marginTop: 50,
  },
  levelInput: {
    flexDirection: "row",  
    alignItems: "center", 
    marginBottom: 20,  
  },
  input: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,  
    width: "10%",  
  },
  dB: {
    fontSize: 18,
    color: "#17262B",
  },
  notesInput: {
    height: "30%",
    textAlignVertical: "top",
    width: "50%",
  },
  buttonWrapper: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#AEE0F2",
    borderRadius: 40,
    paddingVertical: 17,
    paddingHorizontal: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
});