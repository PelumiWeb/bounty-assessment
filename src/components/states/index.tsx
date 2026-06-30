import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/theme';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.muted}>{label}</Text>
    </View>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.centered}>
      <Ionicons name="cloud-offline-outline" size={40} color={colors.textMuted} />
      <Text style={styles.heading}>Something went wrong</Text>
      <Text style={styles.muted}>{message ?? 'We could not load the catalogue.'}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonLabel}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ title = 'No products found', message }: EmptyStateProps) {
  return (
    <View style={styles.centered}>
      <Ionicons name="search-outline" size={40} color={colors.textMuted} />
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.muted}>{message ?? 'Try a different search or category.'}</Text>
    </View>
  );
}

export function ListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <View style={styles.skeletonWrap}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonLines}>
            <View style={[styles.skeletonLine, { width: '40%' }]} />
            <View style={[styles.skeletonLine, { width: '90%' }]} />
            <View style={[styles.skeletonLine, { width: '65%' }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  heading: { ...typography.heading, textAlign: 'center' },
  muted: { ...typography.bodyMuted, textAlign: 'center' },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  buttonLabel: { ...typography.body, color: colors.surface, fontWeight: '600' },
  skeletonWrap: { padding: spacing.lg, gap: spacing.md },
  skeletonCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  skeletonImage: {
    width: 84,
    height: 84,
    borderRadius: radius.md,
    backgroundColor: colors.skeleton,
  },
  skeletonLines: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  skeletonLine: { height: 12, borderRadius: radius.sm, backgroundColor: colors.skeleton },
});
