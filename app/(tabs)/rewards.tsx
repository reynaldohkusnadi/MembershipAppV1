import { RedemptionModal } from '@/components/RedemptionModal';
import { Header } from '@/components/ui/Header';
import { RewardCard } from '@/components/ui/RewardCard';
import { useRewards, useRewardsByCategory } from '@/hooks/useData';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type TabType = 'browse' | 'vouchers';
type CategoryType = 'all' | 'discounts' | 'freebies' | 'experiences';

export default function RewardsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('browse');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isRedemptionModalVisible, setIsRedemptionModalVisible] = useState(false);
  
  // Fetch rewards data
  const { data: allRewards, isLoading: allRewardsLoading } = useRewards();
  const { data: categoryRewards, isLoading: categoryRewardsLoading } = useRewardsByCategory(
    selectedCategory === 'all' ? '' : selectedCategory
  );
  
  // Determine which data to show
  const rewardsToShow = selectedCategory === 'all' ? allRewards : categoryRewards;
  const isLoading = selectedCategory === 'all' ? allRewardsLoading : categoryRewardsLoading;

  const handleRewardPress = (rewardId: string) => {
    const reward = rewardsToShow?.find(r => r.id.toString() === rewardId);
    if (reward) {
      setSelectedReward({
        id: reward.id.toString(),
        title: reward.title,
        description: reward.description,
        cost: reward.cost,
        image_url: reward.image_url,
      });
      setIsRedemptionModalVisible(true);
    }
  };

  const handleCloseRedemptionModal = () => {
    setIsRedemptionModalVisible(false);
    setSelectedReward(null);
  };

  const categories = [
    { key: 'all' as CategoryType, label: 'All Categories' },
    { key: 'discounts' as CategoryType, label: 'Discounts' },
    { key: 'freebies' as CategoryType, label: 'Freebies' },
    { key: 'experiences' as CategoryType, label: 'Experiences' },
  ];

  const renderReward = ({ item }: { item: any }) => (
    <View style={styles.rewardWrapper}>
      <RewardCard
        id={item.id.toString()}
        title={item.title}
        brand={item.reward_categories?.label || 'Artisan'}
        pointsCost={item.cost}
        imageUrl={item.image_url || `https://picsum.photos/160/120?random=${item.id}`}
        onPress={() => handleRewardPress(item.id.toString())}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        showSearch={true}
        onSearchPress={() => console.log('Search pressed')}
      />
      
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'browse' && styles.activeTab]}
          onPress={() => setActiveTab('browse')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'browse' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            BROWSE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'vouchers' && styles.activeTab]}
          onPress={() => setActiveTab('vouchers')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'vouchers' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            MY VOUCHERS
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'browse' ? (
        <>
          {/* Filter Row */}
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.filterButton,
                    selectedCategory === category.key && styles.activeFilterButton
                  ]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  <Text style={[
                    styles.filterText,
                    selectedCategory === category.key && styles.activeFilterText
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Rewards Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'ALL REWARDS' : categories.find(c => c.key === selectedCategory)?.label.toUpperCase()}
            </Text>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#D4AF37" />
                <Text style={styles.loadingText}>Loading rewards...</Text>
              </View>
            ) : rewardsToShow && rewardsToShow.length > 0 ? (
              <FlatList
                data={rewardsToShow}
                renderItem={renderReward}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.rewardsGrid}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No rewards available</Text>
                <Text style={styles.emptySubtext}>
                  Check back later for new rewards
                </Text>
              </View>
            )}
          </View>
        </>
      ) : (
        /* My Vouchers Tab */
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>MY VOUCHERS</Text>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No vouchers yet</Text>
            <Text style={styles.emptySubtext}>
              Redeem rewards to see your vouchers here
            </Text>
          </View>
        </View>
      )}

      {/* Redemption Modal */}
      <RedemptionModal
        visible={isRedemptionModalVisible}
        reward={selectedReward}
        onClose={handleCloseRedemptionModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  tabText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#9CA3AF',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  filterText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
  rewardsGrid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rewardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
}); 