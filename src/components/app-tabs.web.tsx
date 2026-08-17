import { StyleSheet, View, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content} />
      <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
        <Link href="/" asChild>
          <Pressable style={styles.tab}>
            <ThemedText>Home</ThemedText>
          </Pressable>
        </Link>
        <Link href="/explore" asChild>
          <Pressable style={styles.tab}>
            <ThemedText>Explore</ThemedText>
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
