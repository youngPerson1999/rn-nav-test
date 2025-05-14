import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return false;
  }
  console.log('Location permission granted');
  return true;
};
