// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View>
//       <Text style={{ color: "green" }}>
//         Hi this is our home page. Woohoo thi team.
//       </Text>
//     </View>
//   );
// }

//@ts-nocheck
import { Text, View, StyleSheet, FlatList } from "react-native";
import Card from "../../components/Card";

export default function Index({numCards}) {

  numCards = 6;

  let cards = [];

  for(let i=0; i<numCards; i++){
    cards.push(<Card></Card>)
  }

  return (
    <View></View>
    // <FlatList
    //   data={cards}
    //   renderItem={()=> return }
    // />
    // <View style={styles.content}>
    //     {cards}
    // </View>
  );
}


const styles = StyleSheet.create({
    content: {
      display:"flex",
      justifyContent:"space-evenly",
      alignItems:"center",
      alignContent:"center",
      flexDirection: "column",
      flexWrap: "wrap",
      height: "100%",
      width: "100%",
      paddingHorizontal:150,
    }
});


