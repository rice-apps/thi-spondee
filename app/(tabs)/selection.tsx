import { THIText } from "@/components/THIText";
import { TestTypeGroup } from "@/components/testing/TestTypeGroup";
import { TestType } from "@/components/testing/TestingTypeDef";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TestSelection() {
  const testTypes: TestType[] = [
    {
      title: "Speech Recognition",
      tests: [
        {
          title: "Spondee Cards",
          img: require("../../assets/images/test-images/AH.png"),
          route: "/tests/spondee",
        },
        {
          title: "LHM-10/Ling Card",
          img: require("../../assets/images/test-images/MM.png"),
          route: "/tests/lhm10",
        },
      ],
    },
    {
      title: "Word Recognition Testing",
      tests: [
        {
          title: "WIPI",
          img: require("../../assets/images/test-images/SH.png"),
          route: "/tests/wipi",
        },
        {
          title: "NU-CHIPS",
          img: require("../../assets/images/test-images/SS.png"),
          route: "/tests/nuchips",
        },
      ],
    },
    {
      title: "ESP Test",
      tests: [
        {
          title: "Syllable Differentiation",
          img: require("../../assets/images/test-images/EE.png"),
          route: "/tests/esp",
        },
        {
          title: "Minimal Pairs",
          img: require("../../assets/images/test-images/OO.png"),
          route: "/tests/minpairs",
        },
      ],
    },
  ];

  return (
    // TODO: change from scroll view, but we
    <ScrollView style={styles.container}>
      <View style={styles.pageTitleWrapper}>
        <THIText style={styles.pageTitle}>Testing</THIText>
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
    fontWeight: 600,
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
