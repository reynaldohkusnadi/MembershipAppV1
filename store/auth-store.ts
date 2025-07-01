import { Database, supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  tier_id: number;
  points: number;
  created_at: string;
  tier?: {
    id: number;
    name: string;
    min_points: number;
    benefits: Record<string, any>;
  };
}

export type Tier = Database['public']['Tables']['tiers']['Row'];
export type PointsLedgerEntry = Database['public']['Tables']['points_ledger']['Row'];
export type Reward = Database['public']['Tables']['rewards']['Row'];
export type Redemption = Database['public']['Tables']['redemptions']['Row'];

interface AuthState {
  // State
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: any }>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  isInitialized: false,

  // Initialize auth state and listen for changes
  initialize: async () => {
    try {
      set({ isLoading: true });

      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await get().refreshProfile();
      }

      set({ 
        session, 
        user: session?.user || null,
        isInitialized: true,
        isLoading: false 
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ session, user: session?.user || null });
        
        if (session?.user && event === 'SIGNED_IN') {
          await get().refreshProfile();
        } else if (event === 'SIGNED_OUT') {
          set({ profile: null });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false });
        return { error };
      }

      // Profile will be loaded by auth state change listener
      set({ isLoading: false });
      return {};
    } catch (error) {
      set({ isLoading: false });
      return { error };
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, displayName?: string) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        set({ isLoading: false });
        return { error };
      }

      set({ isLoading: false });
      return {};
    } catch (error) {
      set({ isLoading: false });
      return { error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
      }

      set({ 
        session: null, 
        user: null, 
        profile: null, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ isLoading: false });
    }
  },

  // Update user profile
  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      const { user } = get();
      if (!user) return { error: 'No user found' };

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      set({ profile: data });
      return {};
    } catch (error) {
      return { error };
    }
  },

  // Refresh user profile from database
  refreshProfile: async () => {
    try {
      const { user } = get();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          tier:tiers(
            id,
            name,
            min_points,
            benefits
          )
        `)
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        return;
      }

      set({ profile: data });
    } catch (error) {
      console.error('Profile refresh error:', error);
    }
  },
})); 