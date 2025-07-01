# Artisan Membership App

A React Native membership and loyalty program app for multi-brand F&B groups, built with Expo and Supabase.

## Features

- **Membership Management**: User authentication with profile management
- **Points Dashboard**: Real-time points tracking with tier progression
- **Rewards Catalog**: Browse and redeem rewards by category
- **Promotions Feed**: View current promotions and events
- **Restaurant Locator**: Find nearby outlets with brand information
- **Premium UI**: Golden/bronze theme with card-based design

## Tech Stack

- **Frontend**: React Native 0.74 + Expo SDK 50
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: Zustand + React Query
- **Navigation**: Expo Router (file-based routing)
- **Styling**: Custom theme system with TypeScript
- **Authentication**: Supabase Auth with email/password

## Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account and project
- iOS Simulator/Android Emulator or physical device

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd MembershipAppV1
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup (Step 3 Implementation)

#### A. Run Database Migration

In your Supabase SQL Editor, execute the migration file:

```sql
-- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
```

This creates all necessary tables:
- `tiers` - Membership tiers (Bronze, Silver, Gold, Platinum)
- `profiles` - User profiles with tier and points
- `points_ledger` - Immutable transaction history
- `rewards` - Rewards catalog with categories
- `redemptions` - User redemption history
- `brands` - Restaurant brands
- `outlets` - Restaurant locations
- `promotions` - News and promotional content

#### B. Seed Sample Data

```sql
-- Copy and paste the contents of supabase/seed.sql
```

This populates the database with:
- 5 sample brands (Bar Luca, Bistecca, etc.)
- 6 sample outlets with locations
- 9 sample rewards across categories
- 7 sample promotions and events

#### C. Configure Storage Buckets

In Supabase Dashboard > Storage, create these buckets:
- `avatars` (private)
- `reward-images` (public read)
- `promo-images` (public read)

### 4. Run the Application

```bash
npx expo start
```

## Architecture Overview

### Database Schema

The app uses a comprehensive PostgreSQL schema with:

- **User Management**: Profiles linked to Supabase auth users
- **Points System**: Ledger-based accounting with automatic balance calculation
- **Rewards System**: Categorized rewards with atomic redemption
- **Multi-tenant Brands**: Support for multiple restaurant brands
- **Row-Level Security**: Comprehensive RLS policies for data protection

### State Management

- **Authentication**: Zustand store with Supabase integration
- **Data Fetching**: React Query hooks for server state
- **UI State**: Local component state with theme system

### Key Components

- `AuthWrapper`: Handles authentication state and profile setup
- `Header`: Dynamic header with user info and points display
- `RewardCard`: Product display cards for rewards
- `SectionHeader`: Consistent section headers with "SEE ALL" links

## Development Status

### ✅ Completed Steps

**Step 1: Foundation & Dependencies**
- Package dependencies and configuration
- Supabase client setup with secure storage
- Authentication and query providers
- Environment configuration

**Step 2: Design System & UI**
- Premium golden/bronze theme system
- Responsive UI components matching screenshots
- Tab navigation with 4 main screens
- Card-based layouts with proper spacing

**Step 3: Database Setup & Integration**
- Complete PostgreSQL schema implementation
- React Query hooks for data fetching
- Authentication wrapper with profile creation
- Real-time user data integration
- Sample data seeding

### 🔄 Next Steps

**Step 4: Authentication Flow**
- Login/signup screen implementation
- Email verification handling
- Password reset functionality
- Profile management

**Step 5: Core Features**
- Rewards redemption with QR codes
- Points transaction history
- Promotional content display
- Restaurant locator with maps

**Step 6: Advanced Features**
- Push notifications
- Offline support
- Performance optimization
- Testing implementation

## API Integration

The app includes comprehensive hooks for data operations:

### Data Hooks (`hooks/useData.ts`)

- `useRewards()` - Fetch all available rewards
- `useRewardsByCategory()` - Filter rewards by category
- `useBrands()` - Get restaurant brands
- `useOutlets()` - Restaurant locations
- `usePromotions()` - Active promotions and events
- `usePointsHistory()` - User transaction history
- `useRedemptions()` - User redemption history
- `useRedeemReward()` - Redeem rewards mutation
- `useAwardPoints()` - Award points mutation

### Database Functions

- `fn_redeem_reward()` - Atomic reward redemption with points deduction
- Automatic point calculation triggers
- Comprehensive RLS policies for security

## Testing

To test the implementation:

1. **Authentication**: Create a new account through the login screen
2. **Database**: Verify profile creation and sample data loading
3. **UI Components**: Navigate through all tabs and features
4. **Data Fetching**: Check that rewards, brands, and promotions load correctly

## Project Structure

```
MembershipAppV1/
├── app/                    # Expo Router screens
├── components/            # Reusable UI components
├── constants/            # Theme and configuration
├── hooks/               # Custom hooks and data fetching
├── lib/                # External service clients
├── providers/          # Context providers
├── store/             # Zustand state management
├── supabase/         # Database migrations and seeds
└── assets/          # Static assets
```

## Contributing

This is a 30-day MVP project following the PRD specifications in `/Docs/PRD.md`. Development follows the phased approach with weekly milestones.

## License

Private project for Artisan F&B Group.
