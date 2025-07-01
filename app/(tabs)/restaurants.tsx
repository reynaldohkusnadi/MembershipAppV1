import { Header } from '@/components/ui/Header';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Mock brand data
const mockBrands = [
  {
    id: '1',
    name: 'BAR LUCA',
    imageUrl: 'https://picsum.photos/400/200?random=10',
  },
  {
    id: '2',
    name: 'BISTECCA',
    imageUrl: 'https://picsum.photos/400/200?random=11',
  },
  {
    id: '3',
    name: 'BISTECCA + CAFFÈ MILANO',
    imageUrl: 'https://picsum.photos/400/200?random=12',
  },
  {
    id: '4',
    name: 'BOUCHON',
    imageUrl: 'https://picsum.photos/400/200?random=13',
  },
];

export default function RestaurantsScreen() {
  return (
    <View style={styles.container}>
      <Header title="BRANDS" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockBrands.map((brand) => (
          <View key={brand.id} style={styles.brandCard}>
            <Image
              source={{ uri: brand.imageUrl }}
              style={styles.brandImage}
              resizeMode="cover"
            />
            <View style={styles.brandOverlay}>
              <Text style={styles.brandName}>{brand.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  brandCard: {
    height: 200,
    marginBottom: 2,
    position: 'relative',
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
}); 