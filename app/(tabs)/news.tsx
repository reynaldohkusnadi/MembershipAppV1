import { Header } from '@/components/ui/Header';
import { theme } from '@/constants/Theme';
import { usePromotions } from '@/hooks/useData';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function NewsScreen() {
  const { data: promotions, isLoading } = usePromotions();

  // Separate events and promotions (for now using sample logic)
  const events = promotions?.filter(promo => 
    promo.title.toLowerCase().includes('event') || 
    promo.title.toLowerCase().includes('launch') ||
    promo.title.toLowerCase().includes('opening')
  ) || [];
  
  const promoOffers = promotions?.filter(promo => 
    !promo.title.toLowerCase().includes('event') && 
    !promo.title.toLowerCase().includes('launch') &&
    !promo.title.toLowerCase().includes('opening')
  ) || [];

  const handlePromotionPress = (promotionId: string) => {
    console.log('Navigate to promotion detail:', promotionId);
    // TODO: Navigate to promotion detail screen
  };

  const renderPromotionCard = (promotion: any) => (
    <TouchableOpacity 
      key={promotion.id}
      style={styles.promotionCard}
      onPress={() => handlePromotionPress(promotion.id)}
    >
      <Image
        source={{ 
          uri: promotion.image_url || `https://picsum.photos/300/160?random=${promotion.id}` 
        }}
        style={styles.promotionImage}
        resizeMode="cover"
      />
      <View style={styles.promotionContent}>
        <Text style={styles.promotionTitle}>{promotion.title}</Text>
        {promotion.brands && (
          <Text style={styles.promotionBrand}>{promotion.brands.name}</Text>
        )}
        <Text style={styles.promotionDate}>
          {new Date(promotion.start_date).toLocaleDateString()} - {new Date(promotion.end_date).toLocaleDateString()}
        </Text>
        {promotion.content_md && (
          <Text style={styles.promotionDescription} numberOfLines={2}>
            {promotion.content_md.replace(/[#*]/g, '').trim()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="WHAT'S ON" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading news...</Text>
          </View>
        ) : (
          <>
            {/* Events Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EVENTS</Text>
              {events.length > 0 ? (
                events.map(renderPromotionCard)
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No events currently</Text>
                  <Text style={styles.emptySubtext}>Check back soon for upcoming events</Text>
                </View>
              )}
            </View>
            
            {/* Promotions Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROMOTIONS</Text>
              {promoOffers.length > 0 ? (
                promoOffers.map(renderPromotionCard)
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No promotions currently</Text>
                  <Text style={styles.emptySubtext}>Check back soon for new offers</Text>
                </View>
              )}
            </View>

            {/* Featured News Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FEATURED NEWS</Text>
              <View style={styles.newsCard}>
                <Image
                  source={{ uri: 'https://picsum.photos/300/160?random=news1' }}
                  style={styles.newsImage}
                  resizeMode="cover"
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>New Artisan Outlet Opening Soon</Text>
                  <Text style={styles.newsDate}>December 2024</Text>
                  <Text style={styles.newsDescription}>
                    We're excited to announce the opening of our newest location in Marina Bay. 
                    Get ready for an elevated dining experience with exclusive opening promotions.
                  </Text>
                </View>
              </View>

              <View style={styles.newsCard}>
                <Image
                  source={{ uri: 'https://picsum.photos/300/160?random=news2' }}
                  style={styles.newsImage}
                  resizeMode="cover"
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>Artisan Membership Program Launch</Text>
                  <Text style={styles.newsDate}>December 2024</Text>
                  <Text style={styles.newsDescription}>
                    Join our new membership program and start earning points with every purchase. 
                    Enjoy exclusive rewards and tier benefits.
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
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
    backgroundColor: theme.colors.backgroundShades.primary,  // Background #F0F0EC from design.json
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
  section: {
    marginBottom: theme.spacing[6],                          // 24px spacing
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,                  // 18px
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    paddingHorizontal: theme.spacing[5],                     // 20px spacing
    paddingVertical: theme.spacing[4],                       // 16px spacing
  },
  promotionCard: {
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
    marginHorizontal: theme.spacing[5],                      // 20px spacing
    marginBottom: theme.spacing[4],                          // 16px spacing
    borderRadius: theme.radius.medium,                       // radius_medium 12px from design.json
    ...theme.shadows.card,                                   // Elevation 2 from design.json
    overflow: 'hidden',
  },
  promotionImage: {
    width: '100%',
    height: 160,
  },
  promotionContent: {
    padding: theme.spacing[4],                               // 16px padding from design.json
  },
  promotionTitle: {
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                          // 4px spacing
  },
  promotionBrand: {
    fontSize: theme.typography.fontSize.xs,                  // 12px
    color: theme.colors.primary,                            // Primary #957530 from design.json
    fontWeight: theme.typography.fontWeight.medium,          // 500 weight
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                          // 4px spacing
    textTransform: 'uppercase',
  },
  promotionDate: {
    fontSize: theme.typography.fontSize.xs,                  // 12px
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
  },
  promotionDescription: {
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    lineHeight: theme.typography.lineHeight.caption,         // 18px line height from design.json
  },
  newsCard: {
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
    marginHorizontal: theme.spacing[5],                      // 20px spacing
    marginBottom: theme.spacing[4],                          // 16px spacing
    borderRadius: theme.radius.medium,                       // radius_medium 12px from design.json
    ...theme.shadows.card,                                   // Elevation 2 from design.json
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  newsContent: {
    padding: theme.spacing[4],                               // 16px padding from design.json
  },
  newsTitle: {
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                          // 4px spacing
  },
  newsDate: {
    fontSize: theme.typography.fontSize.xs,                  // 12px
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
  },
  newsDescription: {
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    lineHeight: theme.typography.lineHeight.caption,         // 18px line height from design.json
  },
  emptyContainer: {
    paddingVertical: theme.spacing[10],                      // 40px spacing
    paddingHorizontal: theme.spacing[5],                     // 20px spacing
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,                       // Text secondary from design.json
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
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