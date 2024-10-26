import { StyleSheet, Pressable, Text, View } from "react-native";

type Test = {
  title: string;
};

type TestType = {
  title: string;
  tests: Test[];
};

export default function TestSelection() {
  const tests = [
    {
      title: "Speech Therapy",
      testTypes: [
        {
          title: "ESP Test",
          tests: [
            { title: "Syllable Differentiation" },
            { title: "Spondee Cards" },
            { title: "Minimal Pairs" },
          ],
        },
        {
          title: "LHM-10/Ling Card",
          tests: [{ title: "Placeholder" }],
        },
      ],
    },
    {
      title: "Audiology",
      testTypes: [
        {
          title: "Speech Recognition Testing",
          tests: [{ title: "Spondee Cards" }],
        },
        {
          title: "Word Recognition Testing",
          tests: [{ title: "WIPI" }, { title: "NU-CHIPS" }],
        },
        {
          title: "LHM-10/Ling Card",
          tests: [{ title: "Placeholder" }],
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {tests.map((testCategory) => (
        <View style={styles.testCategory}>
          <Text style={styles.testCategoryTitle}>{testCategory.title}</Text>
          <View style={styles.testTypeGroup}>
            {testCategory.testTypes.map((testType, i) => (
              <TestTypeSelection key={i} testType={testType} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function TestTypeSelection({ testType }: { testType: TestType }) {
  const { title, tests } = testType;
  return (
    <View style={styles.testType}>
      <Text style={styles.testType}>{title}</Text>
      <View style={styles.buttonGroup}>
        {tests.map((test: Test, i: number) => (
          <Pressable
            style={styles.button}
            key={i}
            onPress={() => console.log(test.title)}
          >
            <Text style={styles.buttonText}>{test.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  testCategoryTitle: {
    fontFamily: "inter",
    fontWeight: "semibold",
    fontSize: 30,
    marginTop: 15,
    marginLeft: 20,
  },
  testCategory: {
    marginBottom: 30,
  },
  testTypeGroup: {
    flexDirection: "row",
    alignContent: "center",
  },
  testType: {
    fontFamily: "inter",
    fontSize: 20,
    margin: 15,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    padding: 15,
    margin: 5,
    backgroundColor: "grey",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    alignContent: "center",
  },
});
