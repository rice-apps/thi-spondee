import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {THIText} from "@/components/THIText";
type CardProps = { text: string; correct: string };
import spondeeImageMap from "@/components/spondee/SpondeeImageMap";

export default function Card({ text, correct }: CardProps) {
  // const [text,setText] = useState(text);

  const handlePress = () => {
    if (correct === text) {
      console.log("correct");
    }
  };


  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <THIText>{text}</THIText>
      <Image
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        source={spondeeImageMap[text]}
      ></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    width: 350,
    height: 250,
    borderRadius: 10,
    borderColor: "#7B9CCF",
    borderStyle: "solid",
    borderWidth: 3,
    // width: "auto",
  },
  name: {
    fontSize: 32,
  },
});
