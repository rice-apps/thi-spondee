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

//This is supposed to be in the page TestScreen, but I put it in the index page 
//so we don't have to go back and forth while testing

import { Button, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { useState } from "react";

import Card from "@/components/spondee/Card";
import { SessionControls } from "@/components/spondee/SessionControls";
import {ProgressBar} from "@/components/spondee/ProgressBar";

let data: {id: string, title: string}[] = [];

export default function Index({ numCards, totalPages }: { numCards: number, totalPages: number }) {

  const [pageNum, setPageNum] = useState(1);

  numCards = 6; 
  totalPages = 20;

  for (let i = 0; i < numCards; i++) {
    data.push({
      id: ("" + i),
      title: ("Item " + i),
    });
  }

  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spondee Cards</Text>
        <SessionControls />
      </View>
      <ProgressBar numerator={pageNum} denominator={totalPages}/>
      <View style={styles.container}>
        <FlatList contentContainerStyle={styles.flatlist}
          data={data}
          renderItem={({ item }) => <Card text={item.title} />}
          keyExtractor={item => item.id }
          numColumns={(Math.min(Math.trunc((numCards + 1) / 2), 4))}
          horizontal={false}
        />
      </View>
    </View>
  );
}

let grayColor = "#e6e6e6";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  flatlist: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    marginTop: "5%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 50,
    gap: 20,
  },
  title: {
    fontSize: 32,
    flex: 8,
  },
  page: {
    backgroundColor: "#ffffff",
    paddingTop: "3%",
  },
  button: {
    backgroundColor: grayColor,
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: 25,
  }
});
