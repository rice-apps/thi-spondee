import { StyleSheet, View, Text,Image} from 'react-native';

type ScreenProp = {
  title: string
  imageUri: string
};

export default function TabScreen({title, imageUri}: ScreenProp) {
  return (
    <View
      style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Image 
        source = {{uri: imageUri}}
        style = {styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontWeight:'bold',
    fontSize: 40
  },
  image: {
    borderRadius: 50
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
