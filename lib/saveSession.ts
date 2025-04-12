import { Trial } from "@/app/tests/speech_therapy/spondee";
import { SessionData } from "@/components/spondee/SessionControls";
import { THIText } from "@/components/THIText";
import { userData } from "@/lib/currentProfile";
import { supabase } from "@/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";

export async function createTestSession(sessionUUID: string, childId: string) {
    try {
      const { data, error } = await supabase
        .from("test_session")
        .insert({ id: sessionUUID, child_id: childId })
        .select()
        .single();
  
      if (error) {
        console.log("Error fetching test session:", error.message);
        return null;
      }
      console.log("Test session created:", data);
      return data;
    } catch (error) {
      console.error("Error creating test session:", (error as Error).message);
      return null;
    }
}
  
export async function insertAttempts(sessionUUID: string, parsedAttempts: Trial[]) {
    const trials = parsedAttempts.map((trial) => ({
      prompt: trial.prompt,
      response: trial.response,
      test_session_id: sessionUUID,
    }));
  
    const { data, error } = await supabase.from("test_trial").insert(trials);
  
    if (error) {
      console.log("Error fetching test trial:", error.message);
      return null;
    }
    console.log("Successfully inserted trials");
}
  
export async function insertSettingsData(sessionUUID: string, numCards: number, soundEnabled:boolean, maximumThresholdLevel:number, sessionNotes:string) {
    try {
      const { data, error } = await supabase
        .from("test_session_settings")
        .insert({
          id: sessionUUID,
          set_size: numCards,
          sound_enabled: soundEnabled,
          max_thresh_level: maximumThresholdLevel,
          session_notes: sessionNotes,
        })
        .select()
        .single();
      if (error) {
        console.log("Error creating settings data:", error.message);
      }
      console.log("Test session created:", data);
      return data;
    } catch (error) {
      console.error("Error creating test session:", (error as Error).message);
      return null;
    }
}
  
const generateUUID = () => {
    const newUUID = uuid.v4();
    console.log("Generated UUID:", newUUID);
    return newUUID;
};
  
export async function handleSubmission(parsedAttempts: Trial[], numCards: number, soundEnabled:boolean, maximumThresholdLevel:number, sessionNotes:string) {
    const userUUID = userData.CURRENT_ID;
    const sessionUUID = generateUUID();
  
    try {
      const newSession = await createTestSession(sessionUUID, userUUID);
  
      if (!newSession) {
        throw new Error("Failed to create test session");
      }
  
      await insertAttempts(sessionUUID,parsedAttempts);
      await insertSettingsData(sessionUUID,numCards,soundEnabled,maximumThresholdLevel,sessionNotes);
  
      console.log("Test session created and attempts inserted successfully");
    } catch (error) {
      console.error("Error in submission process:", error);
    }
}