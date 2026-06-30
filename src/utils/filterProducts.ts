import type { Product } from '@/types/product';

export const ALL_CATEGORIES = 'all';

export interface ProductFilters {
  query: string;
  category: string;
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      filters.category === ALL_CATEGORIES || product.category === filters.category;
    const matchesQuery = query.length === 0 || product.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

export function getCategories(products: Product[]): string[] {
  const unique = Array.from(new Set(products.map((product) => product.category)));
  return [ALL_CATEGORIES, ...unique.sort()];
}
