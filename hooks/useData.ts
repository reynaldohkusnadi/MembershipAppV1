import { Database, supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Type definitions
type Reward = Database['public']['Tables']['rewards']['Row'];
type RewardWithCategory = Reward & {
  reward_categories: {
    code: string;
    label: string;
  };
};
type Brand = Database['public']['Tables']['brands']['Row'];
type Outlet = Database['public']['Tables']['outlets']['Row'] & {
  brands: Brand;
};
type Promotion = Database['public']['Tables']['promotions']['Row'] & {
  brands?: Brand | null;
};
type PointsLedgerEntry = Database['public']['Tables']['points_ledger']['Row'];
type Redemption = Database['public']['Tables']['redemptions']['Row'] & {
  rewards: Reward;
};

// Query keys
export const queryKeys = {
  rewards: ['rewards'] as const,
  rewardsByCategory: (category: string) => ['rewards', category] as const,
  brands: ['brands'] as const,
  outlets: ['outlets'] as const,
  outletsByBrand: (brandId: number) => ['outlets', brandId] as const,
  promotions: ['promotions'] as const,
  promotionsByType: (type: 'events' | 'promotions') => ['promotions', type] as const,
  pointsHistory: (userId: string) => ['points-history', userId] as const,
  redemptions: (userId: string) => ['redemptions', userId] as const,
  tiers: ['tiers'] as const,
};

// Rewards hooks
export function useRewards() {
  return useQuery({
    queryKey: queryKeys.rewards,
    queryFn: async (): Promise<RewardWithCategory[]> => {
      const { data, error } = await supabase
        .from('rewards')
        .select(`
          *,
          reward_categories(
            code,
            label
          )
        `)
        .eq('available', true)
        .order('cost', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useRewardsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.rewardsByCategory(category),
    queryFn: async (): Promise<RewardWithCategory[]> => {
      const { data, error } = await supabase
        .from('rewards')
        .select(`
          *,
          reward_categories(
            code,
            label
          )
        `)
        .eq('category_code', category)
        .eq('available', true)
        .order('cost', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}

// Brands hooks
export function useBrands() {
  return useQuery({
    queryKey: queryKeys.brands,
    queryFn: async (): Promise<Brand[]> => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
}

// Outlets hooks
export function useOutlets() {
  return useQuery({
    queryKey: queryKeys.outlets,
    queryFn: async (): Promise<Outlet[]> => {
      const { data, error } = await supabase
        .from('outlets')
        .select(`
          *,
          brands(*)
        `)
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
}

export function useOutletsByBrand(brandId: number) {
  return useQuery({
    queryKey: queryKeys.outletsByBrand(brandId),
    queryFn: async (): Promise<Outlet[]> => {
      const { data, error } = await supabase
        .from('outlets')
        .select(`
          *,
          brands(*)
        `)
        .eq('brand_id', brandId)
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
}

// Promotions hooks
export function usePromotions() {
  return useQuery({
    queryKey: queryKeys.promotions,
    queryFn: async (): Promise<Promotion[]> => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('promotions')
        .select(`
          *,
          brands(*)
        `)
        .lte('start_date', today)
        .gte('end_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

export function usePromotionsByType(type: 'events' | 'promotions') {
  return useQuery({
    queryKey: queryKeys.promotionsByType(type),
    queryFn: async (): Promise<Promotion[]> => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('promotions')
        .select(`
          *,
          brands(*)
        `)
        .lte('start_date', today)
        .gte('end_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

// Points history hook
export function usePointsHistory() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: queryKeys.pointsHistory(user?.id || ''),
    queryFn: async (): Promise<PointsLedgerEntry[]> => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('points_ledger')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}

// Redemptions hook
export function useRedemptions() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: queryKeys.redemptions(user?.id || ''),
    queryFn: async (): Promise<Redemption[]> => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('redemptions')
        .select(`
          *,
          rewards(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}

// Tiers hook
export function useTiers() {
  return useQuery({
    queryKey: queryKeys.tiers,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tiers')
        .select('*')
        .order('min_points');

      if (error) throw error;
      return data || [];
    },
  });
}

// Redemption mutation
export function useRedeemReward() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (rewardId: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .rpc('fn_redeem_reward', {
          p_user: user.id,
          p_reward: rewardId,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.redemptions(user.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.pointsHistory(user.id) });
      }
      // Refresh user profile to update points
      useAuthStore.getState().refreshProfile();
    },
  });
}

// Points award mutation (for admin/POS integration)
export function useAwardPoints() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async ({ 
      points, 
      reason, 
      source = 'manual' 
    }: { 
      points: number; 
      reason: string; 
      source?: 'purchase' | 'manual' | 'referral' | 'promo';
    }) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('points_ledger')
        .insert({
          user_id: user.id,
          delta: points,
          reason,
          source,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pointsHistory(user.id) });
      }
      // Refresh user profile to update points
      useAuthStore.getState().refreshProfile();
    },
  });
} 