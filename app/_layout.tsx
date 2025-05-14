import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {requestLocationPermission} from '@/util/requestLocationPermission';
import {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const initLocationService = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('위치 권한이 필요합니다.');
      }
    };

    initLocationService();
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
