// import { Button, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";
// import { useState } from "react";

// import Card from "@/components/Card";
// import { SessionControls } from "@/components/spondee/SessionControls";
// import {ProgressBar} from "@/components/spondee/ProgressBar";

// let DATA: any[] = [];

// type ItemProps = { title: string };

// const Item = ({ title }: ItemProps) => (
//   <TouchableOpacity style={styles.item}>
//     <Text style={styles.name}>{title}</Text>
//   </TouchableOpacity>
// );

// export default function TestSceen({ numCards, totalPages }: { numCards: number, totalPages: number }) {

//   const [pageNum, setPageNum] = useState(1);

//   numCards = 6; 
//   totalPages = 20;

//   for (let i = 0; i < numCards; i++) {
//     DATA.push({
//       id: ("" + i),
//       title: ("Item " + i),
//     });
//   }

//   return (
//     <View style={styles.page}>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Spondee Cards</Text>
//         <SessionControls />
//       </View>
//       <ProgressBar numerator={pageNum} denominator={totalPages}/>
//       <View style={styles.container}>
//         <FlatList contentContainerStyle={styles.flatlist}
//           data={DATA}
//           renderItem={({ item }) => <Item title={item.title} />}
//           keyExtractor={item => item.id }
//           numColumns={(Math.min(Math.trunc((numCards + 1) / 2), 4))}
//           horizontal={false}
//         />
//       </View>
//     </View>
//   );
// }

// let grayColor = "#e6e6e6";

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center",
//     width: "100%",
//     height: "100%",
//   },
//   flatlist: {
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     alignContent: "center",
//     marginTop: "5%",
//   },
//   item: {
//     backgroundColor: grayColor,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 18,
//     width: 180,
//     aspectRatio: 1.1,
//     borderRadius: 15,
//     // width: "auto",
//   },
//   titleContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingTop: 10,
//     paddingHorizontal: 50,
//     gap: 20,
//   },
//   title: {
//     fontSize: 32,
//     flex: 8,
//   },
//   name: {
//     fontSize: 32,
//   },
//   page: {
//     backgroundColor: "#ffffff",
//     paddingTop: "3%",
//   },
//   button: {
//     backgroundColor: grayColor,
//     borderRadius: 5,
//     padding: 5,
//   },
//   buttonText: {
//     fontSize: 25,
//   }
// });
