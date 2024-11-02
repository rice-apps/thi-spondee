import { StyleSheet, Text, View } from "react-native";
import { TestTypeGroup } from "@/components/testing/TestTypeGroup";
import { TestType } from "@/components/testing/TestingTypeDef";

export default function TestSelection() {
  const testTypes: TestType[] = [
    {
      title: "Speech Recognition",
      tests: [
        {
          title: "Spondee Cards",
          uri: "https://placehold.co/215x115.png",
        },
        {
          title: "LHM-10/Ling Card",
          uri: "https://placehold.co/215x115.png",
        },
      ],
    },
    {
      title: "Word Recognition Testing",
      tests: [
        { title: "WIPI", uri: "https://placehold.co/215x115.png" },
        { title: "NU-CHIPS", uri: "https://placehold.co/215x115.png" },
      ],
    },
    {
      title: "ESP Test",
      tests: [
        {
          title: "Syllable Differentiation",
          uri: "https://placehold.co/215x115.png",
        },
        { title: "Minimal Pairs", uri: "https://placehold.co/215x115.png" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleWrapper}>
        <Text style={styles.pageTitle}>Testing</Text>
      </View>
      <View style={styles.testTypeGroupList}>
        {testTypes.map((test, i) => (
          <View key={i} style={styles.testTypeGroup}>
            <TestTypeGroup testType={test} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  pageTitleWrapper: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: "inter",
    fontSize: 28,
  },
  testTypeGroupList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  testTypeGroup: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginRight: 30,
  },
});
