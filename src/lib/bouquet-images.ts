import type { Bouquet } from "@/types/catalog";

export function getBouquetImages(bouquet: Bouquet): string[] {
  return [bouquet.image, ...(bouquet.gallery ?? [])];
}

export function bouquetHasGallery(bouquet: Bouquet): boolean {
  return (bouquet.gallery?.length ?? 0) > 0;
}
