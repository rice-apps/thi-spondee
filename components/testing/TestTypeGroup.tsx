import { TestSelectionCard } from "@/components/testing/TestSelectionCard";
import { Test, TestType } from "@/components/testing/TestingTypeDef";
import { StyleSheet, View } from "react-native";
import { THIText } from "../THIText";

export function TestTypeGroup({ testType }: { testType: TestType }) {
  const { title, tests } = testType;
  return (
    <View style={styles.testType}>
      <THIText style={styles.testTypeTitle}>{title}</THIText>
      <View style={styles.testCardGroup}>
        {tests.map((test: Test, i: number) => (
          <TestSelectionCard key={i} test={test} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  testType: {
    margin: 15,
  },
  testTypeTitle: {
    fontFamily: "inter",
    fontSize: 22,
    margin: 15,
  },
  testCardGroup: {
    flexDirection: "row",
    alignContent: "center",
  },
});
