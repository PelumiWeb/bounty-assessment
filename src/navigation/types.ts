import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: number; title: string };
};

export type ProductListProps = NativeStackScreenProps<RootStackParamList, 'ProductList'>;
export type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
