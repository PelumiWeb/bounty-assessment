import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProduct } from '@/hooks/useProduct';
import { RatingStars } from '@/components/RatingStars';
import { LoadingState, ErrorState } from '@/components/states';
import { formatPrice } from '@/utils/format';
import { colors, radius, spacing, typography } from '@/theme';
import type { ProductDetailsProps } from '@/navigation/types';

export function ProductDetailsScreen({ route }: ProductDetailsProps) {
  const { productId } = route.params;
  const insets = useSafeAreaInsets();
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  if (isLoading) return <LoadingState label="Loading product…" />;

  if (isError || !product) {
    return (
      <ErrorState message={error instanceof Error ? error.message : undefined} onRetry={refetch} />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.categoryChip}>
        <Text style={styles.categoryText}>{product.category}</Text>
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <RatingStars rate={product.rating.rate} count={product.rating.count} />
      </View>

      <Text style={styles.sectionLabel}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  imageWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  image: { width: '100%', height: 260 },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  categoryText: { ...typography.caption, color: colors.primary, textTransform: 'capitalize' },
  title: { ...typography.title },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: { ...typography.title, color: colors.primary },
  sectionLabel: { ...typography.caption, textTransform: 'uppercase', letterSpacing: 0.6 },
  description: { ...typography.body, lineHeight: 22, color: colors.textMuted },
});
