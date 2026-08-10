/** Local image paths — all assets live in /public/images/ */

export const images = {
  hero: "/images/placeholders/hero-landing.png",
  store: "/images/placeholders/storefront.png",

  categories: {
    "floral-bouquets": "/images/placeholders/bouquets-1.png",
    "floral-chocolate-bouquets": "/images/placeholders/chocolate-bouquet.png",
    "floral-boxes": "/images/placeholders/floral-box.png",
    "floral-chocolate-boxes": "/images/placeholders/chocolate-box.png",
    baskets: "/images/placeholders/gift-basket.png",
    "money-bouquets": "/images/placeholders/money-bouquet.png",
    "crochet-flowers": "/images/placeholders/crochet-flowers.png",
    wedding: "/images/placeholders/wedding.png",
  },

  products: {
    bouquets1: "/images/placeholders/bouquets-1.png",
    bouquets2: "/images/placeholders/bouquets-2.png",
    whiteBouquet: "/images/placeholders/white-bouquet.png",
    sunflowers: "/images/placeholders/sunflowers.png",
    chocolateBouquet: "/images/placeholders/chocolate-bouquet.png",
    floralBox: "/images/placeholders/floral-box.png",
    chocolateBox: "/images/placeholders/chocolate-box.png",
    giftBasket: "/images/placeholders/gift-basket.png",
    moneyBouquet: "/images/placeholders/money-bouquet.png",
    crochet: "/images/placeholders/crochet-flowers.png",
    wedding: "/images/placeholders/wedding.png",
    bridal: "/images/placeholders/wedding.png",
    jewellery: "/images/placeholders/floral-jewellery.png",
    garland: "/images/placeholders/wedding.png",
    carDecor: "/images/placeholders/wedding.png",
    roomDecor: "/images/placeholders/wedding.png",
  },

  gallery: [
    "/images/placeholders/bouquets-1.png",
    "/images/placeholders/bouquets-2.png",
    "/images/placeholders/floral-box.png",
    "/images/placeholders/wedding.png",
    "/images/placeholders/sunflowers.png",
    "/images/placeholders/chocolate-box.png",
  ],
} as const;

export function categoryImage(slug: keyof typeof images.categories): string {
  return images.categories[slug];
}
