//@ts-nocheck
import { Text, View, StyleSheet } from "react-native";
import Card from "../../components/Card";

export default function testScreen({numCards}) {

  numCards = 4;

  let cards = [];

  for(let i=0; i<numCards; i++){
    cards.push(<Card key={i}></Card>)
  }


  return (
    <View style={styles.content}>
        {cards}
    </View>
  );
}


const styles = StyleSheet.create({
    content: {
      display:"flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:"space-evenly",
      alignItems:"center",
      backgroundColor:"green",
      height: "100%",
      width: "100%",
    }
});
