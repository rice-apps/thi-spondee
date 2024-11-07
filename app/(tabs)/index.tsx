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


import { Text, View, StyleSheet, FlatList, StatusBar } from "react-native";
import Card from "../../components/Card";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Constants from "expo-constants";


let DATA: any[] = [];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Index({numCards}: {numCards: number}) {

  numCards = 8; //DATA.size();

  for(let i=0; i<numCards; i++){
    DATA.push({
      id: (""+i),
      title: ("Item "+i),
    });
  }

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.progressContainer}>
          <Text style={styles.progressText}>hi</Text>
          <View style={styles.progressBar}></View>
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <FlatList contentContainerStyle={styles.flatlist}
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id+1}
            numColumns={(Math.min(Math.trunc((numCards+1)/2),4))}
            horizontal={false}
          />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}



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
  item: {
    backgroundColor: 'lightgray',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 18,
    width: 180,
    aspectRatio: 1.1,
    borderRadius: 15,
    // width: "auto",
  },
  title: {
    fontSize: 32,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "column", //column direction
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 3*Constants.statusBarHeight,
    // padding: 8,
    backgroundColor: "green",
    height: "20%",
  },
   progressBar: {
    height: 15,
    width: '60%',
    backgroundColor: 'lightgray',
    // borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 10
   },
   progressText: {
    color:"black",
    fontSize: 20,
    height:20,
    backgroundColor: "red",
   }
});
