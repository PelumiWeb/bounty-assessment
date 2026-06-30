import { render, screen, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types/product';

const product: Product = {
  id: 7,
  title: 'Wireless Headphones',
  price: 59.99,
  description: 'Noise cancelling over-ear headphones with long battery life.',
  category: 'electronics',
  image: 'https://example.com/headphones.png',
  rating: { rate: 4.5, count: 120 },
};

describe('ProductCard', () => {
  it('renders the title, formatted price and category', () => {
    render(<ProductCard product={product} onPress={() => {}} />);

    expect(screen.getByText('Wireless Headphones')).toBeOnTheScreen();
    expect(screen.getByText('$59.99')).toBeOnTheScreen();
    expect(screen.getByText('electronics')).toBeOnTheScreen();
  });

  it('calls onPress with the product when tapped', () => {
    const onPress = jest.fn();
    render(<ProductCard product={product} onPress={onPress} />);

    fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(product);
  });
});
