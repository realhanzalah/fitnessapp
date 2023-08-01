import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import AppleHealthKit, {
   HealthInputOptions, 
   HealthKitPermissions,
   HealthUnit, 
  } from 'react-native-health';
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, 
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};
const STEPS_GOAL = 10_000;

export default function App() {

  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("Error getting permissions")
        return;
      }
      setHasPermission(true);
      // You have permissions to request data
    })
  }, []);

  useEffect(() => {
    if (!hasPermissions){
      return;
    }

    const options: HealthInputOptions = {
      date: new Date(2023, 7, 1).toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps"); 
        return;
      }
      console.log(results.value);
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps"), err; 
      }
      console.log(results.value);
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps"), err; 
      }
      setDistance(results.value);
    });

  }, [hasPermissions]);

  return (
    <View style={styles.container}>
    
      <RingProgress progress={ steps / STEPS_GOAL } />

      <View style={styles.values}> 
        <Value label="Steps" value={steps.toString()}/>
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
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
      marginTop: 100,
    },
});
