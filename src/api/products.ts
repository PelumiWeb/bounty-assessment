import { apiGet } from './client';
import type { Product } from '@/types/product';

export function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return apiGet<Product[]>('/products', signal);
}

export function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  return apiGet<Product>(`/products/${id}`, signal);
}
