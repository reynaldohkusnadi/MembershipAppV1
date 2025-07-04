import { theme } from '@/constants/Theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

export function SectionHeader({
  title,
  showSeeAll = false,
  onSeeAllPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>SEE ALL</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.grid.margin,          // 16px margin from design.json
    marginBottom: theme.spacing.withinSection,     // 16px within section spacing
  },
  title: {
    fontSize: theme.typography.fontSize.headingMd,      // 24px from design.json
    fontWeight: theme.typography.fontWeight.semibold,   // 600 from design.json
    lineHeight: theme.typography.lineHeight.headingMd,  // 32px from design.json
    letterSpacing: theme.typography.letterSpacing.headingMd, // 1px from design.json
    textTransform: 'uppercase',                         // Uppercase from design.json
    color: theme.colors.textPrimary,                    // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,    // Inter from design.json
  },
  seeAll: {
    fontSize: theme.typography.fontSize.caption,        // 14px caption size
    fontWeight: theme.typography.fontWeight.semibold,   // 600 weight
    color: theme.colors.primary,                        // Primary #957530
    textTransform: 'uppercase',                         // Uppercase styling
    fontFamily: theme.typography.fontFamily.primary,    // Inter from design.json
  },
}); 