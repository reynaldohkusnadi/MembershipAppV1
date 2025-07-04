import { theme } from '@/constants/Theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RewardCardProps {
  id: string;
  title: string;
  brand: string;
  pointsCost: number;
  imageUrl: string;
  onPress: () => void;
}

export function RewardCard({
  title,
  brand,
  pointsCost,
  imageUrl,
  onPress,
}: RewardCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
                  <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.points}>{pointsCost} Ark Points</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,              // Surface #FFFFFF from design.json
    borderRadius: theme.radius.medium,                  // radius_medium 12px from design.json
    width: '100%',                                      // Fill container width instead of fixed width
    height: theme.components.card.height,               // 200px horizontal_card_carousel.card_height from design.json
    ...theme.shadows.card,                               // Elevation 2 from design.json
  },
  image: {
    width: '100%',
    height: 110,                                        // Reduced from 120px to give more space for text
    borderTopLeftRadius: theme.radius.medium,           // radius_medium 12px from design.json
    borderTopRightRadius: theme.radius.medium,          // radius_medium 12px from design.json
  },
  content: {
    padding: theme.spacing[3],                           // Reduced from 16px to 12px to give more text space
    flex: 1,                                            // Allow content to fill remaining space
    justifyContent: 'space-between',                     // Distribute space evenly
  },
  brand: {
    fontSize: theme.typography.fontSize.xs,             // Reduced from caption (13px) to xs (12px)
    fontWeight: theme.typography.fontWeight.normal,     // 400 weight from design.json
    lineHeight: 16,                                     // Tighter line height for small text
    letterSpacing: theme.typography.letterSpacing.caption, // 0.1px letter spacing from design.json
    color: theme.colors.textSecondary,                  // Text secondary #7A7A7A
    fontFamily: theme.typography.fontFamily.primary,    // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                      // 4px spacing
  },
  title: {
    fontSize: theme.typography.fontSize.sm,             // Reduced from body (16px) to sm (14px)
    fontWeight: theme.typography.fontWeight.semibold,   // 600 weight for emphasis
    lineHeight: 18,                                     // Tighter line height for better fit
    color: theme.colors.textPrimary,                    // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,    // SF Pro Display from design.json
    marginBottom: theme.spacing[2],                      // 8px spacing
    flex: 1,                                            // Allow title to expand as needed
  },
  points: {
    fontSize: theme.typography.fontSize.caption,        // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.semibold,   // 600 weight for emphasis
    lineHeight: theme.typography.lineHeight.caption,    // 18px line height from design.json
    letterSpacing: theme.typography.letterSpacing.caption, // 0.1px letter spacing from design.json
    color: theme.colors.primary,                        // Primary #957530 for points
    fontFamily: theme.typography.fontFamily.primary,    // SF Pro Display from design.json
  },
}); 