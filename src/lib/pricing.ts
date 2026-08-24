export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-PK");
}

export function hasDiscount(item: {
  originalPrice?: number;
  discountPercentage?: number;
}): boolean {
  return (
    item.discountPercentage != null &&
    item.discountPercentage > 0 &&
    item.originalPrice != null &&
    item.originalPrice > 0
  );
}

/** Primary selling price — always use `price` on catalog items. */
export function getSellingPrice(item: { price: number }): number {
  return item.price;
}

/** @deprecated Legacy product model — prefer catalog `price` field. */
export function getDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
}

/** @deprecated Legacy product model */
export function getLegacySellingPrice(product: {
  originalPrice: number;
  discountPercentage: number;
}): number {
  return getDiscountedPrice(product.originalPrice, product.discountPercentage);
}

export function getDiscountBadge(discountPercentage: number): string {
  return `${discountPercentage}% OFF`;
}
