import * as Font from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { ErrorBoundary } from '@/components/error-boundary';

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
    loadFonts().catch((error) => {
      console.error('Font loading failed:', error);
      // Ensure fonts are marked as loaded even if there's an error
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
