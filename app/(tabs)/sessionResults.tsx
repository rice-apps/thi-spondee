import { Trial } from "@/app/tests/speech_therapy/spondee";
import { SessionData } from "@/components/spondee/SessionControls";
import { THIText } from "@/components/THIText";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Row, Table } from "react-native-reanimated-table";
import { SessionDetails } from "./inputSessionNotes";
export default function SessionResults() {
  const { sessionData } = useLocalSearchParams<{ sessionData?: string }>();
  const { sessionNotes } = useLocalSearchParams<{ sessionNotes?: string }>();
  const [tableData, setTableData] = useState<Trial[]>([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [setsize, setSetsize] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notes, setNotes] = useState("");
  const [thresholdLevel, setThresholdLevel] = useState(0);
  const tableHeaders = ["Word", "Response", "Result"];
  const today = new Date();

  useEffect(() => {
    if (sessionData) {
      try {
        const parsedData: SessionData = JSON.parse(sessionData);
        setTableData(parsedData.attempts);
        let correct = 0;
        parsedData.attempts.map((trial) => {
          if (trial.prompt === trial.response) {
            correct += 1;
          }
        });
        setNumCorrect(correct);
        setSetsize(parsedData.numCards);
        setSoundEnabled(parsedData.soundEnabled);
      } catch {
        console.error("unable to parse sessionData");
      }
    }
  }, [sessionData]);

  useEffect(() => {
    if (sessionNotes) {
      try {
        console.log(sessionNotes);
        const parsedNotes: SessionDetails = JSON.parse(sessionNotes);
        setNotes(parsedNotes.notes);
        setThresholdLevel(parsedNotes.thresholdLevel);
      } catch {
        console.error("unable to parse sessionNotes");
      }
    }
  }, [sessionNotes]);
  return (
    <View style={styles.container}>
      {/*----SESSION RESULTS HEADER----*/}
      <View style={{ flex: 0.25, justifyContent: "center" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 27,
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            Session Results
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/share_icon.png")}
              style={{ width: 26, height: 26, marginTop: 10, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: "28%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.grayTextStyle}>Spondee Cards</Text>
          <Image
            source={require("../../assets/images/gray_dot.png")}
            style={{
              width: 10,
              height: 10,
              marginTop: 23,
              marginHorizontal: 10,
            }}
          />
          <Text style={styles.grayTextStyle}>
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>

      {/*----MAIN CONTENT----*/}
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/*----COLUMN 1: METRICS----*/}
        <View style={{ width: "40%" }}>
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              borderColor: "#7B9CCF",
              justifyContent: "center",
              padding: 30,
              marginBottom: 30,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 22,
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              Setting Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "70%",
                justifyContent: "space-between",
              }}
            >
              <THIText style={styles.blackTextStyle}>
                Set Size: {setsize}{" "}
              </THIText>
              <THIText style={styles.blackTextStyle}>
                Sound: {soundEnabled ? "On" : "Off"}
              </THIText>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              borderColor: "#7B9CCF",
              justifyContent: "center",
              padding: 30,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 22,
                  fontWeight: "normal",
                  textAlign: "left",
                }}
              >
                Additional Notes
              </Text>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/edit_icon.png")}
                  style={{
                    width: 22,
                    height: 22,
                    marginTop: 3,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.blackTextStyle}>
              Threshold Level: {thresholdLevel} dB
            </Text>
            <Text
              style={{
                color: "#17262B",
                marginTop: 25,
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              {notes}
            </Text>
          </View>
        </View>

        {/*----COLUMN 2: WORDS----*/}
        <View style={{ width: "50%" }}>
          <View
            style={{
              width: "65%",
              borderWidth: 1,
              borderColor: "#7B9CCF",
              justifyContent: "center",
              padding: 30,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 22,
                fontWeight: "normal",
                textAlign: "left",
                marginBottom: 25,
              }}
            >
              Overall Score
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "auto",
                justifyContent: "space-between",
              }}
            >
              <CircularProgress
                value={Math.round((numCorrect / tableData.length) * 100)}
                radius={50}
                duration={500}
                valueSuffix={"%"}
                progressValueColor={"#000000"}
                activeStrokeColor={"#7B9CCF"}
                inActiveStrokeColor={"#7B9CCF"}
                inActiveStrokeOpacity={0.2}
                progressValueStyle={{ fontWeight: "500" }}
              />
              <View>
                <Text
                  style={{ color: "black", fontSize: 19, fontWeight: "normal" }}
                >
                  {numCorrect} Correct
                </Text>
                <Text style={styles.blackTextStyle}>
                  {tableData.length - numCorrect} Incorrect
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#7B9CCF" }}>
                <Row
                  data={tableHeaders}
                  style={styles.head}
                  textStyle={styles.headText}
                />
              </Table>
            </View>
            <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#7B9CCF" }}>
                {tableData?.map((trial, colIndex) => (
                  <Row
                    key={colIndex}
                    data={[
                      trial.prompt,
                      trial.response,
                      trial.prompt === trial.response ? (
                        <Image
                          source={require("../../assets/images/correct_mark.png")}
                          style={styles.tableImage}
                        />
                      ) : (
                        <Image
                          source={require("../../assets/images/incorrect_mark.png")}
                          style={styles.tableImage}
                        />
                      ),
                    ]}
                    style={styles.data}
                    textStyle={styles.dataText}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: "#ffffff",
  },
  tableContainer: { flex: 1, marginTop: 25, backgroundColor: "#fff" },
  head: { height: 44, backgroundColor: "#7B9CCF" },
  data: { height: 44 },
  headText: {
    paddingHorizontal: 22,
    fontSize: 22,
    fontStyle: "normal",
    color: "white",
  },
  dataText: { fontSize: 16, paddingHorizontal: 22 },
  imageStyle: {
    width: 25,
    height: 25,
    marginTop: 20,
  },
  tableImage: {
    alignSelf: "center",
    width: 25,
    height: 25,
  },
  blackTextStyle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "normal",
  },
  grayTextStyle: {
    marginTop: 15,
    color: "gray",
    fontSize: 19,
    fontWeight: "normal",
  },
  buttonStyle: {
    width: 80,
    height: 40,
    padding: 8,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
});
