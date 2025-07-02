import { theme } from '@/constants/Theme';
import { useRedeemReward } from '@/hooks/useData';
import { useAuthStore } from '@/store/auth-store';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface RedemptionModalProps {
  visible: boolean;
  onClose: () => void;
  reward: {
    id: string;
    title: string;
    description?: string;
    cost: number;
    image_url?: string;
  } | null;
}

export function RedemptionModal({ visible, onClose, reward }: RedemptionModalProps) {
  const { profile } = useAuthStore();
  const [redemptionStep, setRedemptionStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [voucherCode, setVoucherCode] = useState<string>('');
  
  const redeemMutation = useRedeemReward();

  const handleRedeem = async () => {
    if (!reward || !profile) return;

    if (profile.points < reward.cost) {
      Alert.alert('Insufficient Points', `You need ${reward.cost - profile.points} more points to redeem this reward.`);
      return;
    }

    setRedemptionStep('processing');

    try {
      const result = await redeemMutation.mutateAsync(reward.id);

      if (result) {
        setVoucherCode(result);
        setRedemptionStep('success');
      } else {
        throw new Error('Redemption failed');
      }
    } catch (error) {
      console.error('Redemption error:', error);
      Alert.alert('Redemption Failed', 'Please try again later.');
      setRedemptionStep('confirm');
    }
  };

  const handleClose = () => {
    setRedemptionStep('confirm');
    setVoucherCode('');
    onClose();
  };

  if (!reward) return null;

  const canAfford = profile && profile.points >= reward.cost;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {redemptionStep === 'confirm' && (
          <>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Redeem Reward</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Reward Details */}
            <View style={styles.content}>
              <Image
                source={{ 
                  uri: reward.image_url || `https://picsum.photos/300/200?random=${reward.id}` 
                }}
                style={styles.rewardImage}
                resizeMode="cover"
              />
              
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                {reward.description && (
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                )}
                
                <View style={styles.costContainer}>
                  <Text style={styles.costLabel}>Cost:</Text>
                  <Text style={styles.costValue}>{reward.cost} U+Points</Text>
                </View>

                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceLabel}>Your Balance:</Text>
                  <Text style={[
                    styles.balanceValue,
                    { color: canAfford ? theme.colors.success : theme.colors.error }
                  ]}>
                    {profile?.points || 0} U+Points
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.redeemButton,
                  !canAfford && styles.disabledButton
                ]}
                onPress={handleRedeem}
                disabled={!canAfford}
              >
                <Text style={[
                  styles.redeemText,
                  !canAfford && styles.disabledText
                ]}>
                  {canAfford ? 'Redeem Now' : 'Insufficient Points'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {redemptionStep === 'processing' && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={theme.colors.brand.gold} />
            <Text style={styles.processingText}>Processing redemption...</Text>
          </View>
        )}

        {redemptionStep === 'success' && (
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.placeholder} />
              <Text style={styles.headerTitle}>Redemption Successful</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Success Content */}
            <View style={styles.successContent}>
              <View style={styles.successIcon}>
                <Text style={styles.successEmoji}>🎉</Text>
              </View>
              
              <Text style={styles.successTitle}>Voucher Ready!</Text>
              <Text style={styles.successSubtitle}>
                Show this QR code to redeem your reward
              </Text>

              {/* QR Code Placeholder */}
              <View style={styles.qrContainer}>
                <View style={styles.qrPlaceholder}>
                  <Text style={styles.qrText}>QR CODE</Text>
                  <Text style={styles.qrCode}>{voucherCode}</Text>
                </View>
              </View>

              <Text style={styles.voucherInfo}>
                This voucher expires in 10 minutes
              </Text>
              
              <Text style={styles.rewardTitleSuccess}>{reward.title}</Text>
            </View>

            {/* Success Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: theme.colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  rewardImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  rewardDescription: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 20,
    lineHeight: 24,
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  costValue: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.brand.gold,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  balanceLabel: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  redeemButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.gold,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  redeemText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.background.primary,
  },
  disabledButton: {
    backgroundColor: theme.colors.gray[300],
  },
  disabledText: {
    color: theme.colors.gray[500],
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successEmoji: {
    fontSize: 64,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  qrContainer: {
    marginBottom: 24,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.brand.gold,
  },
  qrText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  qrCode: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  voucherInfo: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  rewardTitleSuccess: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  doneButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.gold,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.background.primary,
  },
}); 