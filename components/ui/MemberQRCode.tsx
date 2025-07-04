import { theme } from '@/constants/Theme';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface MemberQRCodeProps {
  qrData: string | null;
  memberName: string;
  memberPoints: number;
  onRegenerateQR: () => Promise<void>;
  isLoading?: boolean;
}

export function MemberQRCode({ 
  qrData, 
  memberName, 
  memberPoints, 
  onRegenerateQR, 
  isLoading = false 
}: MemberQRCodeProps) {
  const handleRegeneratePress = () => {
    Alert.alert(
      'Regenerate QR Code',
      'This will create a new QR code for your membership. The old code will no longer work. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Regenerate', 
          style: 'default',
          onPress: onRegenerateQR 
        },
      ]
    );
  };

  if (!qrData) {
    return (
      <View style={{
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.gray[900],
          marginBottom: 12,
        }}>
          Member QR Code
        </Text>
        
        <View style={{
          width: 200,
          height: 200,
          backgroundColor: theme.colors.gray[100],
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <Text style={{
            color: theme.colors.gray[500],
            fontSize: 14,
            textAlign: 'center',
          }}>
            QR Code{'\n'}Not Available
          </Text>
        </View>

        <TouchableOpacity
          onPress={onRegenerateQR}
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          <Text style={{
            color: theme.colors.white,
            fontWeight: '600',
            fontSize: 14,
          }}>
            {isLoading ? 'Generating...' : 'Generate QR Code'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
    }}>
      {/* Header */}
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gray[900],
        marginBottom: 8,
      }}>
        Member QR Code
      </Text>
      
      <Text style={{
        fontSize: 14,
        color: theme.colors.gray[600],
        textAlign: 'center',
        marginBottom: 20,
      }}>
        Show this QR code to staff when making purchases to earn points
      </Text>

      {/* QR Code */}
      <View style={{
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        marginBottom: 16,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <QRCode
          value={qrData}
          size={180}
          color={theme.colors.gray[900]}
          backgroundColor={theme.colors.white}
          logo={require('@/assets/images/icon.png')}
          logoSize={30}
          logoBackgroundColor={theme.colors.white}
        />
      </View>

      {/* Member Info */}
      <View style={{
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.gray[900],
        }}>
          {memberName}
        </Text>
        <Text style={{
          fontSize: 14,
          color: theme.colors.primary,
          fontWeight: '600',
        }}>
          {memberPoints.toLocaleString()} points
        </Text>
      </View>

      {/* Instructions */}
      <View style={{
        backgroundColor: theme.colors.gray[50],
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        width: '100%',
      }}>
        <Text style={{
          fontSize: 12,
          color: theme.colors.gray[700],
          textAlign: 'center',
          lineHeight: 16,
        }}>
          📱 Point recognition process:{'\n'}
          1. Show this QR to cashier{'\n'}
          2. Staff scans your member code{'\n'}
          3. Points automatically added to your account
        </Text>
      </View>

      {/* Regenerate Button */}
      <TouchableOpacity
        onPress={handleRegeneratePress}
        disabled={isLoading}
        style={{
          backgroundColor: theme.colors.gray[100],
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 6,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        <Text style={{
          color: theme.colors.gray[700],
          fontWeight: '500',
          fontSize: 12,
        }}>
          {isLoading ? 'Regenerating...' : 'Regenerate Code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 