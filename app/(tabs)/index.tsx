import { Header } from '@/components/ui/Header';
import { RewardCard } from '@/components/ui/RewardCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { theme } from '@/constants/Theme';
import { useOutlets, useRewards } from '@/hooks/useData';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile, user } = useAuthStore();
  const router = useRouter();
  
  // Fetch real data
  const { data: rewards, isLoading: rewardsLoading } = useRewards();
  const { data: outlets, isLoading: outletsLoading } = useOutlets();
  
  // Get featured rewards (first 3)
  const featuredRewards = rewards?.slice(0, 3) || [];
  
  // Get nearest outlets (first 2 for now - later we'll add location-based filtering)
  const nearestOutlets = outlets?.slice(0, 2) || [];

  const handleRewardPress = (rewardId: string) => {
    // Navigate to reward detail (placeholder for now)
    console.log('Navigate to reward:', rewardId);
  };

  const handleSeeAllRewards = () => {
    router.push('/rewards');
  };

  const handleSeeAllOutlets = () => {
    // router.push('/restaurants'); // Route not available yet
    console.log('Navigate to outlets');
  };

  const handleUserProfilePress = () => {
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <Header
        showUser={true}
        showNotification={true}
        onNotificationPress={() => console.log('Notification pressed')}
        onUserPress={handleUserProfilePress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
        <Image
            source={{ uri: 'https://picsum.photos/400/200?random=banner' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>
              WELCOME TO ARTISAN{'\n'}MEMBERSHIP PROGRAM
            </Text>
            <Text style={styles.bannerSubtitle}>
              Earn points with every purchase and{'\n'}unlock exclusive rewards
            </Text>
          </View>
        </View>

        {/* Featured Rewards Section */}
        <SectionHeader 
          title="FEATURED REWARDS" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllRewards}
        />
        
        {rewardsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rewardsContainer}
          >
            {featuredRewards.map((reward) => (
              <View key={reward.id} style={styles.rewardCardWrapper}>
                <RewardCard
                  id={reward.id.toString()}
                  title={reward.title}
                  brand="Artisan"
                  pointsCost={reward.cost}
                  imageUrl={reward.image_url || `https://picsum.photos/160/120?random=${reward.id}`}
                  onPress={() => handleRewardPress(reward.id.toString())}
                />
              </View>
            ))}
          </ScrollView>
        )}

        {/* Outlets Section */}
        <SectionHeader 
          title="OUTLETS NEAREST TO YOU" 
          showSeeAll={true}
          onSeeAllPress={handleSeeAllOutlets}
        />
        
        {outletsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.outletsContainer}
          >
            {nearestOutlets.map((outlet) => (
              <TouchableOpacity 
                key={outlet.id} 
                style={styles.outletCard}
                onPress={() => console.log('Navigate to outlet:', outlet.id)}
              >
                <Image
                  source={{ 
                    uri: `https://picsum.photos/200/120?random=${outlet.id + 100}` 
                  }}
                  style={styles.outletImage}
                  resizeMode="cover"
                />
                <View style={styles.outletOverlay}>
                  <Text style={styles.outletName}>{outlet.name}</Text>
                  <Text style={styles.outletAddress}>
                    {outlet.address ? outlet.address.split(',')[0] : 'Location available'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>QUICK ACTIONS</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📱</Text>
              <Text style={styles.actionText}>Scan & Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSeeAllRewards}
            >
              <Text style={styles.actionIcon}>🎁</Text>
              <Text style={styles.actionText}>Redeem</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSeeAllOutlets}
            >
              <Text style={styles.actionIcon}>🍽️</Text>
              <Text style={styles.actionText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundShades.primary,  // Background #F0F0EC from design.json
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    margin: theme.grid.margin,                               // 16px margin from design.json
    borderRadius: theme.radius.medium,                       // radius_medium 12px from design.json
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(45, 45, 45, 0.6)',               // Dark overlay using header background
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],                               // 16px padding from design.json
  },
  bannerTitle: {
    fontSize: theme.typography.fontSize.headline,           // 24px headline from design.json
    fontWeight: theme.typography.fontWeight.bold,           // 700 weight from design.json
    lineHeight: theme.typography.lineHeight.headline,       // 32px line height from design.json
    letterSpacing: theme.typography.letterSpacing.normal,   // Normal letter spacing from design.json
    color: theme.colors.surface,                            // White text on dark overlay
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
    textAlign: 'center',
    textTransform: 'uppercase',                             // Uppercase from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
  },
  bannerSubtitle: {
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontWeight: theme.typography.fontWeight.normal,         // 400 weight from design.json
    lineHeight: theme.typography.lineHeight.body,           // 24px line height from design.json
    color: theme.colors.surface,                            // White text
    fontFamily: theme.typography.fontFamily.primary,        // Inter from design.json
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    padding: theme.spacing[4],                               // 16px padding
    alignItems: 'center',
  },
  rewardsContainer: {
    paddingHorizontal: theme.grid.margin,                   // 16px margin from design.json
    paddingBottom: theme.spacing.withinSection,             // 16px within section spacing
  },
  outletsContainer: {
    paddingHorizontal: theme.grid.margin,                   // 16px margin from design.json
    paddingBottom: theme.spacing.betweenSections,           // 32px between sections spacing
  },
  outletCard: {
    backgroundColor: theme.colors.surface,                  // Surface #FFFFFF from design.json
    borderRadius: theme.radius.medium,                      // radius_medium 12px from design.json
    marginRight: theme.spacing[4],                          // 16px spacing
    width: 200,
    overflow: 'hidden',
    ...theme.shadows.card,                                  // Elevation 2 from design.json
  },
  outletImage: {
    width: '100%',
    height: 120,
  },
  outletOverlay: {
    padding: theme.spacing[4],                              // 16px padding from design.json
  },
  outletName: {
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontWeight: theme.typography.fontWeight.semibold,       // 600 weight for emphasis
    lineHeight: theme.typography.lineHeight.body,           // 24px line height from design.json
    color: theme.colors.textPrimary,                        // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,        // Inter from design.json
    marginBottom: theme.spacing[1],                          // 4px spacing
  },
  outletAddress: {
    fontSize: theme.typography.fontSize.caption,            // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.normal,         // 400 weight from design.json
    lineHeight: theme.typography.lineHeight.caption,        // 20px line height from design.json
    color: theme.colors.textSecondary,                      // Text secondary #7A7A7A
    fontFamily: theme.typography.fontFamily.primary,        // Inter from design.json
  },
  quickActionsContainer: {
    backgroundColor: theme.colors.surface,                  // Surface #FFFFFF from design.json
    margin: theme.grid.margin,                              // 16px margin from design.json
    borderRadius: theme.radius.medium,                      // radius_medium 12px from design.json
    padding: theme.spacing[4],                              // 16px padding from design.json
    ...theme.shadows.card,                                  // Elevation 2 from design.json
  },
  quickActionsTitle: {
    fontSize: theme.typography.fontSize.title,              // 20px title from design.json
    fontWeight: theme.typography.fontWeight.semibold,       // 600 weight from design.json
    lineHeight: theme.typography.lineHeight.title,          // 28px line height from design.json
    color: theme.colors.textPrimary,                        // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
    textTransform: 'uppercase',                             // Uppercase from design.json
    marginBottom: theme.spacing.withinSection,              // 16px within section spacing
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: theme.colors.backgroundShades.secondary, // Light gray background
    borderRadius: theme.radius.large,                       // radius_large 24px from design.json
    padding: theme.spacing[4],                              // 16px padding
    alignItems: 'center',
    flex: 1,
    marginHorizontal: theme.spacing[1],                     // 4px margin between buttons
    minHeight: theme.components.button.height.base,         // 44px min tap target from design.json
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: theme.spacing[1],                         // 4px spacing
  },
  actionText: {
    fontSize: theme.typography.fontSize.caption,            // 14px caption from design.json
    fontWeight: theme.typography.fontWeight.semibold,       // 600 weight for emphasis
    lineHeight: theme.typography.lineHeight.caption,        // 20px line height from design.json
    color: theme.colors.textPrimary,                        // Text primary #2D2D2D
    fontFamily: theme.typography.fontFamily.primary,        // Inter from design.json
    textAlign: 'center',
  },
  rewardCardWrapper: {
    marginRight: theme.spacing[4],                          // 16px spacing
    width: 160,                                             // Fixed width for horizontal scroll
  },
});
