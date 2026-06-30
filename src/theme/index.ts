import type { TextStyle } from 'react-native';

export const colors = {
  background: '#F4F5F7',
  surface: '#FFFFFF',
  text: '#14161B',
  textMuted: '#6B7280',
  border: '#E6E8EC',
  primary: '#15616D',
  primarySoft: '#E2EFF0',
  star: '#F59E0B',
  danger: '#B42318',
  skeleton: '#E9EBEF',
  overlay: 'rgba(20, 22, 27, 0.04)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 22, fontWeight: '700', color: colors.text, letterSpacing: -0.2 },
  heading: { fontSize: 17, fontWeight: '600', color: colors.text },
  body: { fontSize: 15, fontWeight: '400', color: colors.text },
  bodyMuted: { fontSize: 14, fontWeight: '400', color: colors.textMuted },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textMuted },
  price: { fontSize: 18, fontWeight: '700', color: colors.text },
} satisfies Record<string, TextStyle>;

export type AppColors = typeof colors;
