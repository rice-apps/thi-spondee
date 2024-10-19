import { View,  StyleSheet} from 'react-native';
import TabScreen from './explore'

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <TabScreen title = 'Arnan Bawa' imageUri = '../../assets/images/arnan.png'></TabScreen>
      {/* <TabScreen title = 'Arnan Bawa' imageUri=""></TabScreen> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
