import type { FlowerType, WeddingType } from "@/types/product";

export const flowerTypes: { slug: FlowerType; label: string; intro: string }[] =
  [
    {
      slug: "roses",
      label: "Roses",
      intro:
        "Classic, expressive and timeless — roses are suitable for love, anniversaries, birthdays, apologies and celebrations across Lahore. Choose red for romance, pink for admiration, white for elegance or mixed arrangements for a vibrant statement. Fresh roses are among our most requested flowers for DHA, State Life and Lake City delivery.",
    },
    {
      slug: "sunflowers",
      label: "Sunflowers",
      intro:
        "Bright sunflowers bring warmth, optimism and energy to birthdays, congratulations, get-well wishes and cheerful everyday surprises. Their bold yellow petals create instantly uplifting bouquets and boxes popular with Lahore customers who want a joyful, memorable gift.",
    },
    {
      slug: "chrysanthemums",
      label: "Chrysanthemums",
      intro:
        "Full, textured chrysanthemums add colour and volume to bouquets, boxes and baskets, making them a versatile choice for joyful and elegant designs. Available in multiple shades, chrysanthemums work beautifully in mixed arrangements and standalone bunches for Lahore gifting.",
    },
    {
      slug: "lilies",
      label: "Lilies",
      intro:
        "Graceful lilies create a refined and fragrant presentation for anniversaries, congratulations, formal gifting and sophisticated floral arrangements. Their elegant form and subtle fragrance make lilies a premium choice for weddings, corporate gifts and special occasions in Lahore.",
    },
    {
      slug: "babys-breath",
      label: "Baby's Breath",
      intro:
        "Delicate baby's breath adds softness, movement and romance to bouquets. It works beautifully on its own for minimalist designs or paired with roses, lilies and seasonal blooms for layered, textured arrangements popular for weddings and romantic gifts.",
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
      "Custom floral jewellery for brides, bridesmaids, mayun, mehndi and intimate wedding celebrations in Lahore. Request coordinated earrings, necklaces, bracelets, rings, gajras and hair accessories matched to your outfit colours and event theme. Share inspiration photos on WhatsApp for a personalised design.",
  },
  {
    slug: "bridal-bouquets",
    label: "Bridal Bouquets",
    intro:
      "Handcrafted bridal bouquets designed around the bride's dress, wedding colours, venue and preferred flower style. From classic white roses to vibrant mehndi palettes, each bridal bouquet is prepared with fresh flowers and advance consultation. Ideal for nikkah, barat and reception functions across Lahore.",
  },
  {
    slug: "groom-garlands",
    label: "Groom Garlands",
    intro:
      "Fresh groom garlands and traditional haar designs created with carefully selected flowers for barat, nikkah, mehndi and reception events. Customise by flower type, colour, size and style to complement the groom's sherwani and wedding theme. Advance booking recommended.",
  },
  {
    slug: "car-decoration",
    label: "Car Decoration",
    intro:
      "Elegant wedding-car floral décor customised according to the vehicle, event colours and preferred coverage. From subtle door accents to full bonnet arrangements, car decoration is coordinated on WhatsApp with timing confirmed for your barat or reception schedule in Lahore.",
  },
  {
    slug: "room-decoration",
    label: "Room Decoration",
    intro:
      "Romantic room décor using flowers, petals, candles, balloons and personalised details — planned according to the space and selected budget. Popular for wedding nights, birthdays, anniversaries and proposals across Lahore. Share room photos and colour preferences on WhatsApp for a tailored proposal.",
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
