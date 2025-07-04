import { theme } from '@/constants/Theme';
import { Database } from '@/lib/supabase';
import React from 'react';
import {
    Alert,
    Image,
    Linking,
    Platform,
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

interface RestaurantDetailScreenProps {
  outlet: Outlet;
  onBack: () => void;
}

export function RestaurantDetailScreen({ outlet, onBack }: RestaurantDetailScreenProps) {
  
  const formatOpeningHours = (hours: any) => {
    if (!hours || typeof hours !== 'object') {
      return [{ day: 'Opening hours', time: 'Available upon inquiry' }];
    }
    
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return daysOfWeek.map((day, index) => ({
      day: dayLabels[index],
      time: hours[day] === 'closed' ? 'Closed' : hours[day] || 'Check with restaurant'
    }));
  };

  const handleDirections = () => {
    if (!outlet.lat || !outlet.lng) {
      Alert.alert('Location Error', 'GPS coordinates not available for this location');
      return;
    }

    const scheme = Platform.select({ 
      ios: 'maps:', 
      android: 'geo:' 
    });
    const latLng = `${outlet.lat},${outlet.lng}`;
    const label = outlet.name;
    const url = Platform.select({
      ios: `${scheme}?q=${label}&ll=${latLng}`,
      android: `${scheme}${latLng}?q=${label}`
    });

    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // Fallback to Google Maps web
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latLng}`);
        }
      });
    }
  };

  const handleMenuPress = () => {
    if (outlet.menu_url) {
      Linking.openURL(outlet.menu_url);
    } else {
      Alert.alert('Menu', 'Menu not available online. Please contact the restaurant for details.');
    }
  };

  const handleCallPress = () => {
    if (outlet.phone) {
      const phoneNumber = outlet.phone.replace(/[^0-9+]/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Contact', 'Phone number not available');
    }
  };

  const handleSocialPress = (type: 'instagram' | 'website' | 'email') => {
    let url = '';
    switch (type) {
      case 'instagram':
        url = outlet.instagram_url || '';
        break;
      case 'website':
        url = outlet.website_url || '';
        break;
      case 'email':
        url = outlet.email ? `mailto:${outlet.email}` : '';
        break;
    }

    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('Not Available', `${type} link not available for this location`);
    }
  };

  const todayHours = () => {
    if (!outlet.opening_hours || typeof outlet.opening_hours !== 'object') return 'Check opening hours below';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = outlet.opening_hours[today];
    
    if (todayHours === 'closed') {
      return 'Closed today';
    } else if (todayHours) {
      return `Open today: ${todayHours}`;
    }
    
    return 'Check opening hours below';
  };

  const openingHoursList = formatOpeningHours(outlet.opening_hours);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <IconSymbol name="square.and.arrow.up" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <IconSymbol name="heart" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ 
              uri: outlet.image_url || `https://picsum.photos/400/300?random=${outlet.id}` 
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>1 / 1</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>{outlet.name}</Text>
          <Text style={styles.brandName}>{outlet.brands?.name} • {outlet.address}</Text>
          <Text style={styles.todayHours}>{todayHours()}</Text>
          
          {outlet.description && (
            <Text style={styles.description}>{outlet.description}</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <IconSymbol name="location" size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleMenuPress}>
            <IconSymbol name="doc.text" size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleCallPress}>
            <IconSymbol name="phone" size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Opening Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OPENING HOURS</Text>
          <View style={styles.hoursContainer}>
            {openingHoursList.map((item, index) => (
              <View key={index} style={styles.hoursRow}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          <View style={styles.contactContainer}>
            {outlet.phone && (
              <TouchableOpacity style={styles.contactRow} onPress={handleCallPress}>
                <IconSymbol name="phone.fill" size={20} color={theme.colors.primary} />
                <Text style={styles.contactText}>{outlet.phone}</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
            
            {outlet.email && (
              <TouchableOpacity style={styles.contactRow} onPress={() => handleSocialPress('email')}>
                <IconSymbol name="envelope.fill" size={20} color={theme.colors.primary} />
                <Text style={styles.contactText}>{outlet.email}</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
            
            {outlet.address && (
              <TouchableOpacity style={styles.contactRow} onPress={handleDirections}>
                <IconSymbol name="location.fill" size={20} color={theme.colors.primary} />
                <Text style={styles.contactText}>{outlet.address}</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONNECT</Text>
          <View style={styles.socialContainer}>
            {outlet.instagram_url && (
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialPress('instagram')}>
                <IconSymbol name="camera.fill" size={20} color={theme.colors.surface} />
                <Text style={styles.socialButtonText}>Instagram</Text>
              </TouchableOpacity>
            )}
            
            {outlet.website_url && (
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialPress('website')}>
                <IconSymbol name="globe" size={20} color={theme.colors.surface} />
                <Text style={styles.socialButtonText}>Website</Text>
              </TouchableOpacity>
            )}
            
            {outlet.email && (
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialPress('email')}>
                <IconSymbol name="envelope.fill" size={20} color={theme.colors.surface} />
                <Text style={styles.socialButtonText}>Email</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
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
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
  },
  backButton: {
    backgroundColor: theme.colors.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
  headerAction: {
    backgroundColor: theme.colors.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    bottom: theme.spacing[4],
    right: theme.spacing[4],
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.radius.md,
  },
  imageCounterText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.medium,
  },
  infoSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing[4],
  },
  restaurantName: {
    fontSize: theme.typography.fontSize.headingMd,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.headingMd,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[1],
  },
  brandName: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing[2],
  },
  todayHours: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing[3],
  },
  description: {
    fontSize: theme.typography.fontSize.body,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.textPrimary,
  },
  actionsSection: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing[4],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing[1],
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[4],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.headingMd,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.headingMd,
    letterSpacing: theme.typography.letterSpacing.headingMd,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    marginBottom: theme.spacing[4],
  },
  hoursContainer: {
    gap: theme.spacing[2],
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  timeText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textSecondary,
  },
  contactContainer: {
    gap: theme.spacing[3],
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  contactText: {
    flex: 1,
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textPrimary,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: theme.spacing[3],
    flexWrap: 'wrap',
  },
  socialButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.button,
    gap: theme.spacing[2],
    minWidth: 120,
  },
  socialButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
  },
  bottomSpacing: {
    height: theme.spacing[8],
  },
}); 