import { Header } from '@/components/ui/Header';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <Header title="WHAT'S ON" />
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>EVENTS</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Events will appear here</Text>
        </View>
        
        <Text style={styles.sectionTitle}>PROMOTIONS</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Promotions will appear here</Text>
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
    marginBottom: 20,
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
}); 