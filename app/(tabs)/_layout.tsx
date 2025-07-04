import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { theme } from '@/constants/Theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.borderDefault,
          height: theme.components.tab.height,
          paddingBottom: Platform.OS === 'ios' ? 30 : 20,
          paddingTop: 15,
        },
        tabBarIconStyle: {
          // Apply iconography specs from design.json
          // Note: stroke width and style will be applied in IconSymbol component
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={theme.components.tab.iconSize} 
              name="house.fill" 
              color={color}
              // Apply design.json iconography stroke width if needed
            />
          ),
        }}
      />
      <Tabs.Screen
        name="brands"
        options={{
          title: 'Brands',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={theme.components.tab.iconSize} 
              name="fork.knife" 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={theme.components.tab.iconSize} 
              name="gift.fill" 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "What's On",
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={theme.components.tab.iconSize} 
              name="calendar" 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={theme.components.tab.iconSize} 
              name="person.fill" 
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
