import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import { THIText } from "../THIText";
import { supabase } from "@/lib/supabase";
import profilePicker from "@/app/profilePicker";
import { userData } from "@/app/currentProfile"

import { useEffect, useState } from "react";

type CardProps = {
  testId: string;
}

export default function Card({
  testId
}: CardProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  //console.log(testId);

  const [accuracy, setAccuracy] = useState(0.0);
  const childId = userData.CURRENT_ID;

  async function fetchTestResults(sessionId: string) {
    const { data, error } = await supabase
      .from("test_trial")
      .select("prompt, response, test_session_id")
      .eq('test_session_id', sessionId);

    if (error) {
      console.error(`Error fetching test results for ${sessionId}:`, error);
      return null;
    }

    return data;
  }

  function calculateAccuracy(results: { prompt: string; response: string; test_session_id: string; }[]) {
    if (!results || results.length === 0) return 0;

    const correctCount = results.filter(
      (item) => item.prompt.trim() === item.response.trim()
    ).length;

    return ((correctCount / results.length)).toFixed(2);
  }

  async function fetchDataAndCalculateAccuracy(childId: string) {
    try {
      const testResults = await fetchTestResults(testId);

      if (testResults) {
        const accuracy = calculateAccuracy(testResults);
        console.log(`Accuracy for test ID ${testId}: ${accuracy}%`);
        return accuracy;
      } else {
        console.log('No test results found.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  useEffect(() => {
    fetchDataAndCalculateAccuracy(childId).then(result => {
      setAccuracy(Number(result) || 0);
    });
  }, []);

  return (
    <View style={styles.box}>
      <View style={styles.innerBox}>
        <View style={styles.textContainer}>
          <THIText style={styles.dateText}>{formattedDate}</THIText>
          <THIText style={styles.textStyle}>Spondee Cards</THIText>
          <View style={styles.whiteBoxContainer}>
            <View style={styles.whiteBox}>
              <THIText
                style={{
                  textAlign: "center",
                  fontWeight: 400,
                  padding: 4,
                  fontSize: 15,
                  color: "white",
                }}
              >
                4 set
              </THIText>
            </View>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <Progress.Circle
            indeterminate={false}
            animated={false}
            progress={accuracy}
            showsText={true}
            size={60}
            textStyle={{ fontSize: 18, color: "black", fontWeight: 500 }}
            color={"#7B9CCF"}
            unfilledColor={"#D9D9D9"}
            borderWidth={0}
            thickness={6}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#F6F6F6",
    width: 275,
    height: 195,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 40,
  },
  innerBox: {
    width: 210,
    height: 152,
  },
  dateText: {
    color: "#6D6D6D",
    fontSize: 15,
  },
  textStyle: {
    color: "black",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "400",
    marginBottom: -5,
  },
  whiteBox: {
    backgroundColor: "#6D88B4",
    width: 66,
    height: 28,
    borderRadius: 20,
  },
  whiteBoxContainer: {
    // position: "absolute",
    display: "flex",
    flexDirection: "row",
    marginTop: 17,
    gap: 15,
  },
  textContainer: {},
  progressContainer: {
    display: "flex",
    // justifyContent: "flex-end",
    alignContent: "center",
    flex: 1,
    flexDirection: "row-reverse",
  },
});
