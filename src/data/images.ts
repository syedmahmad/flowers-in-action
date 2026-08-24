/** Local image paths — all assets live in /public/images/ */

export const images = {
  hero: "/images/placeholders/hero-landing.png",
  store: "/images/shopPhotos/web/storefront.jpg",

  categories: {
    "floral-bouquets": "/images/bouquets/web/crimson-love.jpg",
    "floral-chocolate-bouquets": "/images/bouquets/web/premium-blush-wrap.jpg",
    "floral-boxes": "/images/bouquets/web/peach-serenity.jpg",
    "floral-chocolate-boxes": "/images/bouquets/web/premium-blush-wrap.jpg",
    baskets: "/images/bouquets/web/blush-romance.jpg",
    "money-bouquets": "/images/bouquets/web/premium-blush-wrap.jpg",
    "crochet-flowers": "/images/bouquets/web/peach-serenity.jpg",
    wedding: "/images/events/web/mehndi-and-haldi-decor.jpg",
  },

  products: {
    bouquets1: "/images/bouquets/web/crimson-love.jpg",
    bouquets2: "/images/bouquets/web/blush-romance.jpg",
    whiteBouquet: "/images/bouquets/web/white-rose-classic.jpg",
    sunflowers: "/images/bouquets/web/sunflower-bouquet.jpg",
    chocolateBouquet: "/images/bouquets/web/premium-blush-wrap.jpg",
    floralBox: "/images/bouquets/web/peach-serenity.jpg",
    chocolateBox: "/images/bouquets/web/premium-blush-wrap.jpg",
    giftBasket: "/images/bouquets/web/blush-romance.jpg",
    moneyBouquet: "/images/bouquets/web/premium-blush-wrap.jpg",
    crochet: "/images/bouquets/web/peach-serenity.jpg",
    wedding: "/images/events/web/safari-kids-birthday.jpg",
    bridal: "/images/events/web/mehndi-and-haldi-decor.jpg",
    jewellery: "/images/events/web/mehndi-and-haldi-decor.jpg",
    garland: "/images/events/web/mehndi-and-haldi-decor.jpg",
    carDecor: "/images/events/web/grand-opening-decor.jpg",
    roomDecor: "/images/events/web/princess-baby-celebration.jpg",
  },

  gallery: [
    "/images/bouquets/web/blush-romance.jpg",
    "/images/bouquets/web/crimson-love.jpg",
    "/images/bouquets/web/sunflower-bouquet.jpg",
    "/images/events/web/safari-kids-birthday.jpg",
    "/images/events/web/mehndi-and-haldi-decor.jpg",
    "/images/shopPhotos/web/storefront.jpg",
  ],
} as const;

export function categoryImage(slug: keyof typeof images.categories): string {
  return images.categories[slug];
}
