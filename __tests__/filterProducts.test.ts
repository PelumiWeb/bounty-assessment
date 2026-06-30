import { filterProducts, getCategories, ALL_CATEGORIES } from '@/utils/filterProducts';
import type { Product } from '@/types/product';

const makeProduct = (overrides: Partial<Product>): Product => ({
  id: 1,
  title: 'Sample',
  price: 10,
  description: 'desc',
  category: 'electronics',
  image: '',
  rating: { rate: 4, count: 10 },
  ...overrides,
});

const products: Product[] = [
  makeProduct({ id: 1, title: 'Mens Cotton Jacket', category: "men's clothing" }),
  makeProduct({ id: 2, title: 'Wireless Headphones', category: 'electronics' }),
  makeProduct({ id: 3, title: 'Gold Bracelet', category: 'jewelery' }),
  makeProduct({ id: 4, title: 'Mens Casual Shirt', category: "men's clothing" }),
];

describe('filterProducts', () => {
  it('returns every product when nothing is filtered', () => {
    expect(filterProducts(products, { query: '', category: ALL_CATEGORIES })).toHaveLength(4);
  });

  it('matches titles case-insensitively', () => {
    const result = filterProducts(products, { query: 'mens', category: ALL_CATEGORIES });
    expect(result.map((p) => p.id)).toEqual([1, 4]);
  });

  it('filters by category', () => {
    const result = filterProducts(products, { query: '', category: 'electronics' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('combines query and category', () => {
    const result = filterProducts(products, { query: 'shirt', category: "men's clothing" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(4);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterProducts(products, { query: 'laptop', category: ALL_CATEGORIES })).toEqual([]);
  });

  it('ignores surrounding whitespace in the query', () => {
    expect(filterProducts(products, { query: '   gold ', category: ALL_CATEGORIES })).toHaveLength(
      1,
    );
  });
});

describe('getCategories', () => {
  it('prepends the "all" sentinel and de-duplicates', () => {
    const categories = getCategories(products);
    expect(categories[0]).toBe(ALL_CATEGORIES);
    expect(categories).toContain('electronics');
    expect(categories).toContain("men's clothing");
    expect(new Set(categories).size).toBe(categories.length);
  });
});
