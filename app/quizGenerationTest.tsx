import { THIText } from "@/components/THIText";
import { generateQuiz } from "@/lib/quizGeneration";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// just a sample use to test the generateQuiz functionality
const quizGenerationTest = () => {
  const [inputSeed, setInputSeed] = useState("");
  return (
    <View style={{ margin: 20 }}>
      <TextInput
        onChangeText={setInputSeed}
        value={inputSeed}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => {
          generateQuiz(4, inputSeed);
        }}
      >
        <THIText>Generate Quiz</THIText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default quizGenerationTest;
