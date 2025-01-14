import { Image, StyleSheet, TouchableOpacity } from "react-native";

type CardProps = { text: string };

export default function Card({ text }: CardProps) {
  // const [text,setText] = useState(text);

  // const handlePress = (message)=>{
  //     setText(message);
  //

  return (
    //add onPress
    <TouchableOpacity style={styles.item}>
      <Image
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        source={require("../../assets/images/apple.png")}
      ></Image>
      {/* <THIText style={styles.name}>{text}</THIText> */}
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
