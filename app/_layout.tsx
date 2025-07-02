import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
// import 'react-native-reanimated/lib/reanimated.js'; // Commented out for Expo Go compatibility

import { AuthWrapper } from '@/components/AuthWrapper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';

// 21st.dev Toolbar imports (web only)
import { ReactPlugin } from '@21st-extension/react';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import { Platform } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <AuthWrapper>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
          {/* 21st.dev Toolbar - only render on web platform in development */}
          {Platform.OS === 'web' && __DEV__ && (
            <TwentyFirstToolbar
              config={{
                plugins: [ReactPlugin]
              }}
            />
          )}
        </AuthWrapper>
      </AuthProvider>
    </QueryProvider>
  );
}
