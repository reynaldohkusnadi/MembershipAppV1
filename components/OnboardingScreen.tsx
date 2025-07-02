import { theme } from '@/constants/Theme';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: 'Welcome to Artisan',
    subtitle: 'Your Premium Membership Experience',
    description: 'Discover exclusive dining experiences, earn points with every visit, and unlock amazing rewards across our partner restaurants.',
    icon: '🏆',
    color: theme.colors.primary,
  },
  {
    id: 'points',
    title: 'Earn Points',
    subtitle: 'Every Purchase Counts',
    description: 'Earn points with every transaction at our partner restaurants. The more you dine, the more you earn.',
    icon: '💎',
    color: theme.colors.accent,
  },
  {
    id: 'tiers',
    title: 'Tier Benefits',
    subtitle: 'Bronze → Silver → Gold → Platinum',
    description: 'Progress through our membership tiers to unlock exclusive perks, discounts, and premium experiences.',
    icon: '⭐',
    color: theme.colors.brand.gold,
  },
  {
    id: 'rewards',
    title: 'Amazing Rewards',
    subtitle: 'Redeem Your Points',
    description: 'Use your points to get discounts, free items, and exclusive dining experiences at your favorite restaurants.',
    icon: '🎁',
    color: theme.colors.success,
  },
  {
    id: 'ready',
    title: 'You\'re All Set!',
    subtitle: 'Start Your Journey',
    description: 'Welcome bonus: 100 points have been added to your account. Start exploring and earning more points today!',
    icon: '🚀',
    color: theme.colors.primary,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentSlide = onboardingSlides[currentIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      {/* Skip Button */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
      }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={{
            fontSize: 16,
            color: theme.colors.gray[600],
            fontWeight: '500',
          }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {onboardingSlides.map((slide, index) => (
          <View
            key={slide.id}
            style={{
              width: screenWidth,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 40,
            }}
          >
            {/* Icon */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: `${slide.color}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
            }}>
              <Text style={{ fontSize: 60 }}>
                {slide.icon}
              </Text>
            </View>

            {/* Content */}
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: theme.colors.gray[900],
              textAlign: 'center',
              marginBottom: 12,
            }}>
              {slide.title}
            </Text>

            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: slide.color,
              textAlign: 'center',
              marginBottom: 20,
            }}>
              {slide.subtitle}
            </Text>

            <Text style={{
              fontSize: 16,
              color: theme.colors.gray[600],
              textAlign: 'center',
              lineHeight: 24,
              paddingHorizontal: 20,
            }}>
              {slide.description}
            </Text>

            {/* Tier Visual for Tier Slide */}
            {slide.id === 'tiers' && (
              <View style={{
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              }}>
                {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, tierIndex) => (
                  <View key={tier} style={{ alignItems: 'center', marginHorizontal: 8 }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: tierIndex === 0 ? theme.colors.primary : theme.colors.gray[300],
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                      <Text style={{
                        color: tierIndex === 0 ? theme.colors.white : theme.colors.gray[600],
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                        {tier.charAt(0)}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: 10,
                      color: tierIndex === 0 ? theme.colors.primary : theme.colors.gray[500],
                      fontWeight: tierIndex === 0 ? '600' : 'normal',
                    }}>
                      {tier}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={{
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
      }}>
        {/* Pagination Dots */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
          {onboardingSlides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === currentIndex ? currentSlide.color : theme.colors.gray[300],
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => currentIndex > 0 && goToSlide(currentIndex - 1)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              opacity: currentIndex === 0 ? 0 : 1,
            }}
            disabled={currentIndex === 0}
          >
            <Text style={{
              fontSize: 16,
              color: theme.colors.gray[600],
              fontWeight: '500',
            }}>
              Back
            </Text>
          </TouchableOpacity>

          {/* Next/Get Started Button */}
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: currentSlide.color,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 25,
              minWidth: 140,
              alignItems: 'center',
            }}
          >
            <Text style={{
              color: theme.colors.white,
              fontSize: 16,
              fontWeight: '600',
            }}>
              {currentIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 