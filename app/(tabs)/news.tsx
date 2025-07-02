import { Header } from '@/components/ui/Header';
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
            <ActivityIndicator size="large" color="#D4AF37" />
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  promotionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  promotionImage: {
    width: '100%',
    height: 160,
  },
  promotionContent: {
    padding: 16,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  promotionBrand: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  promotionDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  emptyContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
}); 