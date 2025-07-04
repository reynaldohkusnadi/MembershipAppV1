import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://exfovnuglizfwqqqxpnd.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Zm92bnVnbGl6ZndxcXF4cG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMTU0MzMsImV4cCI6MjA2Njg5MTQzM30.K-lGLfGExMvDp_dRS-Wz9qXhO1uA0yp7nV7hOQFiLjY';

// Create Supabase client with fallback credentials for testing
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types based on actual schema from DS.md
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          tier_id: number;
          points: number;
          created_at: string;
          member_qr_token: string | null;
          qr_code_data: string | null;
          qr_code_updated_at: string | null;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          tier_id?: number;
          points?: number;
          member_qr_token?: string | null;
          qr_code_data?: string | null;
          qr_code_updated_at?: string | null;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          tier_id?: number;
          points?: number;
          member_qr_token?: string | null;
          qr_code_data?: string | null;
          qr_code_updated_at?: string | null;
        };
      };
      tiers: {
        Row: {
          id: number;
          name: string;
          min_points: number;
          benefits: Record<string, any>;
          created_at: string;
        };
        Insert: {
          name: string;
          min_points: number;
          benefits?: Record<string, any>;
        };
        Update: {
          name?: string;
          min_points?: number;
          benefits?: Record<string, any>;
        };
      };
      points_ledger: {
        Row: {
          id: string;
          user_id: string;
          delta: number;
          reason: string;
          source: 'purchase' | 'manual' | 'referral' | 'promo' | 'redemption';
          ref_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          delta: number;
          reason: string;
          source: 'purchase' | 'manual' | 'referral' | 'promo' | 'redemption';
          ref_id?: string | null;
        };
        Update: {
          delta?: number;
          reason?: string;
          source?: 'purchase' | 'manual' | 'referral' | 'promo' | 'redemption';
          ref_id?: string | null;
        };
      };
      rewards: {
        Row: {
          id: string;
          category_code: string;
          title: string;
          description: string | null;
          image_url: string | null;
          cost: number;
          available: boolean;
          created_at: string;
        };
        Insert: {
          category_code: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          cost: number;
          available?: boolean;
        };
        Update: {
          category_code?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          cost?: number;
          available?: boolean;
        };
      };
      reward_categories: {
        Row: {
          code: string;
          label: string;
        };
        Insert: {
          code: string;
          label: string;
        };
        Update: {
          label?: string;
        };
      };
      redemptions: {
        Row: {
          id: string;
          user_id: string;
          reward_id: string;
          cost: number;
          qr_code: string;
          status: 'pending' | 'redeemed' | 'expired';
          expires_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          reward_id: string;
          cost: number;
          qr_code: string;
          expires_at: string;
          status?: 'pending' | 'redeemed' | 'expired';
        };
        Update: {
          status?: 'pending' | 'redeemed' | 'expired';
        };
      };
      brands: {
        Row: {
          id: number;
          name: string;
          logo_url: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          logo_url?: string | null;
          description?: string | null;
        };
        Update: {
          name?: string;
          logo_url?: string | null;
          description?: string | null;
        };
      };
      outlets: {
        Row: {
          id: number;
          brand_id: number;
          name: string;
          address: string | null;
          lat: number | null;
          lng: number | null;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          brand_id: number;
          name: string;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          phone?: string | null;
        };
        Update: {
          brand_id?: number;
          name?: string;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          phone?: string | null;
        };
      };
      promotions: {
        Row: {
          id: string;
          brand_id: number | null;
          title: string;
          content_md: string | null;
          image_url: string | null;
          start_date: string;
          end_date: string;
          urgent: boolean;
          created_at: string;
        };
        Insert: {
          brand_id?: number | null;
          title: string;
          content_md?: string | null;
          image_url?: string | null;
          start_date: string;
          end_date: string;
          urgent?: boolean;
        };
        Update: {
          brand_id?: number | null;
          title?: string;
          content_md?: string | null;
          image_url?: string | null;
          start_date?: string;
          end_date?: string;
          urgent?: boolean;
        };
      };
    };
    Functions: {
      fn_redeem_reward: {
        Args: {
          p_user: string;
          p_reward: string;
        };
        Returns: string;
      };
      fn_generate_member_qr_token: {
        Args: {
          p_user_id: string;
        };
        Returns: string;
      };
      fn_validate_member_qr_token: {
        Args: {
          p_qr_token: string;
        };
        Returns: {
          member_id: string | null;
          display_name: string | null;
          points: number | null;
          tier_name: string | null;
          is_valid: boolean;
        }[];
      };
    };
  };
} 