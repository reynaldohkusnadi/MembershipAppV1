import { theme } from '@/constants/Theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RewardCardProps {
  id: string;
  title: string;
  brand: string;
  pointsCost: number;
  imageUrl: string;
  onPress?: () => void;
}

export function RewardCard({
  id,
  title,
  brand,
  pointsCost,
  imageUrl,
  onPress,
}: RewardCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.pointsCost}>
          {pointsCost} U+Points
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    marginHorizontal: theme.spacing[2],
    marginVertical: theme.spacing[1],
    width: 160,
    ...theme.shadows.card,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: theme.spacing[3],
  },
  brand: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing[1],
    textTransform: 'uppercase',
  },
  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
    lineHeight: 20,
  },
  pointsCost: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.brand.gold,
  },
}); 