import { LocationSelectionScreen } from '@/components/LocationSelectionScreen';
import { RestaurantDetailScreen } from '@/components/RestaurantDetailScreen';
import { Header } from '@/components/ui/Header';
import { theme } from '@/constants/Theme';
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
    backgroundColor: theme.colors.backgroundShades.primary,  // Background #F0F0EC from design.json
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
    marginTop: theme.spacing[4],                            // 16px spacing from design.json
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontSize: theme.typography.fontSize.body,               // 16px body from design.json
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
  },
  brandCard: {
    height: theme.components.card.height,                   // 200px from design.json horizontal_card_carousel
    marginBottom: theme.spacing[1],                         // 4px spacing
    position: 'relative',
    borderRadius: theme.radius.medium,                      // radius_medium 12px from design.json
    overflow: 'hidden',
    ...theme.shadows.card,                                  // Elevation 2 from design.json
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
    backgroundColor: 'rgba(45, 45, 45, 0.7)',               // Using header background with opacity
    padding: theme.spacing[5],                              // 20px spacing
  },
  brandName: {
    color: theme.colors.surface,                            // White text from design.json
    fontSize: theme.typography.fontSize.headline,           // 24px headline from design.json
    fontWeight: theme.typography.fontWeight.bold,           // 700 weight from design.json
    lineHeight: theme.typography.lineHeight.headline,       // 32px line height from design.json
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                         // 4px spacing
  },
  outletCount: {
    color: theme.colors.primary,                            // Primary #957530 from design.json
    fontSize: theme.typography.fontSize.caption,            // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.medium,         // 500 weight
    letterSpacing: theme.typography.letterSpacing.caption,  // 0.1px letter spacing from design.json
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                         // 4px spacing
  },
  brandDescription: {
    color: theme.colors.surface,                            // White text from design.json
    fontSize: theme.typography.fontSize.caption,            // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.normal,         // 400 weight from design.json
    lineHeight: theme.typography.lineHeight.caption,        // 18px line height from design.json
    letterSpacing: theme.typography.letterSpacing.caption,  // 0.1px letter spacing from design.json
    fontFamily: theme.typography.fontFamily.primary,        // SF Pro Display from design.json
    opacity: 0.9,
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
  quickAccessSection: {
    backgroundColor: theme.colors.backgroundShades.secondary, // Light gray background from design.json
    padding: theme.spacing[5],                               // 20px spacing
    marginTop: theme.spacing[5],                             // 20px spacing
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,                  // 18px
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[4],                          // 16px spacing
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    width: '48%',
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
    borderRadius: theme.radius.medium,                       // radius_medium 12px from design.json
    padding: theme.spacing[4],                               // 16px padding from design.json
    alignItems: 'center',
    marginBottom: theme.spacing[3],                          // 12px spacing
    ...theme.shadows.card,                                   // Elevation 2 from design.json
  },
  quickAccessIcon: {
    fontSize: theme.iconography.sizeLarge,                   // 32px size_large from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
  },
  quickAccessText: {
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.medium,          // 500 weight
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    letterSpacing: theme.typography.letterSpacing.caption,   // 0.1px letter spacing from design.json
    textAlign: 'center',
  },
  featuredSection: {
    padding: theme.spacing[5],                               // 20px spacing
  },
  featuredOutlet: {
    backgroundColor: theme.colors.surface,                   // Surface white from design.json
    borderRadius: theme.radius.medium,                       // radius_medium 12px from design.json
    ...theme.shadows.card,                                   // Elevation 2 from design.json
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: theme.spacing[4],                               // 16px padding from design.json
  },
  featuredName: {
    fontSize: theme.typography.fontSize.lg,                  // 18px
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    color: theme.colors.textPrimary,                        // Text primary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[1],                          // 4px spacing
  },
  featuredBrand: {
    fontSize: theme.typography.fontSize.xs,                  // 12px
    color: theme.colors.primary,                            // Primary #957530 from design.json
    fontWeight: theme.typography.fontWeight.medium,          // 500 weight
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[2],                          // 8px spacing
    textTransform: 'uppercase',
  },
  featuredAddress: {
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    color: theme.colors.textSecondary,                      // Text secondary from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
    marginBottom: theme.spacing[4],                          // 16px spacing
    lineHeight: theme.typography.lineHeight.caption,         // 18px line height from design.json
  },
  viewDetailsButton: {
    backgroundColor: theme.colors.primary,                   // Primary #957530 from design.json
    borderRadius: theme.radius.small,                        // radius_small 8px from design.json
    paddingVertical: theme.spacing[3],                       // 12px padding
    paddingHorizontal: theme.spacing[6],                     // 24px padding
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: theme.colors.surface,                            // White text from design.json
    fontSize: theme.typography.fontSize.caption,             // 13px caption from design.json
    fontWeight: theme.typography.fontWeight.semibold,        // 600 weight from design.json
    fontFamily: theme.typography.fontFamily.primary,         // SF Pro Display from design.json
  },
}); 