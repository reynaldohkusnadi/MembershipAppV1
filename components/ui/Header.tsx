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
                color={theme.colors.brand.gold} 
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
                color={theme.colors.brand.gold} 
              />
            </View>
          </View>
        )}
        
        <View style={styles.actions}>
          {showNotification && (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onNotificationPress}
            >
              <IconSymbol 
                name="bell" 
                size={24} 
                color={theme.colors.text.header} 
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          )}
          {showSearch && (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onSearchPress}
            >
              <IconSymbol 
                name="magnifyingglass" 
                size={24} 
                color={theme.colors.text.header} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.header.background,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
    minHeight: 60,
  },
  userSection: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as any,
    color: theme.colors.text.header,
    marginBottom: theme.spacing[1],
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.brand.gold,
    marginRight: theme.spacing[2],
  },
  tierBadge: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.brand.bronze,
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: 8,
    marginRight: theme.spacing[2],
    textTransform: 'uppercase',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '600' as any,
    color: theme.colors.text.header,
  },
  pointsOnlySection: {
    flex: 1,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.header,
    marginBottom: theme.spacing[1],
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700' as any,
    color: theme.colors.text.header,
    marginRight: theme.spacing[2],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: theme.spacing[2],
    marginLeft: theme.spacing[2],
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
}); 