import { Header } from '@/components/ui/Header';
import { RewardCard } from '@/components/ui/RewardCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
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
    router.push('/restaurants');
  };

  return (
    <View style={styles.container}>
      <Header
        showUser={true}
        showNotification={true}
        onNotificationPress={() => console.log('Notification pressed')}
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
            <ActivityIndicator size="small" color="#D4AF37" />
          </View>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rewardsContainer}
          >
            {featuredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                id={reward.id.toString()}
                title={reward.title}
                brand="Artisan"
                pointsCost={reward.cost}
                imageUrl={reward.image_url || `https://picsum.photos/160/120?random=${reward.id}`}
                onPress={() => handleRewardPress(reward.id.toString())}
              />
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
            <ActivityIndicator size="small" color="#D4AF37" />
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    margin: 20,
    borderRadius: 12,
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  rewardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  outletsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  outletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 4,
    width: 200,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  outletImage: {
    width: '100%',
    height: '100%',
  },
  outletOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
  },
  outletName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  outletAddress: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  quickActionsContainer: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    marginTop: 10,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
});
