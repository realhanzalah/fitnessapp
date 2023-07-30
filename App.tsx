import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

type ValueProps = {
  label: string;
  value: string;
}
const Value = ({ label, value }: ValueProps) => (
  <View>  
         <Text style={styles.label} >{label}</Text>
         <Text style={styles.value}>{value}</Text>
        </View>
);

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

    label: {
      color: 'white',
      fontSize: 20,
    },
    value: {
      fontSize: 35,
      color: '#AFB3BE',
      fontWeight: '500',
    }
});
