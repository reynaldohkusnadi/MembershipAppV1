import { theme } from '@/constants/Theme';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './LoginScreen';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isInitialized, isLoading, user, profile, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Create profile when user signs up
    const createProfile = async () => {
      if (user && !profile) {
        try {
          const { error } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              display_name: user.user_metadata?.display_name || user.email?.split('@')[0],
              tier_id: 1, // Default to Bronze tier
              points: 0,
            });

          if (error && error.code !== '23505') { // Ignore duplicate key errors
            console.error('Profile creation error:', error);
          }
        } catch (error) {
          console.error('Profile creation error:', error);
        }
      }
    };

    createProfile();
  }, [user, profile]);

  if (!isInitialized || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.brand.gold} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show login screen if user is not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  loadingText: {
    marginTop: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
}); 