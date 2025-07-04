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
  member_qr_token: string | null;
  qr_code_data: string | null;
  qr_code_updated_at: string | null;
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
  tiers: Tier[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error?: any }>;
  signInWithGoogle: () => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: any }>;
  refreshProfile: () => Promise<void>;
  createUserProfile: (user: User, displayName?: string) => Promise<UserProfile | null>;
  generateMemberQRCode: () => Promise<{ qr_data?: string; error?: any }>;
  loadTiers: () => Promise<void>;
  getCurrentTier: () => Tier | null;
  getNextTier: () => Tier | null;
  getPointsToNextTier: () => number;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  session: null,
  user: null,
  profile: null,
  tiers: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  // Initialize auth state and listen for changes
  initialize: async () => {
    try {
      set({ isLoading: true });

      // Load tiers first
      await get().loadTiers();

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
        console.log('Auth state changed:', event, session?.user?.email);
        set({ session, user: session?.user || null });
        
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
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
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message, isLoading: false });
        return { error };
      }

      // Profile will be loaded by auth state change listener
      set({ isLoading: false });
      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { error };
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, displayName?: string) => {
    try {
      set({ isLoading: true, error: null });
      
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
        set({ error: error.message, isLoading: false });
        return { error };
      }

      // If user is immediately confirmed (auto-confirm in dev), create profile
      if (data.user && data.session) {
        await get().createUserProfile(data.user, displayName);
      }

      set({ isLoading: false });
      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
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

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        set({ error: error.message, isLoading: false });
        return { error };
      }

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
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

  // Create user profile after sign-up
  createUserProfile: async (user: User, displayName?: string) => {
    try {
      set({ isLoading: true });

      const profileData = {
        id: user.id,
        display_name: displayName || user.user_metadata?.display_name || user.email?.split('@')[0] || 'Member',
        avatar_url: user.user_metadata?.avatar_url || null,
        tier_id: 1, // Bronze tier by default
        points: 0,
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Profile creation error:', error);
        set({ isLoading: false });
        return null;
      }

      // Award welcome bonus points
      if (data) {
        await supabase.from('points_ledger').insert({
          user_id: user.id,
          delta: 100,
          reason: 'Welcome bonus',
          source: 'manual',
        });

        // Refresh profile to get updated points after a short delay
        setTimeout(() => get().refreshProfile(), 1000);
      }

      set({ profile: data, isLoading: false });
      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      set({ isLoading: false });
      return null;
    }
  },

  // Load all tiers
  loadTiers: async () => {
    try {
      const { data, error } = await supabase
        .from('tiers')
        .select('*')
        .order('min_points', { ascending: true });

      if (error) {
        console.error('Error loading tiers:', error);
        return;
      }

      set({ tiers: data || [] });
    } catch (error) {
      console.error('Error loading tiers:', error);
    }
  },

  // Get current tier based on points
  getCurrentTier: () => {
    const { profile, tiers } = get();
    if (!profile || !tiers.length) return null;

    // Find the highest tier that the user qualifies for
    return tiers
      .filter(tier => profile.points >= tier.min_points)
      .sort((a, b) => b.min_points - a.min_points)[0] || tiers[0];
  },

  // Get next tier
  getNextTier: () => {
    const { profile, tiers } = get();
    if (!profile || !tiers.length) return null;

    // Find the next tier above current points
    return tiers
      .filter(tier => profile.points < tier.min_points)
      .sort((a, b) => a.min_points - b.min_points)[0] || null;
  },

  // Get points needed to reach next tier
  getPointsToNextTier: () => {
    const { profile } = get();
    const nextTier = get().getNextTier();
    
    if (!profile || !nextTier) return 0;
    return Math.max(0, nextTier.min_points - profile.points);
  },

  // Generate member QR code
  generateMemberQRCode: async () => {
    try {
      const { user } = get();
      if (!user?.id) return { error: 'No user found' };

      const { data, error } = await supabase.rpc('fn_generate_member_qr_token', {
        p_user_id: user.id
      });

      if (error) {
        console.error('QR generation error:', error);
        return { error };
      }

      // Refresh profile to get updated QR data
      await get().refreshProfile();
      
      return { qr_data: data };
    } catch (error) {
      console.error('Error generating QR code:', error);
      return { error };
    }
  },

  // Clear error state
  clearError: () => set({ error: null }),
})); 