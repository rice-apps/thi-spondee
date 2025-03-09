import { Trial } from "@/app/spondee";
import { SessionData } from "@/components/spondee/SessionControls";
import { THIText } from "@/components/THIText";
import { userData } from "@/lib/currentProfile";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";

export default function InputSessionNotes() {
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [parsedAttempts, setParsedAttempts] = useState<Trial[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [numCards, setNumCards] = useState(0);
  const [maximumThresholdLevel, setMaximumThresholdLevel] = useState(0);
  const [sessionNotes, setSessionNotes] = useState<string>("");

  const { sessionData } = useLocalSearchParams<{ sessionData?: string }>();

  const generateUUID = () => {
    const newUUID = uuid.v4();
    console.log("Generated UUID:", newUUID);
    return newUUID;
  };

  useEffect(() => {
    const currentDate = new Date();
    const formatted = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFormattedDate(formatted);

    // Parse the sessionData if it exists.
    if (sessionData) {
      try {
        const parsedData: SessionData = JSON.parse(sessionData);
        setParsedAttempts(parsedData.attempts);
        setSoundEnabled(parsedData.soundEnabled);
        setNumCards(parsedData.numCards);
      } catch (error) {
        console.error("Error parsing session data:", error);
        setParsedAttempts([]);
      }
    }
  }, [sessionData]);

  async function createTestSession(sessionUUID: string, childId: string) {
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

  async function insertAttempts(sessionUUID: string) {
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

  async function insertSettingsData(sessionUUID: string) {
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

  async function handleSubmission() {
    const userUUID = userData.CURRENT_ID;
    const sessionUUID = generateUUID();

    try {
      const newSession = await createTestSession(sessionUUID, userUUID);

      if (!newSession) {
        throw new Error("Failed to create test session");
      }

      await insertAttempts(sessionUUID);
      await insertSettingsData(sessionUUID);

      console.log("Test session created and attempts inserted successfully");
    } catch (error) {
      console.error("Error in submission process:", error);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <THIText style={styles.header}>Optional Session Notes</THIText>
        <THIText style={styles.date}>Spondee Cards • {formattedDate}</THIText>

        <THIText style={styles.label}>Maximum Threshold Level</THIText>
        <View style={styles.levelInput}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#C4C4C4"
            value={
              maximumThresholdLevel ? maximumThresholdLevel.toString() : ""
            }
            onChangeText={(text) => {
              // Convert entered text to a number.
              const numericValue = Number(text);
              setMaximumThresholdLevel(isNaN(numericValue) ? 0 : numericValue);
            }}
          />
          <THIText style={styles.dB}>dB</THIText>
        </View>
        <THIText style={styles.label}>Additional Notes</THIText>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Type any additional notes here"
          placeholderTextColor="#C4C4C4"
          multiline
          numberOfLines={4}
          value={sessionNotes}
          onChangeText={(text) => setSessionNotes(text)}
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await handleSubmission();
            }}
          >
            <THIText style={styles.buttonText}>Submit</THIText>
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
  logOut: {
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
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
  },
});
