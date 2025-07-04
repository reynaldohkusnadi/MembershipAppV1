import { theme } from '@/constants/Theme';
import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './IconSymbol';

interface HeaderProps {
  title?: string;
  showUser?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

export function Header({
  title,
  showUser = false,
  showNotification = false,
  showSearch = false,
  onNotificationPress,
  onSearchPress,
}: HeaderProps) {
  const { profile, user } = useAuthStore();
  
  // Use actual user data from auth store
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';
  const points = profile?.points || 0;
  const tierName = profile?.tier?.name || 'Bronze';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {showUser && user ? (
          <View style={styles.userSection}>
            <Text style={styles.userName}>{displayName.toUpperCase()}</Text>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{points} U+Points</Text>
              <Text style={styles.tierBadge}>{tierName}</Text>
              <IconSymbol 
                name="chevron.right" 
                size={16} 
                color={theme.colors.primary}
              />
            </View>
          </View>
        ) : title ? (
          <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : (
          <View style={styles.pointsOnlySection}>
            <Text style={styles.pointsLabel}>MY U+POINTS</Text>
            <View style={styles.pointsDisplay}>
              <Text style={styles.pointsValue}>{points}</Text>
              <IconSymbol 
                name="dollarsign.circle.fill" 
                size={20} 
                color={theme.colors.primary}
              />
            </View>
          </View>
        )}

        {(showNotification || showSearch) && (
          <View style={styles.actions}>
            {showSearch && (
              <TouchableOpacity onPress={onSearchPress}>
                <IconSymbol 
                  name="magnifyingglass" 
                  size={theme.components.tab.iconSize} 
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}
            {showNotification && (
              <TouchableOpacity onPress={onNotificationPress}>
                <IconSymbol 
                  name="bell" 
                  size={theme.components.tab.iconSize} 
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.header.background,      // Header background #2D2D2D from design.json
    minHeight: theme.components.header.height,            // 64px header height from design.json
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.components.header.paddingHorizontal, // 16px from design.json
    paddingVertical: theme.spacing[3],                    // 12px vertical padding
  },
  userSection: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSize.headingSm,       // 20px heading sm from design.json
    fontWeight: theme.typography.fontWeight.semibold,    // 600 weight from design.json
    lineHeight: theme.typography.lineHeight.headingSm,   // 28px line height from design.json
    color: theme.colors.header.text,                     // White header text
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    textTransform: 'uppercase',                          // Uppercase from design.json
    marginBottom: theme.spacing[1],                       // 4px spacing
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: theme.typography.fontSize.caption,         // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.normal,      // 400 weight from design.json
    lineHeight: theme.typography.lineHeight.caption,     // 20px line height from design.json
    color: theme.colors.header.text,                     // White header text
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    marginRight: theme.spacing[2],                        // 8px spacing
  },
  tierBadge: {
    fontSize: theme.typography.fontSize.caption,         // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.semibold,    // 600 weight for emphasis
    color: theme.colors.primary,                         // Primary #957530
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    marginRight: theme.spacing[1],                        // 4px spacing
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.headingMd,       // 24px heading md from design.json
    fontWeight: theme.typography.fontWeight.semibold,    // 600 weight from design.json
    lineHeight: theme.typography.lineHeight.headingMd,   // 32px line height from design.json
    letterSpacing: theme.typography.letterSpacing.headingMd, // 1px letter spacing from design.json
    color: theme.colors.header.text,                     // White header text
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    textTransform: 'uppercase',                          // Uppercase from design.json
  },
  pointsOnlySection: {
    flex: 1,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: theme.typography.fontSize.caption,         // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.normal,      // 400 weight from design.json
    color: theme.colors.header.text,                     // White header text
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    textTransform: 'uppercase',                          // Uppercase styling
    marginBottom: theme.spacing[1],                       // 4px spacing
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: theme.typography.fontSize.headingSm,       // 20px heading sm from design.json
    fontWeight: theme.typography.fontWeight.semibold,    // 600 weight from design.json
    lineHeight: theme.typography.lineHeight.headingSm,   // 28px line height from design.json
    color: theme.colors.primary,                         // Primary #957530
    fontFamily: theme.typography.fontFamily.primary,     // Inter from design.json
    marginRight: theme.spacing[1],                        // 4px spacing
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],                                // 16px spacing between actions
  },
}); 