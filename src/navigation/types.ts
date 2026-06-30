import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: number; title: string };
};

export type ProductListProps = NativeStackScreenProps<RootStackParamList, 'ProductList'>;
export type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

// Gives useNavigation() full type-safety app-wide.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
