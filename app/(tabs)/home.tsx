import Card from "@/components/home/Card";
import TopBar from "@/components/home/TopBar";
import profilePicker from "../profilePicker";
import { THIText } from "@/components/THIText";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { userData } from "../../app/currentProfile";

export default function Home() {
  const [testSessions, setTestSessions] = useState<{ id: any }[] | null>(null);

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
  const childId = userData.CURRENT_ID;
  //const sessions =  await fetchTestSessions(childId);

  async function fetchTestResults(sessionIds: readonly any[]) {
    const { data, error } = await supabase
      .from("test_trial")
      .select("prompt, response, test_session_id")
      .in('test_session_id', sessionIds);

    if (error) {
      console.error('Error fetching test results:', error);
      return null;
    }

    return data;
  }
  //const sessionIds = sessions.map(session => session.id);

  // Only run once:
  useEffect(() => {
    const loadTestSessions = async () => {
      const sessions = await fetchTestSessions(childId);
      setTestSessions(sessions ?? []); // Ensure it's always an array
    };

    loadTestSessions();
  }, [childId]);

  return (
    <View style={styles.container}>
      <TopBar emoji={userData.EMOJI} username={userData.USERNAME} />
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
        {testSessions?.map(({ id }) => (
          <Card key={id} testId={id} />
        ))}
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
