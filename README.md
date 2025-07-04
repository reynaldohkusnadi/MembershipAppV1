# Artisan Membership App

A React Native membership app built with Expo for the Artisan F&B Group, featuring loyalty points, rewards redemption, and seamless POS integration.

## ✨ Features

### Core Features
- **Multi-brand loyalty program** - Unified points across all Artisan restaurants
- **Smart rewards catalog** - Browse and redeem rewards with QR vouchers
- **Real-time promotions** - Stay updated with latest news and offers
- **Restaurant discovery** - Find nearby outlets with maps integration
- **Tier-based benefits** - Bronze, Silver, Gold, and Platinum membership levels

### New: Member QR Code Integration 🆕
- **Instant member identification** - Secure QR code for POS systems
- **Automatic point accrual** - Staff scans QR code to add points to your account
- **Enhanced security** - Regeneratable QR codes with unique tokens
- **Real-time validation** - POS systems can validate member status instantly

### Authentication & Profiles
- **Secure authentication** - Email/password and Google OAuth
- **Profile management** - Update display name and view membership status
- **Welcome bonuses** - 100 points for new members
- **Real-time point tracking** - Live balance updates across all screens

## 🛠 Tech Stack

- **Frontend**: React Native 0.79, Expo 53
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **State Management**: Zustand + React Query
- **Navigation**: Expo Router with tabs
- **UI/UX**: Custom design system with theme support
- **QR Generation**: react-native-qrcode-svg
- **Maps**: React Native Maps + Expo Location

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Studio (for development)
- Supabase account (for production deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MembershipAppV1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env.local
   
   # Edit .env.local with your Supabase credentials
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

5. **Open the app**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📊 Database Setup

The app uses Supabase with the following schema:

### Core Tables
- `profiles` - User profiles with points and QR codes
- `tiers` - Membership tiers (Bronze, Silver, Gold, Platinum)
- `points_ledger` - Transaction history and point tracking
- `rewards` - Reward catalog with categories
- `redemptions` - Redeemed rewards with QR vouchers

### New: QR Code Tables
- `profiles.member_qr_token` - Secure token for POS validation
- `profiles.qr_code_data` - JSON data embedded in QR code
- `profiles.qr_code_updated_at` - Last regeneration timestamp

### Key Functions
- `fn_redeem_reward()` - Atomic reward redemption with point deduction
- `fn_generate_member_qr_token()` - Generate secure member QR codes
- `fn_validate_member_qr_token()` - POS validation of QR tokens

To set up the database:

1. **Apply migrations**
   ```bash
   npx supabase db push
   ```

2. **Seed sample data**
   ```bash
   npx supabase db seed
   ```

## 🎯 POS Integration

### QR Code Workflow

1. **Member Shows QR Code**
   - Member opens profile screen
   - Displays generated QR code to cashier
   
2. **POS Scans QR Code**
   - QR code contains: `{"member_id":"uuid","token":"xxx","issued_at":"date","type":"member_scan"}`
   - POS calls validation API with token
   
3. **Validation & Points**
   - System validates token using `fn_validate_member_qr_token()`
   - Returns member details and tier status
   - POS can award points based on purchase amount

### API Endpoints for POS

```typescript
// Validate member QR token
const { data } = await supabase.rpc('fn_validate_member_qr_token', {
  p_qr_token: 'scanned_token_here'
});

// Award points after purchase
const { data } = await supabase.from('points_ledger').insert({
  user_id: member_id,
  delta: points_to_award,
  reason: 'Purchase at outlet',
  source: 'purchase'
});
```

## 🏗 Architecture

### State Management
- **Auth Store** (Zustand) - User authentication and profile data
- **React Query** - Server state management and caching
- **Local State** - Component-level state with React hooks

### Security Features
- **Row Level Security** - Supabase RLS policies
- **Secure Token Storage** - Expo SecureStore for auth tokens
- **QR Token Rotation** - Regeneratable member QR codes
- **Input Validation** - Zod schemas for type safety

### Component Structure
```
components/
├── ui/                     # Reusable UI components
│   ├── Header.tsx         # App header with user info
│   ├── RewardCard.tsx     # Reward display component
│   ├── MemberQRCode.tsx   # QR code component
│   └── ...
├── AuthWrapper.tsx        # Authentication flow
├── ProfileScreen.tsx      # User profile management
├── RedemptionModal.tsx    # Reward redemption flow
└── ...
```

## 🧪 Testing

### Manual Testing Checklist

#### Authentication Flow
- [ ] Sign up with email/password
- [ ] Sign in with existing account
- [ ] Google OAuth integration
- [ ] Profile creation with welcome bonus

#### QR Code Features
- [ ] QR code generation on profile screen
- [ ] QR code regeneration functionality
- [ ] QR code displays member info correctly
- [ ] POS validation API returns correct data

#### Rewards & Points
- [ ] Browse rewards catalog by category
- [ ] Redeem rewards with sufficient points
- [ ] QR voucher generation after redemption
- [ ] Points deduction after redemption
- [ ] Redemption history tracking

#### Navigation & UI
- [ ] Tab navigation between screens
- [ ] Loading states during API calls
- [ ] Error handling and user feedback
- [ ] Responsive design on different screen sizes

## 📱 Development Progress

### ✅ Completed Features

#### Step 1-4: Foundation ✅
- [x] Project setup with Expo and TypeScript
- [x] Design system and theme configuration
- [x] Database schema and Supabase integration
- [x] Authentication with email/Google OAuth

#### Step 5: Core Features ✅
- [x] Home screen with live data integration
- [x] Rewards catalog with category filtering
- [x] News/promotions feed with real content
- [x] Restaurant discovery with brands data
- [x] Reward redemption flow with QR vouchers

#### Step 6: Member QR Codes ✅ (New!)
- [x] Secure QR code generation for member identification
- [x] Database schema for QR token storage
- [x] POS validation API for member lookup
- [x] QR code regeneration functionality
- [x] Profile integration with QR display

### 🚧 Next Steps

#### Step 7: Advanced Features
- [ ] Push notifications for promotions
- [ ] Location-based outlet recommendations  
- [ ] Social sharing of achievements
- [ ] Referral program implementation

#### Step 8: POS Integration
- [ ] Real-time point accrual from POS systems
- [ ] Transaction history from EBS.id integration
- [ ] Receipt scanning for manual point addition
- [ ] Staff dashboard for manual point adjustments

#### Step 9: Analytics & Optimization
- [ ] User behavior tracking with Mixpanel
- [ ] Performance monitoring and optimization
- [ ] A/B testing for conversion improvement
- [ ] Offline support for key features

### 🚀 Production Deployment

#### Mobile App Stores
- [ ] iOS App Store submission
- [ ] Google Play Store submission  
- [ ] App icon and screenshots optimization
- [ ] Store listing and ASO optimization

#### Backend Infrastructure
- [ ] Supabase production setup
- [ ] Environment configuration
- [ ] Database backup and monitoring
- [ ] API rate limiting and security

## 🔧 Configuration

### Environment Variables
```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Analytics (Optional)
EXPO_PUBLIC_MIXPANEL_TOKEN=your-mixpanel-token

# POS Integration (Optional)
EXPO_PUBLIC_EBS_API_URL=https://api.ebs.id
```

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "Artisan Membership",
    "slug": "artisan-membership",
    "version": "1.0.0",
    "scheme": "artisan-membership",
    "platforms": ["ios", "android"],
    "permissions": [
      "CAMERA", 
      "LOCATION"
    ]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software developed for the Artisan F&B Group.

## 📞 Support

For technical support or questions:
- Email: dev@artisangroup.com
- Documentation: [Internal Wiki](link-to-wiki)
- Issue Tracker: GitHub Issues
