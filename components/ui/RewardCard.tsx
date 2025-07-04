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
        <Text style={styles.points}>{pointsCost} U+Points</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,              // Surface #FFFFFF from design.json
    borderRadius: theme.radius.md,                      // Card radius 12px from design.json
    marginRight: theme.spacing[4],                       // 16px spacing
    width: 180,
    ...theme.shadows.card,                               // Elevation 2 from design.json
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: theme.radius.md,               // Card radius 12px
    borderTopRightRadius: theme.radius.md,              // Card radius 12px
  },
  content: {
    padding: theme.spacing[4],                           // 16px from design.json spacing scale
  },
  brand: {
    fontSize: theme.typography.fontSize.caption,        // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.normal,     // 400 weight from design.json
    lineHeight: theme.typography.lineHeight.caption,    // 20px line height from design.json
    color: theme.colors.textSecondary,                  // Text secondary #7A7A7A
    fontFamily: theme.typography.fontFamily.primary,    // Inter from design.json
    marginBottom: theme.spacing[1],                      // 4px spacing
  },
  title: {
    fontSize: theme.typography.fontSize.body,           // 16px body from design.json
    fontWeight: theme.typography.fontWeight.semibold,   // 600 weight for emphasis
    lineHeight: theme.typography.lineHeight.body,       // 24px line height from design.json
    color: theme.colors.textPrimary,                    // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,    // Inter from design.json
    marginBottom: theme.spacing[2],                      // 8px spacing
  },
  points: {
    fontSize: theme.typography.fontSize.caption,        // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.semibold,   // 600 weight for emphasis
    lineHeight: theme.typography.lineHeight.caption,    // 20px line height from design.json
    color: theme.colors.primary,                        // Primary #957530 for points
    fontFamily: theme.typography.fontFamily.primary,    // Inter from design.json
  },
}); 