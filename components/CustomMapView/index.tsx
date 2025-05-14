import {useStore} from '@/types/store';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, useColorScheme, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import SearchMarker from './SearchMarker';

const CustomMapView = () => {
  const {startLocation, endLocation, location} = useStore();
  const [region, setRegion] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const theme = useColorScheme();

  useEffect(() => {
    if (startLocation) {
      console.log('startLocation', startLocation);
      setRegion({
        latitude: startLocation.latitude,
        longitude: startLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [startLocation]);

  useEffect(() => {
    if (endLocation) {
      console.log('endLocation', endLocation);
      setRegion({
        latitude: endLocation.latitude,
        longitude: endLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [endLocation]);
  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  useEffect(() => {
    if (startLocation && endLocation) {
      setRegion({
        latitude: (startLocation.latitude + endLocation.latitude) / 2,
        longitude: (startLocation.longitude + endLocation.longitude) / 2,
        latitudeDelta:
          Math.abs(startLocation.latitude - endLocation.latitude) * 1.5,
        longitudeDelta:
          Math.abs(startLocation.longitude - endLocation.longitude) * 1.5,
      });
    }
  }, [startLocation, endLocation]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        userInterfaceStyle={theme === 'dark' ? 'dark' : 'light'}
        region={region}
        initialRegion={{
          latitude: 37.5665,
          longitude: 126.978,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="red"
          />
        )}
        {startLocation && (
          <Marker coordinate={startLocation} title="출발지" pinColor="green" />
        )}

        {endLocation && (
          <Marker coordinate={endLocation} title="목적지" pinColor="blue" />
        )}
      </MapView>
      {location && <SearchMarker />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default CustomMapView;
