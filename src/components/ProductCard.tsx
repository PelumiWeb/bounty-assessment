import { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Product } from '@/types/product';
import { colors, radius, spacing, typography } from '@/theme';
import { formatPrice, truncate } from '@/utils/format';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

function ProductCardComponent({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, ${formatPrice(product.price)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.body}>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText} numberOfLines={1}>
            {product.category}
          </Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {truncate(product.description, 90)}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <RatingStars rate={product.rating.rate} count={product.rating.count} showCount={false} />
        </View>
      </View>
    </Pressable>
  );
}

// Memoised: list rows only re-render when their product reference changes.
export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.995 }] },
  image: {
    width: 84,
    height: 84,
    borderRadius: radius.md,
    backgroundColor: colors.overlay,
  },
  body: { flex: 1, gap: spacing.xs },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  categoryText: { ...typography.caption, color: colors.primary, textTransform: 'capitalize' },
  title: { ...typography.heading },
  description: { ...typography.bodyMuted },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  price: { ...typography.price },
});
