import bouquetTopSlugs from "../../scripts/bouquet-top-slugs.json";

const TOP_SLUGS = bouquetTopSlugs as readonly string[];

export function sortBouquetsForDisplay<T extends { slug: string; price: number; name: string }>(
  items: T[]
): T[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const top: T[] = [];
  for (const slug of TOP_SLUGS) {
    const item = bySlug.get(slug);
    if (item) top.push(item);
  }
  const topSet = new Set<string>(TOP_SLUGS);
  const rest = items.filter((item) => !topSet.has(item.slug));
  rest.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
  return [...top, ...rest];
}
