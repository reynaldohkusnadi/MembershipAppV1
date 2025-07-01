import { Header } from '@/components/ui/Header';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock data for development
const mockRewards = [
  {
    id: '1',
    title: 'GARIBALDI',
    brand: 'ROMA',
    pointsCost: 550,
    imageUrl: 'https://picsum.photos/160/120?random=1',
  },
  {
    id: '2',
    title: 'MARGHERITA PIZZA',
    brand: 'CAFFÈ MILANO',
    pointsCost: 525,
    imageUrl: 'https://picsum.photos/160/120?random=2',
  },
  {
    id: '3',
    title: 'NUTELLA & BANANA PO...',
    brand: 'LOEWY',
    pointsCost: 325,
    imageUrl: 'https://picsum.photos/160/120?random=3',
  },
];

const mockOutlets = [
  {
    id: '1',
    name: 'Union Restaurant',
    imageUrl: 'https://picsum.photos/200/120?random=4',
  },
  {
    id: '2', 
    name: 'Roma Bistro',
    imageUrl: 'https://picsum.photos/200/120?random=5',
  },
];

export default function HomeScreen() {
  const { profile } = useAuthStore();

  return (
    <View style={styles.container}>
      <Header
        userName="REYNALDO KUSNADI"
        points={500}
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
              AUTOMATIC UPGRADE TO{'\n'}BLACK TIER MEMBERSHIP &{'\n'}5,000 BONUS POINTS
            </Text>
            <Text style={styles.bannerSubtitle}>
              FOR PLATINUM CARD® BCA MEMBERS{'\n'}until 31 December 2025
            </Text>
          </View>
        </View>

        {/* Featured Rewards Section */}
        <SectionHeader 
          title="FEATURED REWARDS" 
          showSeeAll={true}
          onSeeAllPress={() => console.log('See all rewards')}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rewardsContainer}
        >
          {mockRewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <Image
                source={{ uri: reward.imageUrl }}
                style={styles.rewardImage}
                resizeMode="cover"
              />
              <View style={styles.rewardContent}>
                <Text style={styles.rewardBrand}>{reward.brand}</Text>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardPoints}>{reward.pointsCost} U+Points</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Outlets Section */}
        <SectionHeader 
          title="OUTLETS NEAREST TO YOU" 
          showSeeAll={true}
          onSeeAllPress={() => console.log('See all outlets')}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.outletsContainer}
        >
          {mockOutlets.map((outlet) => (
            <View key={outlet.id} style={styles.outletCard}>
              <Image
                source={{ uri: outlet.imageUrl }}
                style={styles.outletImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
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
  rewardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 4,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  rewardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rewardContent: {
    padding: 12,
  },
  rewardBrand: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  rewardPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
  },
  outletsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  outletCard: {
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  outletImage: {
    width: 200,
    height: 120,
  },
});
