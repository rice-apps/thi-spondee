import { TestTypeGroup } from "@/components/testing/TestTypeGroup";
import { TestType } from "@/components/testing/TestingTypeDef";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TestSelection() {
  const testTypes: TestType[] = [
    {
      title: "Speech Recognition",
      tests: [
        {
          title: "Spondee Cards",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/spondee",
        },
        {
          title: "LHM-10/Ling Card",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/lhm10",
        },
      ],
    },
    {
      title: "Word Recognition Testing",
      tests: [
        {
          title: "WIPI",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/wipi",
        },
        {
          title: "NU-CHIPS",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/nuchips",
        },
      ],
    },
    {
      title: "ESP Test",
      tests: [
        {
          title: "Syllable Differentiation",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/esp",
        },
        {
          title: "Minimal Pairs",
          uri: "https://placehold.co/215x115.png",
          route: "/tests/minpairs",
        },
      ],
    },
  ];

  return (
    // TODO: change from scroll view, but we
    <ScrollView style={styles.container}>
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
    </ScrollView>
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
    // marginRight: 30,
  },
});
