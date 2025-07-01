import { Header } from '@/components/ui/Header';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <Header
        showSearch={true}
        points={500}
        onSearchPress={() => console.log('Search pressed')}
      />
      
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>BROWSE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>MY VOUCHERS</Text>
        </TouchableOpacity>
      </View>
      
      {/* Filter Row */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Categories ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Brands ▼</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>FEATURED ITEMS</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Rewards catalog will appear here</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    paddingHorizontal: 20,
  },
  activeTab: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  inactiveTabText: {
    color: '#9CA3AF',
    fontWeight: '400',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  placeholder: {
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
}); 