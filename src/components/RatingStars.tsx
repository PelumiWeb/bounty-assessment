import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/theme';

interface RatingStarsProps {
  rate: number;
  count?: number;
  showCount?: boolean;
}

export function RatingStars({ rate, count, showCount = true }: RatingStarsProps) {
  const rounded = Math.round(rate * 2) / 2;

  return (
    <View style={styles.row} accessibilityLabel={`Rated ${rate} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const position = index + 1;
        const name: keyof typeof Ionicons.glyphMap =
          rounded >= position ? 'star' : rounded >= position - 0.5 ? 'star-half' : 'star-outline';
        return <Ionicons key={index} name={name} size={14} color={colors.star} />;
      })}
      {showCount && count !== undefined ? (
        <Text style={styles.count}>
          {rate.toFixed(1)} ({count})
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  count: { ...typography.caption, marginLeft: spacing.xs },
});
