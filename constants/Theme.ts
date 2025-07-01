import { Colors } from './Colors';

// Premium loyalty app color palette based on screenshots
export const theme = {
  colors: {
    // Base colors
    white: '#FFFFFF',
    black: '#000000',
    
    // Grayscale
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Brand colors (golden/bronze theme)
    brand: {
      gold: '#D4AF37',        // Primary golden color
      lightGold: '#F4E4BC',   // Light golden background
      darkGold: '#B8941F',    // Darker golden accent
      bronze: '#CD7F32',      // Bronze accent
    },
    
    // Header colors (dark theme)
    header: {
      background: '#2B2B2B',  // Dark header background
      text: '#FFFFFF',        // White text on dark header
      accent: '#D4AF37',      // Golden accents
    },
    
    // Semantic colors
    primary: '#D4AF37',       // Golden primary
    secondary: '#2B2B2B',     // Dark secondary
    accent: '#CD7F32',        // Bronze accent
    
    // Status colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Background variations
    background: {
      primary: '#FFFFFF',     // Main white background
      secondary: '#F9FAFB',   // Light gray background
      card: '#FFFFFF',        // Card background
      header: '#2B2B2B',      // Dark header
      section: '#F8F9FA',     // Section backgrounds
    },
    
    // Text colors
    text: {
      primary: '#111827',     // Main text
      secondary: '#6B7280',   // Secondary text
      tertiary: '#9CA3AF',    // Tertiary text
      inverse: '#FFFFFF',     // White text (on dark backgrounds)
      header: '#FFFFFF',      // Header text
      accent: '#D4AF37',      // Golden accent text
      muted: '#8B8B8B',       // Muted text
    },
    
    // Border colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF',
      card: '#F0F0F0',
    },
    
    // Points and tier colors
    points: {
      text: '#D4AF37',        // Golden points color
      background: '#F4E4BC',  // Light golden background
    },
    
    // Tab navigation
    tab: {
      active: '#D4AF37',      // Golden active state
      inactive: '#9CA3AF',    // Gray inactive state
      background: '#FFFFFF',  // White tab background
    },
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      regular: 'System',      // Using system font for now
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
      '5xl': 36,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      base: 24,
      lg: 28,
      xl: 32,
      '2xl': 32,
      '3xl': 36,
      '4xl': 40,
      '5xl': 44,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing scale
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  
  // Border radius
  radius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  // Shadows (for cards and elevation)
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
  },
  
  // Component sizes
  components: {
    header: {
      height: 100,
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    card: {
      borderRadius: 12,
      padding: 16,
      margin: 8,
    },
    button: {
      height: {
        sm: 32,
        base: 44,
        lg: 52,
      },
      borderRadius: 8,
    },
    tab: {
      height: 60,
      iconSize: 24,
    },
  },
} as const;

// Type definitions
export type Theme = typeof theme;
export type ThemeColors = Theme['colors'];

// Helper functions
export const getPointsDisplayColor = () => theme.colors.points.text;
export const getHeaderStyle = () => ({
  backgroundColor: theme.colors.header.background,
  paddingTop: theme.components.header.paddingTop,
  paddingHorizontal: theme.components.header.paddingHorizontal,
  height: theme.components.header.height,
});

export const getCardStyle = () => ({
  backgroundColor: theme.colors.background.card,
  borderRadius: theme.components.card.borderRadius,
  padding: theme.components.card.padding,
  ...theme.shadows.card,
});

// Re-export original Colors for backward compatibility
export { Colors };
