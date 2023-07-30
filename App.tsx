import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>

      <View style={styles.values}> 
        <Value label="Steps" value="1219"/>
        <Value label="Distance" value="0.75km" />
        <Value label="Flights Climbed" value="12" />
      </View>
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
    values: {
      flexDirection: 'row', 
      gap: 25,
      // rowGap: 50 can be used
      // columnGap: 25 can be used
      flexWrap: 'wrap',
    },
});
