import React from 'react';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Dimensions, Image} from 'react-native';


const data = [
  {key: 1, value: require('../../assets/images/shoeIcon.png')},
  {key: 2, value: require('../../assets/images/bootIcon.png')},
  {key: 3, value: require('../../assets/images/schoolIcon.png')},
  {key: 4, value: require('../../assets/images/broomIcon.png')},
  {key: 5, value: require('../../assets/images/moonIcon.png')},
  {key: 6, value: require('../../assets/images/spoonIcon.png')}
]

const {height, width} = Dimensions.get('window')
const App = () => {
  return (
    <View> 
      <FlatList data = {data} 
        numColumns = {3}
        renderItem = {({item}) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.cards}>
            <Image source = {item.value} style={styles.imageStyle}/>
          </TouchableOpacity>
        </View>
      )}>
      </FlatList>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'white',
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cards: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.8,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box2: {
    flex: 0.3,
    backgroundColor: 'blue'
  },
  textStyle:{
    fontSize: 20,
    color: 'blue'
  },
  imageStyle:{
    width: 200,
    height:200,
  }
});

export default App;