import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProduct } from '@/api/products';
import { productsQueryKey } from './useProducts';
import type { Product } from '@/types/product';

export function useProduct(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProduct(id, signal),
    // Seed from the list cache so the details screen paints instantly,
    // then revalidates in the background. Falls back to a network fetch
    // if the product was opened via a deep link.
    initialData: () =>
      queryClient.getQueryData<Product[]>(productsQueryKey)?.find((product) => product.id === id),
  });
}
