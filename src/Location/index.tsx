import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Locationn from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Locationn.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Locationn.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(region);

  return (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Text>{text}</Text>
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <MapView initialRegion={region} style={styles.map} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Location;
