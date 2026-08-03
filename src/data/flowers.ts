import type { FlowerType, WeddingType } from "@/types/product";

export const flowerTypes: { slug: FlowerType; label: string; intro: string }[] =
  [
    {
      slug: "roses",
      label: "Roses",
      intro:
        "Classic, expressive and timeless, roses are suitable for love, anniversaries, birthdays, apologies and celebrations. Choose red, pink, white or mixed arrangements.",
    },
    {
      slug: "sunflowers",
      label: "Sunflowers",
      intro:
        "Bright sunflowers bring warmth, optimism and energy to birthdays, congratulations, get-well wishes and cheerful everyday surprises.",
    },
    {
      slug: "chrysanthemums",
      label: "Chrysanthemums",
      intro:
        "Full, textured chrysanthemums add colour and volume to bouquets, boxes and baskets, making them a versatile choice for joyful and elegant designs.",
    },
    {
      slug: "lilies",
      label: "Lilies",
      intro:
        "Graceful lilies create a refined and fragrant presentation for anniversaries, congratulations, formal gifting and sophisticated floral arrangements.",
    },
    {
      slug: "babys-breath",
      label: "Baby's Breath",
      intro:
        "Delicate baby's breath adds softness, movement and romance to bouquets. It works beautifully on its own or paired with roses, lilies and seasonal blooms.",
    },
  ];

export const weddingTypes: {
  slug: WeddingType;
  label: string;
  intro: string;
}[] = [
  {
    slug: "floral-jewellery",
    label: "Floral Jewellery",
    intro:
      "Custom floral jewellery for brides, bridesmaids, mayun, mehndi and intimate wedding celebrations. Request coordinated earrings, necklaces, bracelets, rings, gajras and hair accessories.",
  },
  {
    slug: "bridal-bouquets",
    label: "Bridal Bouquets",
    intro:
      "Handcrafted bridal bouquets designed around the bride's dress, wedding colours, venue and preferred flower style.",
  },
  {
    slug: "groom-garlands",
    label: "Groom Garlands",
    intro:
      "Fresh groom garlands and traditional haar designs created with carefully selected flowers for barat, nikkah, mehndi and reception events.",
  },
  {
    slug: "car-decoration",
    label: "Car Decoration",
    intro:
      "Elegant wedding-car floral décor customised according to the vehicle, event colours and preferred coverage.",
  },
  {
    slug: "room-decoration",
    label: "Room Decoration",
    intro:
      "Romantic room décor using flowers, petals, candles, balloons and personalised details, planned according to the space and selected budget.",
  },
];

export const featuredCollections = [
  { slug: "under-5000", label: "Under PKR 5,000" },
  { slug: "romantic-favourites", label: "Romantic Favourites" },
  { slug: "birthday-bestsellers", label: "Birthday Bestsellers" },
  { slug: "wedding-essentials", label: "Wedding Essentials" },
  { slug: "chocolate-flower-gifts", label: "Chocolate & Flower Gifts" },
  { slug: "same-day-favourites", label: "Same-Day Favourites" },
  { slug: "personalised-gifts", label: "Personalised Gifts" },
  { slug: "seasonal-flowers", label: "Seasonal Flowers" },
] as const;
