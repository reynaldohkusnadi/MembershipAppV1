import { Colors } from './Colors';

// Design system based on design.json specifications
export const theme = {
  colors: {
    // Base colors from design.json
    primary: '#957530',
    primaryVariant: '#BFA770',
    surface: '#FFFFFF',
    textPrimary: '#2D2D2D',
    textSecondary: '#7A7A7A',
    statusError: '#FF3B30',
    borderDefault: '#E0E0E0',
    
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
    
    // Brand colors (from design.json)
    brand: {
      gold: '#957530',        // Primary from design.json
      lightGold: '#BFA770',   // Primary variant from design.json
      darkGold: '#7A5A00',    // Darker variant
      bronze: '#8B6914',      // Bronze accent
    },
    
    // Header colors (from design.json navigation specs)
    header: {
      background: '#2D2D2D',  // Dark header background
      text: '#FFFFFF',        // White text on dark header
      accent: '#957530',      // Primary golden accents
    },
    
    // Secondary and accent colors
    secondary: '#2D2D2D',     // Dark secondary
    accent: '#BFA770',        // Primary variant accent
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Background variations (design.json specs)
    backgroundShades: {
      primary: '#F0F0EC',     // Background from design.json
      secondary: '#F9FAFB',   // Light gray background
      card: '#FFFFFF',        // Surface from design.json
      header: '#2D2D2D',      // Dark header
      section: '#F8F9FA',     // Section backgrounds
    },
    
    // Text colors (design.json specs)
    text: {
      primary: '#2D2D2D',     // Text primary from design.json
      secondary: '#7A7A7A',   // Text secondary from design.json
      tertiary: '#9CA3AF',    // Tertiary text
      inverse: '#FFFFFF',     // White text (on dark backgrounds)
      header: '#FFFFFF',      // Header text
      accent: '#957530',      // Primary accent text
      muted: '#8B8B8B',       // Muted text
    },
    
    // Border colors (design.json specs)
    border: {
      light: '#E0E0E0',       // Border from design.json
      medium: '#D1D5DB',
      dark: '#9CA3AF',
      card: '#F0F0F0',
    },
    
    // Points and tier colors
    points: {
      text: '#957530',        // Primary golden points color
      background: '#BFA770',  // Primary variant background
    },
    
    // Tab navigation (design.json specs)
    tab: {
      active: '#957530',      // Primary active state
      inactive: '#7A7A7A',    // Text secondary inactive state
      background: '#FFFFFF',  // Surface tab background
    },
  },
  
  // Typography scale (design.json specs)
  typography: {
    fontFamily: {
      primary: 'SF Pro Display',       // SF Pro Display from design.json
      secondary: 'SF Pro Display',     // SF Pro Display from design.json
      regular: 'SF Pro Display',
      medium: 'SF Pro Display',
      semibold: 'SF Pro Display',
      bold: 'SF Pro Display',
    },
    fontSize: {
      // Design.json typography scale (exact specs)
      caption: 13,            // Caption from design.json
      body: 16,               // Body from design.json
      title: 20,              // Title from design.json
      headline: 24,           // Headline from design.json
      displayLarge: 34,       // Display large from design.json
      
      // Additional sizes for compatibility
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
      // Design.json line heights (calculated from specs)
      caption: 18,            // Caption line height
      body: 24,               // Body line height
      title: 28,              // Title line height  
      headline: 32,           // Headline line height
      displayLarge: 40,       // Display large line height
      
      // Additional line heights
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
      normal: '400',          // Body weight from design.json
      medium: '500',
      semibold: '600',        // Heading weight from design.json
      bold: '700',            // Display weight from design.json
    },
    letterSpacing: {
      normal: 0,
      displayLarge: -0.5,     // Display large letter spacing from design.json
      caption: 0.1,           // Caption letter spacing from design.json
    },
  },
  
  // Spacing scale (design.json specs: [4, 8, 16, 24, 32])
  spacing: {
    0: 0,
    1: 4,                     // From design.json scale
    2: 8,                     // From design.json scale
    3: 12,
    4: 16,                    // From design.json scale
    5: 20,
    6: 24,                    // From design.json scale
    8: 32,                    // From design.json scale
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    // Design.json layout spacing
    withinSection: 16,        // Within section spacing
    betweenSections: 32,      // Between sections spacing
  },
  
  // Border radius (design.json specs)
  radius: {
    none: 0,
    small: 8,                 // radius_small from design.json
    medium: 12,               // radius_medium from design.json
    large: 24,                // radius_large from design.json
    // Legacy compatibility
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    button: 24,
    full: 9999,
  },
  
  // Shadows with elevation 2 (design.json specs)
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
      elevation: 2,           // Elevation from design.json
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
      elevation: 2,           // Updated to design.json specs
    },
  },
  
  // Component sizes (design.json layout structure)
  components: {
    header: {
      height: 64,             // Top bar height from design.json
      paddingHorizontal: 16,  // Margin from design.json
      paddingTop: 44,         // Safe area consideration
    },
    card: {
      borderRadius: 12,       // radius_medium from design.json
      padding: 16,            // From design.json spacing scale
      margin: 8,              // Gutter from design.json
      width: 160,             // horizontal_card_carousel.card_width from design.json
      height: 200,            // horizontal_card_carousel.card_height from design.json
    },
    button: {
      height: {
        sm: 32,
        base: 44,             // Min tap target from design.json
        lg: 52,
      },
      borderRadius: 24,       // Button radius from design.json
    },
    tab: {
      height: 88,             // Bottom nav height from design.json
      iconSize: 24,           // iconography.size_default from design.json
      activeBadge: {
        diameter: 72,         // Active indicator diameter
      },
    },
    searchBar: {
      height: 48,             // search_bar_compact.height from design.json
      borderRadius: 24,       // search_bar_compact.shape radius_large from design.json
    },
  },
  
  // Iconography (design.json specs)
  iconography: {
    sizeDefault: 24,          // size_default from design.json
    sizeLarge: 32,            // size_large from design.json
    strokeWeight: 2,          // stroke_weight from design.json
    activeTint: '#957530',    // Primary color for active
    inactiveTint: '#7A7A7A',  // Text secondary for inactive
  },
  
  // Grid system (design.json layout)
  grid: {
    columns: 12,              // Columns from design.json
    gutter: 8,                // Gutter from design.json
    margin: 16,               // Margin from design.json
    baselineGrid: 4,          // Baseline grid from design.json
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
  backgroundColor: theme.colors.backgroundShades.card,
  borderRadius: theme.components.card.borderRadius,
  padding: theme.components.card.padding,
  ...theme.shadows.card,
});

// Re-export original Colors for backward compatibility
export { Colors };
 