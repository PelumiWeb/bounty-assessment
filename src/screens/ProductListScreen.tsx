import { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ErrorState, EmptyState, ListSkeleton } from '@/components/states';
import { ALL_CATEGORIES, filterProducts, getCategories } from '@/utils/filterProducts';
import { colors, spacing } from '@/theme';
import type { Product } from '@/types/product';
import type { ProductListProps } from '@/navigation/types';

const PAGE_SIZE = 8;

export function ProductListScreen({ navigation }: ProductListProps) {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError, error, refetch, isRefetching } = useProducts();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const products = data ?? [];
  const categories = useMemo(() => getCategories(products), [products]);
  const filtered = useMemo(
    () => filterProducts(products, { query, category }),
    [products, query, category],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    if (hasMore) setVisibleCount((count) => count + PAGE_SIZE);
  };

  const openDetails = (product: Product) =>
    navigation.navigate('ProductDetails', { productId: product.id, title: product.title });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar value={query} onChangeText={setQuery} />
        {categories.length > 1 ? (
          <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        ) : null}
      </View>

      {isLoading ? (
        <ListSkeleton />
      ) : isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : undefined}
          onRetry={refetch}
        />
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard product={item} onPress={openDetails} />}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + spacing.xl },
            filtered.length === 0 && styles.listEmpty,
          ]}
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={
            hasMore ? (
              <ActivityIndicator
                color={colors.primary}
                style={styles.footerLoader}
              />
            ) : null
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
  listEmpty: { flexGrow: 1 },
  footerLoader: { paddingVertical: spacing.lg },
});
