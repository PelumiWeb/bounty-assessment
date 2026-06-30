export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function truncate(text: string, max = 100): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
