export function getDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-PK");
}

export function getDiscountBadge(discountPercentage: number): string {
  return `${discountPercentage}% OFF`;
}
