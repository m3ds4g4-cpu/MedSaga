import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
          'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
