import { MemberQRCode } from '@/components/ui';
import { theme } from '@/constants/Theme';
import { useAuthStore } from '@/store/auth-store';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const {
    profile,
    user,
    getCurrentTier,
    getNextTier,
    getPointsToNextTier,
    updateProfile,
    generateMemberQRCode,
    signOut,
    isLoading,
  } = useAuthStore();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateProfile({ display_name: displayName.trim() });
      
      if (error) {
        Alert.alert('Error', 'Failed to update profile');
      } else {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
    setIsSaving(false);
  };

  const handleGenerateQR = async () => {
    setIsGeneratingQR(true);
    try {
      const { qr_data, error } = await generateMemberQRCode();
      
      if (error) {
        Alert.alert('Error', 'Failed to generate QR code');
      } else {
        Alert.alert('Success', 'QR code generated successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
    }
    setIsGeneratingQR(false);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  if (isLoading && !profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 16, color: theme.colors.gray[800] }}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile || !user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.gray[800] }}>No profile found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.gray[50] }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          backgroundColor: theme.colors.white,
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.gray[200],
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.colors.gray[900],
            marginBottom: 8,
          }}>
            Profile
          </Text>
          <Text style={{
            fontSize: 16,
            color: theme.colors.gray[600],
          }}>
            Manage your account settings
          </Text>
        </View>

        {/* Profile Section */}
        <View style={{
          backgroundColor: theme.colors.white,
          margin: 16,
          borderRadius: 12,
          padding: 20,
        }}>
          {/* Avatar */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 12,
            }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: theme.colors.white,
              }}>
                {(profile.display_name || 'M').charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Display Name */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.gray[900],
              marginBottom: 8,
            }}>
              Display Name
            </Text>
            
            {isEditing ? (
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.gray[300],
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: theme.colors.gray[900],
                  backgroundColor: theme.colors.white,
                }}
                placeholder="Enter your display name"
                placeholderTextColor={theme.colors.gray[500]}
              />
            ) : (
              <View style={{
                padding: 12,
                backgroundColor: theme.colors.gray[50],
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 16,
                  color: theme.colors.gray[900],
                }}>
                  {profile.display_name || 'No name set'}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  style={{
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: theme.colors.white, fontSize: 12, fontWeight: '600' }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Email */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.gray[900],
              marginBottom: 8,
            }}>
              Email
            </Text>
            <View style={{
              padding: 12,
              backgroundColor: theme.colors.gray[50],
              borderRadius: 8,
            }}>
              <Text style={{
                fontSize: 16,
                color: theme.colors.gray[600],
              }}>
                {user.email}
              </Text>
            </View>
          </View>

          {/* Edit Actions */}
          {isEditing && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  setDisplayName(profile.display_name || '');
                }}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.gray[200],
                  padding: 12,
                  borderRadius: 8,
                  marginRight: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: theme.colors.gray[800],
                  fontWeight: '600',
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSaveProfile}
                disabled={isSaving}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  padding: 12,
                  borderRadius: 8,
                  marginLeft: 8,
                  alignItems: 'center',
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Text style={{
                    color: theme.colors.white,
                    fontWeight: '600',
                  }}>
                    Save
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Tier Status */}
        <View style={{
          backgroundColor: theme.colors.white,
          margin: 16,
          borderRadius: 12,
          padding: 20,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.gray[900],
            marginBottom: 16,
          }}>
            Membership Status
          </Text>

          {/* Current Tier */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <View>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: theme.colors.primary,
              }}>
                {currentTier?.name || 'Bronze'}
              </Text>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: theme.colors.gray[900],
              }}>
                {profile.points.toLocaleString()} pts
              </Text>
            </View>
            
            <View style={{
              backgroundColor: theme.colors.primary,
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                color: theme.colors.white,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
                {currentTier?.name?.charAt(0) || 'B'}
              </Text>
            </View>
          </View>

          {/* Progress to Next Tier */}
          {nextTier && (
            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
                <Text style={{
                  fontSize: 14,
                  color: theme.colors.gray[600],
                }}>
                  Progress to {nextTier.name}
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: theme.colors.gray[900],
                }}>
                  {pointsToNext} pts to go
                </Text>
              </View>
              
              <View style={{
                height: 8,
                backgroundColor: theme.colors.gray[200],
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '60%', // Placeholder progress
                  backgroundColor: theme.colors.primary,
                }} />
              </View>
            </View>
          )}
        </View>

        {/* Member QR Code */}
        <View style={{ margin: 16 }}>
          <MemberQRCode
            qrData={profile.qr_code_data}
            memberName={profile.display_name || 'Member'}
            memberPoints={profile.points}
            onRegenerateQR={handleGenerateQR}
            isLoading={isGeneratingQR}
          />
        </View>

        {/* Sign Out Button */}
        <View style={{
          backgroundColor: theme.colors.white,
          margin: 16,
          borderRadius: 12,
        }}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.statusError,
            }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
} 