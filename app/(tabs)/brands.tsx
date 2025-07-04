import { LocationSelectionScreen } from '@/components/LocationSelectionScreen';
import { RestaurantDetailScreen } from '@/components/RestaurantDetailScreen';
import { Header } from '@/components/ui/Header';
import { useBrands, useOutlets } from '@/hooks/useData';
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

export default function RestaurantsScreen() {
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: outlets, isLoading: outletsLoading } = useOutlets();

  const [selectedBrand, setSelectedBrand] = React.useState<any>(null);
  const [selectedOutlet, setSelectedOutlet] = React.useState<any>(null);
  const [navigationState, setNavigationState] = React.useState<'brands' | 'locations' | 'restaurant'>('brands');

  const handleBrandPress = (brandId: number) => {
    const brand = brands?.find(b => b.id === brandId);
    if (!brand) return;

    const brandOutlets = outlets?.filter(outlet => outlet.brand_id === brandId) || [];
    
    if (brandOutlets.length === 1) {
      // Single outlet - go directly to restaurant detail
      setSelectedOutlet(brandOutlets[0]);
      setNavigationState('restaurant');
    } else {
      // Multiple outlets - show location selection
      setSelectedBrand(brand);
      setNavigationState('locations');
    }
  };

  const handleLocationSelect = (outlet: any) => {
    setSelectedOutlet(outlet);
    setNavigationState('restaurant');
  };

  const handleBackToLocations = () => {
    setNavigationState('locations');
    setSelectedOutlet(null);
  };

  const handleBackToBrands = () => {
    setNavigationState('brands');
    setSelectedBrand(null);
    setSelectedOutlet(null);
  };

  const getOutletCountForBrand = (brandId: number) => {
    return outlets?.filter(outlet => outlet.brand_id === brandId).length || 0;
  };

  // Handle different navigation states
  if (navigationState === 'restaurant' && selectedOutlet) {
    return (
      <RestaurantDetailScreen 
        outlet={selectedOutlet} 
        onBack={selectedBrand ? handleBackToLocations : handleBackToBrands}
      />
    );
  }

  if (navigationState === 'locations' && selectedBrand) {
    return (
      <LocationSelectionScreen 
        brand={selectedBrand}
        onLocationSelect={handleLocationSelect}
        onBack={handleBackToBrands}
      />
    );
  }

  // Default brands listing screen
  return (
    <View style={styles.container}>
      <Header title="BRANDS" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {brandsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={styles.loadingText}>Loading brands...</Text>
          </View>
        ) : brands && brands.length > 0 ? (
          brands.map((brand) => (
            <TouchableOpacity 
              key={brand.id} 
              style={styles.brandCard}
              onPress={() => handleBrandPress(brand.id)}
            >
              <Image
                source={{ 
                  uri: brand.logo_url || `https://picsum.photos/400/200?random=${brand.id + 10}` 
                }}
                style={styles.brandImage}
                resizeMode="cover"
              />
              <View style={styles.brandOverlay}>
                <Text style={styles.brandName}>{brand.name}</Text>
                {!outletsLoading && (
                  <Text style={styles.outletCount}>
                    {getOutletCountForBrand(brand.id)} {getOutletCountForBrand(brand.id) === 1 ? 'Outlet' : 'Outlets'}
                  </Text>
                )}
                {brand.description && (
                  <Text style={styles.brandDescription} numberOfLines={2}>
                    {brand.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No brands available</Text>
            <Text style={styles.emptySubtext}>Check back soon for restaurant brands</Text>
          </View>
        )}

        {/* Quick Access Section */}
        {outlets && outlets.length > 0 && (
          <View style={styles.quickAccessSection}>
            <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity style={styles.quickAccessButton}>
                <Text style={styles.quickAccessIcon}>📍</Text>
                <Text style={styles.quickAccessText}>Find Nearest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessButton}>
                <Text style={styles.quickAccessIcon}>🍽️</Text>
                <Text style={styles.quickAccessText}>View Menus</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessButton}>
                <Text style={styles.quickAccessIcon}>📞</Text>
                <Text style={styles.quickAccessText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessButton}>
                <Text style={styles.quickAccessIcon}>🎁</Text>
                <Text style={styles.quickAccessText}>Offers</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Featured Outlet */}
        {outlets && outlets.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>FEATURED OUTLET</Text>
            <TouchableOpacity 
              style={styles.featuredOutlet}
              onPress={() => {
                setSelectedOutlet(outlets[0]);
                setNavigationState('restaurant');
              }}
            >
              <Image
                source={{ uri: `https://picsum.photos/300/160?random=${outlets[0].id + 50}` }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredName}>{outlets[0].name}</Text>
                <Text style={styles.featuredBrand}>{outlets[0].brands?.name}</Text>
                <Text style={styles.featuredAddress}>
                  {outlets[0].address || 'Address available soon'}
                </Text>
                <View style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
  brandCard: {
    height: 200,
    marginBottom: 2,
    position: 'relative',
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  outletCount: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  brandDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
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
  quickAccessSection: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickAccessIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  featuredSection: {
    padding: 20,
  },
  featuredOutlet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 16,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featuredBrand: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  featuredAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  viewDetailsButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 