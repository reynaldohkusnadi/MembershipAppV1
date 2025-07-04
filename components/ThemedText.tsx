import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'displayLg' | 'headingMd' | 'headingSm' | 'body' | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'displayLg' ? styles.displayLg : undefined,
        type === 'headingMd' ? styles.headingMd : undefined,
        type === 'headingSm' ? styles.headingSm : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Legacy styles for backward compatibility
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Inter',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#957530',
    fontFamily: 'Inter',
  },
  
  // Design.json typography scale
  displayLg: {
    fontSize: 32,          // Display lg from design.json
    fontWeight: '700',     // Weight 700 from design.json
    lineHeight: 40,        // Line height 40 from design.json
    fontFamily: 'Inter',   // Font family Inter from design.json
  },
  headingMd: {
    fontSize: 24,          // Heading md from design.json
    fontWeight: '600',     // Weight 600 from design.json
    lineHeight: 32,        // Line height 32 from design.json
    letterSpacing: 1,      // Letter spacing 1 from design.json
    textTransform: 'uppercase', // Case uppercase from design.json
    fontFamily: 'Inter',   // Font family Inter from design.json
  },
  headingSm: {
    fontSize: 20,          // Heading sm from design.json
    fontWeight: '600',     // Weight 600 from design.json
    lineHeight: 28,        // Line height 28 from design.json
    textTransform: 'uppercase', // Case uppercase from design.json
    fontFamily: 'Inter',   // Font family Inter from design.json
  },
  body: {
    fontSize: 16,          // Body from design.json
    fontWeight: '400',     // Weight 400 from design.json
    lineHeight: 24,        // Line height 24 from design.json
    fontFamily: 'Inter',   // Font family Inter from design.json
  },
  caption: {
    fontSize: 14,          // Caption from design.json
    fontWeight: '400',     // Weight 400 from design.json
    lineHeight: 20,        // Line height 20 from design.json
    fontFamily: 'Inter',   // Font family Inter from design.json
  },
});
