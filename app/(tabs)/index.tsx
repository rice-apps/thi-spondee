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


import { Button, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";
import Card from "../../components/Card";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Constants from "expo-constants";
import {useState} from "react";
import Feather from '@expo/vector-icons/Feather';


let DATA: any[] = [];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.name}>{title}</Text>
  </View>
);

export default function Index({numCards, totalPages}: {numCards: number, totalPages: number}) {

  const [pageNum, setPageNum] = useState(1);

  numCards = 8; //DATA.size();
  totalPages = 20;
  let progressString: string = pageNum/totalPages*100+"%";

  for(let i=0; i<numCards; i++){
    DATA.push({
      id: (""+i),
      title: ("Item "+i),
    });
  }

  return (
      <View style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Spondee Cards</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>End Session</Text>
          </TouchableOpacity>
          <Feather name="settings" size={24} color="black" style={{flex: 1}}/>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressCenter}>
            <Text style={styles.progressText}>{pageNum}/{totalPages}</Text>
            <View style={styles.progressBar}>
              <View style={{width: progressString, height: "100%", backgroundColor: "black", borderRadius: 10,}}></View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <FlatList contentContainerStyle={styles.flatlist}
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id+1}
            numColumns={(Math.min(Math.trunc((numCards+1)/2),4))}
            horizontal={false}
          />
        </View>
      </View>
  );
}

let gray = "#e6e6e6";

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
    backgroundColor: gray,
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
  name: {
    fontSize: 32,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 2*Constants.statusBarHeight,
    // backgroundColor: "green",
  },
  progressCenter: {
    flexDirection: "row", //column direction
    justifyContent: 'space-evenly',
    gap: 30,
    alignItems: 'center',
    // paddingTop: 2*Constants.statusBarHeight,
    // backgroundColor: "green",
  },
  progressBar: {
    height: 15,
    width: '60%',
    backgroundColor: gray,
    // borderWidth: 0.5,
    borderRadius: 10,
  },
  progressText: {
    color:"black",
    paddingBottom: 5,
    fontSize: 30,
    height:"auto",
  },
  page: {
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: gray,
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: 25,
  }
});
