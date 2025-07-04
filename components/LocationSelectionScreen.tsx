import { theme } from '@/constants/Theme';
import { useOutletsByBrand } from '@/hooks/useData';
import { Database } from '@/lib/supabase';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/IconSymbol';

type Brand = Database['public']['Tables']['brands']['Row'];
type Outlet = Database['public']['Tables']['outlets']['Row'] & {
  brands: Brand;
};

interface LocationSelectionScreenProps {
  brand: Brand;
  onLocationSelect: (outlet: Outlet) => void;
  onBack: () => void;
}

export function LocationSelectionScreen({ brand, onLocationSelect, onBack }: LocationSelectionScreenProps) {
  const { data: outlets, isLoading } = useOutletsByBrand(brand.id);

  const formatOpeningHours = (hours: any) => {
    if (!hours || typeof hours !== 'object') return 'Opening hours available upon inquiry';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = hours[today];
    
    if (todayHours === 'closed') {
      return 'Closed today';
    } else if (todayHours) {
      return `Open today: ${todayHours}`;
    }
    
    return 'Opening hours available upon inquiry';
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{brand.name}</Text>
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandHeader}>
          <Image
            source={{ uri: brand.logo_url || 'https://picsum.photos/100/100?random=brand' }}
            style={styles.brandLogo}
            resizeMode="cover"
          />
          <Text style={styles.brandDescription}>{brand.description}</Text>
        </View>

        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>CHOOSE LOCATION</Text>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Loading locations...</Text>
            </View>
          ) : outlets && outlets.length > 0 ? (
            outlets.map((outlet) => (
              <TouchableOpacity 
                key={outlet.id} 
                style={styles.locationCard}
                onPress={() => onLocationSelect(outlet)}
              >
                <Image
                  source={{ 
                    uri: outlet.image_url || `https://picsum.photos/300/160?random=${outlet.id}` 
                  }}
                  style={styles.locationImage}
                  resizeMode="cover"
                />
                <View style={styles.locationContent}>
                  <Text style={styles.locationName}>{outlet.name}</Text>
                  <Text style={styles.locationAddress}>{outlet.address}</Text>
                  <Text style={styles.openingHours}>{formatOpeningHours(outlet.opening_hours)}</Text>
                  {outlet.phone && (
                    <Text style={styles.locationPhone}>{outlet.phone}</Text>
                  )}
                </View>
                <View style={styles.chevron}>
                  <Text style={styles.chevronText}>›</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No locations available</Text>
              <Text style={styles.emptySubtext}>Check back soon for restaurant locations</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundShades.primary,
  },
  header: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    height: 56,
  },
  backButton: {
    padding: theme.spacing[2],
    marginLeft: -theme.spacing[2],
  },
  headerTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.headingMd,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerSpacer: {
    width: 40, // Same as back button to center title
  },
  content: {
    flex: 1,
  },
  brandHeader: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.withinSection,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing[2],
  },
  brandDescription: {
    fontSize: theme.typography.fontSize.body,
    lineHeight: theme.typography.lineHeight.body,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  locationSection: {
    padding: theme.spacing.withinSection,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.headingMd,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.headingMd,
    letterSpacing: theme.typography.letterSpacing.headingMd,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.withinSection,
  },
  loadingContainer: {
    paddingVertical: theme.spacing.betweenSections,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing[2],
  },
  locationCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing[2],
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  locationImage: {
    width: 100,
    height: 100,
  },
  locationContent: {
    flex: 1,
    padding: theme.spacing[2],
    justifyContent: 'center',
  },
  locationName: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[1],
  },
  locationAddress: {
    fontSize: theme.typography.fontSize.caption,
    lineHeight: theme.typography.lineHeight.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing[1],
  },
  openingHours: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing[1],
  },
  locationPhone: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.textSecondary,
  },
  chevron: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[2],
  },
  chevronText: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    fontWeight: '300',
  },
  emptyContainer: {
    paddingVertical: theme.spacing.betweenSections,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing[1],
  },
  emptySubtext: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}); 