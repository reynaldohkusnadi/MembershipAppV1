import { RedemptionModal } from '@/components/RedemptionModal';
import { Header } from '@/components/ui/Header';
import { RewardCard } from '@/components/ui/RewardCard';
import { theme } from '@/constants/Theme';
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
                <ActivityIndicator size="large" color={theme.colors.primary} />
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
    backgroundColor: theme.colors.backgroundShades.primary,  // Background #F0F0EC from design.json
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.header.background,          // Header background #2D2D2D from design.json
    paddingHorizontal: theme.spacing[5],                     // 20px spacing
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing[4],                       // 16px spacing
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,                 // Primary #957530 from design.json
  },
  tabText: {
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
  },
  activeTabText: {
    color: theme.colors.surface,                            // White text from design.json
  },
  inactiveTabText: {
    color: theme.colors.textSecondary,                      // Text secondary from design.json
  },
  filterContainer: {
    paddingHorizontal: theme.spacing[5],                     // 20px spacing
    paddingVertical: theme.spacing[4],                       // 16px spacing
    backgroundColor: theme.colors.backgroundShades.secondary, // Light gray background from design.json
  },
  filterButton: {
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
    paddingVertical: theme.spacing[3],                       // 12px spacing
    paddingHorizontal: theme.spacing[4],                     // 16px spacing
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.colors.border.light,                  // Border light from design.json
    marginRight: theme.spacing[3],                           // 12px spacing
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary,                   // Primary #957530 from design.json
    borderColor: theme.colors.primary,                      // Primary border
  },
  filterText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.medium,          // 500 weight
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
  },
  activeFilterText: {
    color: theme.colors.surface,                            // White text from design.json
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,                  // 18px
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    paddingHorizontal: theme.spacing[5],                     // 20px spacing
    paddingVertical: theme.spacing[4],                       // 16px spacing
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing[10],                      // 40px spacing
  },
  loadingText: {
    marginTop: theme.spacing[4],                            // 16px spacing
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
  },
  rewardsGrid: {
    paddingHorizontal: theme.spacing[2],                     // 8px spacing
    paddingBottom: theme.spacing[5],                         // 20px spacing
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[2],                     // 8px spacing
  },
  rewardWrapper: {
    width: '48%',
    marginBottom: theme.spacing[4],                          // 16px spacing
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing[10],                      // 40px spacing
  },
  emptyText: {
    color: theme.colors.textSecondary,                       // Text secondary from design.json
    fontSize: theme.typography.fontSize.lg,                  // 18px
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
  },
  emptySubtext: {
    color: theme.colors.textSecondary,                       // Text secondary from design.json
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    textAlign: 'center',
  },
}); 