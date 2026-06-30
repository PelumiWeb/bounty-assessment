import type { Product } from '@/types/product';

export const ALL_CATEGORIES = 'all';

export interface ProductFilters {
  query: string;
  category: string;
}

/**
 * Pure, side-effect-free filtering so it is trivially unit-testable and can run
 * inside a useMemo without re-fetching. Search matches the title only, per spec.
 */
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      filters.category === ALL_CATEGORIES || product.category === filters.category;
    const matchesQuery = query.length === 0 || product.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

/** Derives the category tab list from the loaded products (single source of truth). */
export function getCategories(products: Product[]): string[] {
  const unique = Array.from(new Set(products.map((product) => product.category)));
  return [ALL_CATEGORIES, ...unique.sort()];
}
