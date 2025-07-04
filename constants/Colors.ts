/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Design system colors based on design.json specifications
 * Artisan Membership App - Premium loyalty app color palette
 */

const primaryColor = '#957530';
const primaryVariant = '#BFA770';
const inactiveColor = '#7A7A7A';

export const Colors = {
  light: {
    text: '#2D2D2D',
    background: '#F0F0EC',
    surface: '#FFFFFF',
    tint: primaryColor,
    icon: inactiveColor,
    tabIconDefault: inactiveColor,
    tabIconSelected: primaryColor,
    primary: primaryColor,
    primaryVariant: primaryVariant,
    secondary: '#7A7A7A',
    error: '#FF3B30',
    border: '#E0E0E0',
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D2D2D',
    surface: '#1F1F1F',
    tint: primaryVariant,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryVariant,
    primary: primaryVariant,
    primaryVariant: primaryColor,
    secondary: '#A0A0A0',
    error: '#FF5757',
    border: '#404040',
  },
};
