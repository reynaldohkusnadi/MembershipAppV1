import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export function HelloWave() {
  // Simple version for Expo Go - no animations
  return (
    <ThemedView>
      <ThemedText style={styles.text}>👋</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
