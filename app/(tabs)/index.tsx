import CustomMapView from '@/components/CustomMapView';
import SearchBar from '@/components/SearchBar';
import {PREDEFINED_LOCATIONS} from '@/constants/locations';
import {useStore} from '@/types/store';
import * as Location from 'expo-location';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export default function HomeScreen() {
  const [searchResult, setSearchResult] = useState<string>('');
  const {setLocation} = useStore();

  const geocodeExpoAddress = async (address: string) => {
    if (PREDEFINED_LOCATIONS[address]) {
      setLocation(PREDEFINED_LOCATIONS[address]);
      console.log(`사전 정의된 위치 '${address}' 사용`);
      return;
    }
    console.log('주소:', address);
    let location = await Location.geocodeAsync(address);
    console.log(location);
    const {latitude, longitude} = location[0];
    setLocation({latitude, longitude});
  };

  const handleSearch = (query: string) => {
    console.log('검색어:', query);
    setSearchResult(query);
    // geocodeAddress(query);
    geocodeExpoAddress(query);
  };
  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <CustomMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
