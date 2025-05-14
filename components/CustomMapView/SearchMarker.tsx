import {useStore} from '@/types/store';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SearchMarker = () => {
  const {location, setStartLocation, setEndLocation, setLocation} = useStore();

  const handleSetLocation = (type: 'start' | 'end') => {
    if (!location) return;
    if (type === 'start') {
      setStartLocation(location);
      console.log('출발지 설정:', location);
    } else {
      setEndLocation(location);
      console.log('목적지 설정:', location);
    }
    setLocation(null);
    console.log('위치 초기화');
  };

  return (
    <>
      {location ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={() => handleSetLocation('start')}>
            <Text style={styles.buttonText}>출발지 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.endButton]}
            onPress={() => handleSetLocation('end')}>
            <Text style={styles.buttonText}>목적지 설정</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};
export default SearchMarker;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    zIndex: 1000,
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#3498db',
  },
  endButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
