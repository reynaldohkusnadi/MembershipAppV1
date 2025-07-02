import { theme } from '@/constants/Theme';
import { useAuthStore } from '@/store/auth-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './LoginScreen';
import { OnboardingScreen } from './OnboardingScreen';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isInitialized, isLoading, user, profile, initialize, createUserProfile } = useAuthStore();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Check if user is new (just created profile)
  useEffect(() => {
    if (user && profile && profile.points === 100) {
      // New user with welcome bonus
      setIsNewUser(true);
    }
  }, [user, profile]);

  // Create profile when user signs up
  useEffect(() => {
    const handleUserSignup = async () => {
      if (user && !profile) {
        try {
          await createUserProfile(user);
        } catch (error) {
          console.error('Profile creation error:', error);
        }
      }
    };

    handleUserSignup();
  }, [user, profile, createUserProfile]);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setIsNewUser(false);
  };

  // Loading state
  if (!isInitialized || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show login screen if user is not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  // Show onboarding for new users
  if (user && isNewUser && !hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.gray[600],
  },
}); 