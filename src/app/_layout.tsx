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
      } catch (e) {
        console.error('Error loading fonts:', e);
        // Still mark as loaded to prevent app from hanging
        setFontsLoaded(true);
      } finally {
        // Always hide splash screen, even if fonts fail to load
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          console.error('Error hiding splash screen:', error);
        }
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
