import { Header } from '@/components/ui/Header';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { theme } from '@/constants/Theme';
import { useAuthStore } from '@/store/auth-store';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ProfileScreen() {
  const { 
    profile, 
    user, 
    getCurrentTier, 
    getNextTier, 
    getPointsToNextTier 
  } = useAuthStore();
  const [showQRModal, setShowQRModal] = useState(false);

  // Use real data from auth store instead of mock data
  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();
  
  // Use actual profile data or fallback values
  const userProfile = {
    name: profile?.display_name?.toUpperCase() || user?.email?.split('@')[0]?.toUpperCase() || 'MEMBER',
    id: user?.id?.slice(-6).toUpperCase() || 'MEMBER',
    tier: currentTier?.name?.toUpperCase() || 'BRONZE',
    nextTier: nextTier?.name?.toUpperCase() || 'SILVER',
    points: profile?.points || 0,
    pointsToNext: pointsToNext,
    currency: 'Ark',
    expiryDate: '30 Jun 2026', // This would come from points ledger expiry logic
  };

  const generateQRData = () => {
    // Generate QR code data for POS integration
    return JSON.stringify({
      userId: user?.id || userProfile.id,
      name: userProfile.name,
      points: userProfile.points,
      tier: userProfile.tier,
      timestamp: Date.now(),
    });
  };

  const menuItems = [
    {
      title: 'ARK POINTS EXPIRY',
      subtitle: `${userProfile.points} Ark Points will expire in ${userProfile.expiryDate}`,
      onPress: () => console.log('Points expiry pressed'),
    },
    {
      title: 'HISTORY',
      onPress: () => console.log('History pressed'),
    },
    {
      title: 'BENEFITS',
      onPress: () => console.log('Benefits pressed'),
    },
    {
      title: 'SETTINGS',
      onPress: () => console.log('Settings pressed'),
    },
    {
      title: 'FAQ',
      onPress: () => console.log('FAQ pressed'),
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="PROFILE" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <View style={styles.unionLogo}>
                <Text style={styles.unionText}>UNION</Text>
                <Text style={styles.groupText}>GROUP</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userId}>{userProfile.id}</Text>
          </View>

          {/* QR Code Button */}
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => setShowQRModal(true)}
          >
            <IconSymbol name="qrcode" size={24} color={theme.colors.white} />
            <Text style={styles.qrButtonText}>SHOW QR CODE</Text>
          </TouchableOpacity>
        </View>

        {/* Tier Progress Section */}
        <View style={styles.tierSection}>
          <View style={styles.tierProgress}>
            <Text style={styles.currentTier}>{userProfile.tier}</Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: nextTier ? `${Math.min(100, (userProfile.points / nextTier.min_points) * 100)}%` : '100%' }
              ]} />
            </View>
            <Text style={styles.nextTier}>{userProfile.nextTier}</Text>
          </View>
          
          <Text style={styles.tierProgressText}>
            {userProfile.pointsToNext} points to {userProfile.nextTier} status
          </Text>
        </View>

        {/* Points Section */}
        <View style={styles.pointsSection}>
          <Text style={styles.pointsAmount}>{userProfile.points}</Text>
          <Text style={styles.pointsLabel}>Ark Points</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index === 0 && styles.firstMenuItem,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <IconSymbol 
                name="chevron.right" 
                size={20} 
                color={theme.colors.gray[500]} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQRModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customer QR Code</Text>
            <Text style={styles.modalSubtitle}>
              Present this code at checkout for points and rewards
            </Text>
            
            <View style={styles.qrContainer}>
              <QRCode
                value={generateQRData()}
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>
            
            <View style={styles.qrInfo}>
              <Text style={styles.qrInfoName}>{userProfile.name}</Text>
              <Text style={styles.qrInfoId}>ID: {userProfile.id}</Text>
              <Text style={styles.qrInfoPoints}>{userProfile.points} Ark Points</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowQRModal(false)}
            >
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  userSection: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing[6],
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.gray[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  unionLogo: {
    alignItems: 'center',
  },
  unionText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.white,
    letterSpacing: 1,
  },
  groupText: {
    fontSize: 8,
    fontWeight: '500',
    color: theme.colors.white,
    letterSpacing: 1,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  userName: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    letterSpacing: 1,
  },
  userId: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.button,
    marginTop: theme.spacing[2],
  },
  qrButtonText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    color: theme.colors.white,
    marginLeft: theme.spacing[2],
  },
  tierSection: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing[6],
    alignItems: 'center',
  },
  tierProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
    width: '100%',
  },
  currentTier: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.gray[200],
    marginHorizontal: theme.spacing[4],
    borderRadius: 2,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  nextTier: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  tierProgressText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  pointsSection: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing[6],
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  pointsAmount: {
    fontSize: theme.typography.fontSize.displayLarge,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  pointsLabel: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  menuSection: {
    backgroundColor: theme.colors.white,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  firstMenuItem: {
    backgroundColor: theme.colors.gray[50],
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    letterSpacing: 0.5,
  },
  menuItemSubtitle: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[8],
    alignItems: 'center',
    margin: theme.spacing[6],
    maxWidth: 350,
    width: '90%',
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.headline,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing[6],
  },
  qrContainer: {
    padding: theme.spacing[4],
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing[6],
  },
  qrInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  qrInfoName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  qrInfoId: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[1],
  },
  qrInfoPoints: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.button,
  },
  closeButtonText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: '600',
    color: theme.colors.white,
  },
}); 