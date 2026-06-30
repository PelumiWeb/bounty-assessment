import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProduct } from '@/api/products';
import { productsQueryKey } from './useProducts';
import type { Product } from '@/types/product';

export function useProduct(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProduct(id, signal),
    initialData: () =>
      queryClient.getQueryData<Product[]>(productsQueryKey)?.find((product) => product.id === id),
  });
}
